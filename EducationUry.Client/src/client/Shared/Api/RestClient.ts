import {RequestQueue, RequestState} from "./RequestQueue";
import { ApiResponse } from "./Responses/ApiResponse";

export interface IRestClient {
	send: (request: HttpRequest, callback?: (response: HttpResponse) => void) => void;
}

export class RestClient implements IRestClient {
	constructor(defaultHeaders?: HttpHeader[]) {
		this.defaultHeaders = defaultHeaders || [];
	}
	
	private defaultHeaders: HttpHeader[];
	
	private httpMethods = [
		({ key: HttpMethod.Get, value: 'GET' }),
		({ key: HttpMethod.Post, value: 'POST' }),
		({ key: HttpMethod.Put, value: 'PUT' }),
		({ key: HttpMethod.Delete, value: 'DELETE' }),
		({ key: HttpMethod.Head, value: 'HEAD' }),
		({ key: HttpMethod.Options, value: 'OPTIONS' }),
	];
	
	private isMultipartFromData = (request: HttpRequest) => {
		return request.headers
			.find(c => c.key.toLowerCase() === 'content-type'.toLowerCase() && c.value.toLowerCase() === 'multipart/form-data'.toLowerCase()) != undefined;
	};
	
	public send = (request: HttpRequest, callback?: (response: HttpResponse) => void) => {
		const requestHeaders: HeadersInit = new Headers();
		this.defaultHeaders
			.forEach(h => requestHeaders.set(h.key, h.value));
		request.headers
			.forEach(h => requestHeaders.set(h.key, h.value));
		
		const currentContentType = requestHeaders.get('content-type')
		
		if (currentContentType === 'multipart/form-data') {
			requestHeaders.delete('content-type')
		}
		
		requestHeaders.forEach((value, key) => {
			console.log(`key: ${key}, value: ${value}`)
		})

		requestHeaders.append("Host", "http://localhost:8080")
		requestHeaders.append("Origin", "http://localhost:8080")
		
		fetch(request.url, {
			method: this.httpMethods.find(m => m.key === request.method)!.value,
			// mode: 'no-cors',
			signal: request.getSignal(),
			body: this.isMultipartFromData(request) 
				? request.body 
				: request.body === undefined || request.body === null 
					? null 
					: JSON.stringify(request.body),
			headers: requestHeaders
		}).then(res => {
			const httpResponse = new HttpResponse(res, request);
			
			if (callback) {
				callback(httpResponse);
			}

			request.invoke(httpResponse);
		})
	};
}

export class HttpResponse {
	public request: HttpRequest;
	public status = (): number => this._baseResponse.status;
	public url = (): string => this._baseResponse.url;
	public redirect = (): boolean => this._baseResponse.redirected;
	public type = () => this._baseResponse.type;
	public headers = () => {
		const headers: HttpHeader[] = [];
		this.headerForEach((key, value) => headers.push(({
			key: key,
			value: value
		})))
		return headers;
	};
	public bodyUsed = (): boolean => this._baseResponse.bodyUsed;
	private _baseResponse: Response;
	
	public headerForEach = (callback: (key: string, value: string) => void) => {
		this._baseResponse.headers.forEach((value, key) => {
			callback(key, value);
		})
	};

	constructor(
		baseResponse: Response,
		request: HttpRequest,
	) {
		this.request = request;
		this._baseResponse = baseResponse;
	}
	
	public text = (callback: (text: string) => void) => {
		return this._baseResponse.text().then(r => callback(r));
	};

	public json = () => {
		return this._baseResponse.json();
	};

	public jsonAs = <T>(callback: (value: T) => void, failedCallback?: (error: string) => void) => {
		return this._baseResponse.text().then(t => {
			const responseJson = (JSON.parse(t));
			if (responseJson?.isSuccess) {
				callback(<T>responseJson.data);
			} else if (failedCallback !== undefined) {
				failedCallback(responseJson.error)
			}
		});
	};

	public formData = () => {
		return this._baseResponse.formData();
	};

	public arrayBuffer = () => {
		return this._baseResponse.arrayBuffer();
	};

	public blob = () => {
		return this._baseResponse.blob();
	};
}

export class HttpRequest {
	public url: string;
	public body?: any;
	public method: HttpMethod;
	public headers: HttpHeader[];
	private abortController: AbortController;
	private callbacks: ((response: HttpResponse) => void)[] = [];
	
	private queue?: RequestQueue;
	private client?: IRestClient;
	
	constructor(method: HttpMethod, url: string, headers?: HttpHeader[], body?: any) {
		this.url = url;
		this.body = body;
		this.method = method;
		this.headers = headers || [];
		this.abortController = new AbortController();
	}

	public setHeaderByKeyValue = (key: string, value: string) => {
		this.headers = this.headers.filter(h => h.key !== key).concat([({key: key, value: value})]);
		return this;
	};
	
	public setHeader = (header: HttpHeader) => {
		this.headers = this.headers.filter(h => h.key !== header.key).concat([header]);
		return this;
	};
	
	public bindRequestQueue = (queue: RequestQueue) => {
		this.queue = queue;
	};

	public bindRestClient = (client: IRestClient) => {
		this.client = client;
	};

	public emit = (onChangeState?: (state: RequestState) => void) => {
		if (this.queue) {
			this.queue.push(this, onChangeState);
		} else {
			this.client.send(this);
		}
	};
	
	public invoke = (response: HttpResponse) => {
		for (let i = 0; i < this.callbacks.length; i++) {
			this.callbacks[i](response);
		}
	};
	
	public on = (callback: (response: HttpResponse) => void) => {
		this.callbacks.push(callback)
		return this;
	};
	
	public getSignal = () => {
		return this.abortController.signal;
	};
	
	public abort = () => {
		this.abortController.abort();
	};
}

export enum HttpMethod {
	Get,
	Post,
	Put,
	Delete,
	Head,
	Options
}

export type HttpHeader = {
	key: string,
	value: string;
};

export class HttpContentTypes {
	public static readonly applicationJson: string = 'application/json; charset=utf-8';
	public static readonly multipartFromData: string = 'multipart/form-data';
}