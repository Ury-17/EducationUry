import {makeObservable, observable} from "mobx";
import {EventHandler} from "../EventHandler";
import {CommonStore} from "../../Layouts/CommonStore";
import {ApiProjects} from "./Controllers/ApiProjects";
import {HttpService} from "./HttpService";
import {ApiAuthorization} from "./Controllers/ApiAuthorization";
import {JwtPair} from "./Types/JwtPair";
import {MeResponse} from "./Responses/MeResponse";
import {ApiState} from "./Controllers/ApiState";
import {StateResponse} from "./Responses/StateResponse";
import {HistoryHubApiRegistration} from "./Controllers/ApiRegistration";
import { ApiResponse } from "./Responses/ApiResponse";
import { ApiFiles } from "./Controllers/ApiFiles";
import { ApiTeachers } from "./Controllers/ApiTeachers";
import { ApiStudents } from "./Controllers/ApiStudents";
import { ApiCategories } from "./Controllers/ApiCategories";

export class WebClient {
	private readonly host: string = 'http://localhost:5000';
	public readonly apiPrefix: string = `${this.host}/api`;
	private readonly cookieJwtName = 'token';
	private http: HttpService;
	private onConnectedEventHandler: EventHandler<null>;
	
	public projects: ApiProjects;
	public state: ApiState;
	public files: ApiFiles;
	public students: ApiStudents;
	public categories: ApiCategories;
	public auth: ApiAuthorization;
	public registration: HistoryHubApiRegistration;
	public teachers: ApiTeachers;

	@observable
	public isAuthorized: boolean;
	
	public addListenerOnConnected = (callback: () => void) => {
		this.onConnectedEventHandler.addListener(callback)
	};

	constructor() {
		makeObservable(this);
		this.http = new HttpService();
		this.isAuthorized = false;
		this.onConnectedEventHandler = new EventHandler();
		
		this.projects = new ApiProjects(`${this.apiPrefix}/projects`, this.http);
		this.files = new ApiFiles(`${this.apiPrefix}/file`, this.http);
		this.students = new ApiStudents(`${this.apiPrefix}/students`, this.http);
		this.categories = new ApiCategories(`${this.apiPrefix}/categories`, this.http);
		this.state = new ApiState(`${this.apiPrefix}/state`, this.http);
		this.teachers = new ApiTeachers(`${this.apiPrefix}/teachers`, this.http);
		this.auth = new ApiAuthorization(`${this.apiPrefix}/authorization`, this.http, (jwtPair: JwtPair) => {
			this.saveJwtPair(jwtPair);
			this.http.setActiveJwtPair(jwtPair)
			this.initCommonStore();

			// this.connection.connect(jwtPair.accessToken, (isSuccess) => {
			// 	if (isSuccess) {
			// 		this.onConnectedEventHandler.invoke(null);
			// 	}
			// });

			// this.me
			// 	.me()
			// 	.on(res => res.jsonAs<MeResponse>(value => {
			// 		console.log(value)
			// 		CommonStore.instance.user = value;
			// 		this.isAuthorized = true;
			// 	}))
			// 	.emit();
		}, () => {
			this.saveJwtPair(null);
			this.isAuthorized = false;
			this.http.setActiveJwtPair(null);
			window.location.reload();
		});
		this.registration = new HistoryHubApiRegistration(this.http);
	}
	
	private saveJwtPair = (jwtPair: JwtPair | null) => {
		if (jwtPair === null) {
			localStorage.setItem('jwt', JSON.stringify({}))
		}
		else {
			localStorage.setItem('jwt', JSON.stringify(jwtPair))
		}
	};
	
	private getHostByScheme = (hosts: string[], scheme: string) : string | null => {
		return hosts
			.map(h => ({
				scheme: h.split(':')[0],
				host: h
			}))
			.filter(h => h.scheme == scheme)[0]?.host || null;
	};

	private initCommonStore = () => {
		CommonStore.instance.api
			.state.get()
			.on(res => {
				res.jsonAs<StateResponse>(value => {
					console.log(value);
					CommonStore.instance.version = value.api.version;
					CommonStore.instance.user = value.user;
				
				// this.files.setHost(`${storageHost}/images`);
				// this.accounts.setHost(identityHost);
				
				if (this.isAuthorized) {
					// this.connection.connect(jwtPair.accessToken, (isSuccess) => {
					// 	console.log('ws is connected: ' + isSuccess)
					// 	if (isSuccess) {
					// 		this.onConnectedEventHandler.invoke(null);
					// 	}
					// })
				} else {
					CommonStore.instance.isShowCommentsStream = false;
				}
			}, (err) => console.log(`get state error: ${err}`))
			})
			.emit();
		}

	public initialize = () => {
		const jwtValue = localStorage.getItem('jwt');
		const jwtPair = jwtValue === null ? null : <JwtPair> JSON.parse(jwtValue);

		if (jwtPair !== null) {
			this.http.setActiveJwtPair(jwtPair);
		}

		console.log('get state')
		this.initCommonStore();

		if (jwtPair !== null) {
			// if (CommonStore.instance.user !== null) {
				this.http.setActiveJwtPair(jwtPair);
			// }

		}
	};

	public logout = () => {
		this.http.setActiveJwtPair(null)
		CommonStore.instance.user = null;
		this.isAuthorized = false;
	};
}