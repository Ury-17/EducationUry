import {JwtPair} from "./Types/JwtPair";
import {HttpContentTypes, HttpHeader, HttpMethod, HttpRequest, HttpResponse, IRestClient, RestClient} from "./RestClient";
import {RequestQueue} from "./RequestQueue";
import { DateTime } from "../../Shared/DateTime";

export class HttpService {
	constructor() {
		this.jwtPair = null;
		this.restClient = new RestClient([
			({ key: 'content-type', value: 'application/json; charset=utf-8'})
		]);
		this.queue = new RequestQueue(this.restClient, ({
			countRequestsInSecond: 1,
			preProcessing: (res) => {
				// const jwtPair: JwtPair = ({
				// 	accessToken: '',
				// 	refreshToken: '',
				// 	exp: Number.NaN
				// })
				const jwtPair = this.extractResponseTokens(res);
				// res.headerForEach((key, value) => {
				// 	if (key.toLowerCase().replace(' ', '') === 'authorization') {
				// 		jwtPair.accessToken = value.replace(' ', '')
				// 	} else if (key.toLowerCase().replace(' ', '') === 'r-token') {
				// 		jwtPair.refreshToken = value.replace(' ', '')
				// 	} else if (key.toLowerCase().replace(' ', '') === 'exp') {
				// 		jwtPair.exp = parseInt(value.replace(' ', ''));
				// 	}
				// 	console.log(`${key}:\t${value}`)
				// })

				if (jwtPair !== null) {
					this.jwtPair = jwtPair;
					this.needUpdateJwt = false;
					localStorage.setItem('jwt', JSON.stringify(this.jwtPair));
					this.queue.updateHeadersRequests([({key: 'Authorization', value: `Bearer ${this.jwtPair.accessToken}`})], ['r-token'])
				}
				if (res.status() === 426) {
					this.needUpdateJwt = true;
				}
			}
		}));
	}

	private getClaimsFromAccessToken = (token: string) => {
		const parts = token.split('.')

		if (parts.length !== 3) {
			return null;
		}

		console.log('begin parse')
		console.log(token)
		return JSON.parse(atob(parts[1]))
	};

	private extractResponseTokens(res: HttpResponse) {
		const jwtPair: JwtPair = ({
			accessToken: '',
			refreshToken: '',
			exp: Number.NaN
		})
		res.headerForEach((key, value) => {
			if (key.toLowerCase().replace(' ', '') === 'authorization') {
				jwtPair.accessToken = value.replace(' ', '')
			} else if (key.toLowerCase().replace(' ', '') === 'r-token') {
				jwtPair.refreshToken = value.replace(' ', '')
			}
			console.log(`${key}:\t${value}`)
		})

		if (jwtPair.accessToken === '' || jwtPair.refreshToken === '') {
			return null;
		}

		const claims = this.getClaimsFromAccessToken(jwtPair.accessToken)

		if (claims === null) {
			return null;
		}

		jwtPair.exp = DateTime.fromUnix(claims["exp"])

		return jwtPair;
	}

	private jwtPair: JwtPair | null;
	private restClient: IRestClient;
	private queue: RequestQueue;
	
	public getRestClient = () => this.restClient;
	public getQueue = () => this.queue;
	
	private createRequest = (method: HttpMethod, url: string, headers?: HttpHeader[], body?: any) => {
		const requestHeaders: HttpHeader[] = (headers || []);
		if (this.jwtPair !== null) {
			console.log('use jwt access token')
			requestHeaders.push(({
				key: 'Authorization',
				value: `Bearer ${this.jwtPair.accessToken}`
			}));
		}
		const date = new Date().getTime();
		const exp = this.jwtPair?.exp || 0;
		
		console.log(new Date(date).toString())
		console.log(new Date(exp).toString())
		
		if (date >= exp || this.needUpdateJwt === true) {
			console.warn('use jwt refresh token')
			requestHeaders.push(({
				key: "R-Token",
				value: this.jwtPair?.refreshToken
			}));
			// this.needUpdateJwt = true;
			// console.log(`token expired: ${new Date().getTime() <= this.jwtPair?.exp}`)
			console.log('set R token')
		}
		const request = new HttpRequest(method, url, requestHeaders, body);
		request.bindRequestQueue(this.queue);
		// request.on(this.completed);
		
		return request;
	};
	
	public setActiveJwtPair = (jwtPair: JwtPair | null) => {
		// console.log('set active jwt: ')
		// console.log(jwtPair)
		this.jwtPair = jwtPair;
	};
	
	public getActiveJwtPair = () => {
		return this.jwtPair;
	};
	
	public getFile = (path: string, callback: (source: string) => void) => {
		const request = new XMLHttpRequest();
		request.open('GET', path, true);
		request.responseType = 'blob';
		request.onload = function() {
			const reader = new FileReader();
			reader.readAsDataURL(request.response);
			reader.onload =  function(e){
				callback(e.target.result as string)
			};
		};
		request.send();
	};

	public get = (url: string) => {
		return this.createRequest(HttpMethod.Get, url);
	};

	public post = (url: string, data?: any, contentType?: string) => {
		if (data === null) {
			data = undefined;
		}
		// console.log(contentType || HttpContentTypes.applicationJson);
		
		return this.createRequest(HttpMethod.Post, url, 
			[
				({ 
					key: 'Content-Type', 
					value: contentType || HttpContentTypes.applicationJson 
				})
			], data)
		// return this.send(url, data, 'post', contentType);
	};

	public delete = (url: string, data?: any, contentType?: string) => {
		if (data === null) {
			data = undefined;
		}
		// console.log(contentType || HttpContentTypes.applicationJson);

		return this.createRequest(HttpMethod.Delete, url,
			[
				({
					key: 'Content-Type',
					value: contentType || HttpContentTypes.applicationJson
				})
			], data)
		// return this.send(url, data, 'post', contentType);
	};

	private needUpdateJwt: boolean = false;
}
