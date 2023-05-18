import {HttpHeader, HttpRequest, HttpResponse, IRestClient} from "./RestClient";

export enum RequestState {
	Wait,
	Processing,
	Processed
}

type QRequest<T> = {
	id: string;
	priority: number;
	httpRequest: T;
	state: RequestState;
	started: number | undefined;
	finished: number | undefined;
	onChangeState?: (state: RequestState) => void;
}

export type RequestQueueOptions = {
	countRequestsInSecond: number;
	preProcessing?: (response: HttpResponse) => void;
}

export class RequestQueue {
	private requests: QRequest<HttpRequest>[];
	private options: RequestQueueOptions;
	private _rest: IRestClient;
	
	constructor(rest: IRestClient, option?: RequestQueueOptions) {
		this._rest = rest;
		this.requests = [];
		this.options = option || ({
			countRequestsInSecond: 1,
			preProcessing: undefined
		});
	}
	
	public push = (request: HttpRequest, onChangeState?: (state: RequestState) => void) => {
		const qRequest = ({
			id: this.newGuid(),
			httpRequest: request,
			state: RequestState.Wait,
			started: undefined,
			finished: undefined,
			priority: this.requests.length,
			onChangeState: onChangeState
		}) as QRequest<HttpRequest>;
		
		if (qRequest.onChangeState) {
			qRequest.onChangeState(qRequest.state);
		}
		
		this.computeRequest(qRequest)
	};
	
	public updateHeadersRequests = (headers: HttpHeader[], removeHeaders: string[]) => {
		this.getRequestsByStates([RequestState.Wait, RequestState.Processing])
			.map(c => this.requests.findIndex(r => r.id === c.id))
			.filter(index => index !== -1)
			.forEach(index => {
				headers.forEach(header => this.requests[index].httpRequest.setHeader(header));
				removeHeaders.forEach(headerKey => this.requests[index].httpRequest.headers = this.requests[index].httpRequest.headers.filter(h => h.key.toLowerCase() !== headerKey.toLowerCase()))
			});
	};
	
	private computeRequest = (request: QRequest<HttpRequest>) => {
		if (this.isContainsRequestIn(request, this.getRequestsByStates([RequestState.Wait, RequestState.Processing]))) {
			return;
		}
		
		const currentProcessingRequests = this.getRequestsByStates([RequestState.Wait, RequestState.Processing]);
		this.requests.push(request);
		if (currentProcessingRequests.length !== 0) {
			return;
		}

		this.beginComputing();
	};
	
	private beginComputing = () => {
		const uncomputedRequestIndex = this
			.getSortedRequestsByPriority()
			.findIndex(r => r.state === RequestState.Wait);
		
		
		if (uncomputedRequestIndex === -1) {
			return;
		}
		
		this.requests[uncomputedRequestIndex].state = RequestState.Processing;
		this.requests[uncomputedRequestIndex].started = new Date().getTime();
		if (this.requests[uncomputedRequestIndex].onChangeState) {
			this.requests[uncomputedRequestIndex].onChangeState(this.requests[uncomputedRequestIndex].state);
		}

		this._rest.send(this.requests[uncomputedRequestIndex].httpRequest, (res) => {
			this.requests[uncomputedRequestIndex].state = RequestState.Processed;
			this.requests[uncomputedRequestIndex].finished = new Date().getTime();
			
			if (this.requests[uncomputedRequestIndex].onChangeState) {
				this.requests[uncomputedRequestIndex].onChangeState(this.requests[uncomputedRequestIndex].state);
			}
			
			if (this.options.preProcessing) {
				this.options.preProcessing(res);
			}

			this.beginComputing();
		});
	};
	
	private getRequestsByStates = (states: RequestState[]) => {
		return this.requests
			.filter(c => states.filter(s => s === c.state).length !== 0);
	};
	
	private convertRequestForEqual = (req: HttpRequest) => {
		return ({
			url: req.url,
			method: req.method,
			headers: req.headers,
			body: req.body,
		})
	};
	
	private isContainsRequestIn = (request: QRequest<HttpRequest>, from: QRequest<HttpRequest>[]) => {
		const targetRequestJson = JSON.stringify(this.convertRequestForEqual(request.httpRequest));
		
		for (let i = 0; i < from.length; i++) {
			const fromRequestJson = JSON.stringify(this.convertRequestForEqual(from[i].httpRequest));
			
			if (targetRequestJson === fromRequestJson) {
				return true;
			}
		}
		
		return false;
	};
	
	private getSortedRequestsByPriority = () => {
		return this.requests.sort((a, b) => a.priority > b.priority ? -1 : 1)
	};

	private newGuid = () => {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
			const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}
}