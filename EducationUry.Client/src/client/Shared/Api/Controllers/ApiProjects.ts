import {HttpService} from "../HttpService";
import { ProjectModel, ProjectResponse } from "../Responses/ProjectModel";

export class ApiProjects {
	constructor(private endpoint: string, private http: HttpService) {
	}
	
	public create = (name: string, description: string, callback: (res: CreateProjectResponse) => void, failedCallback: (error: string) => void) => {
		return this.http.post(`${this.endpoint}/create`, ({
			name: name,
			description: description
		}))
		.on(res => res.jsonAs<CreateProjectResponse>(r => {
			callback(r)
		}, failedCallback))
		.emit();
	};

	public update = (model: ProjectModel, callback: () => void) => {
		return this.http.post(`${this.endpoint}/update`, model)
		.on(() => callback())
		.emit();
	};

	public get = (id: string, callback: (res: ProjectResponse) => void, failedCallback: (error: string) => void) => {
		return this.http.get(`${this.endpoint}/${id}`)
		.on(res => res.jsonAs<ProjectResponse>(r => {
			callback(r)
		}, failedCallback))
		.emit();
	};

	public delete = (id: string, callback: () => void) => {
		return this.http.delete(`${this.endpoint}/${id}`, ({
			id: id
		}))
		.on(() => callback())
		.emit();
	};

	public actual = (callback: (res: ProjectListResponse) => void) => {
		this.list('actual', callback);
	};

	public archive = (callback: (res: ProjectListResponse) => void) => {
		this.list('archive', callback);
	};

	private list = (mode: string, callback: (res: ProjectListResponse) => void) => {
		return this.http
		.get(`${this.endpoint}/list?mode=${mode}`)
		.on(res => res.jsonAs<ProjectListResponse>(r => {
			callback(r)
		}, () => console.log("ERROR")))
		.emit();
	};
}

export type CreateProjectResponse = {
	id: string
}

export type ProjectListResponse = {
	projects: Project[]
}

export type Project = {
	id: string,
	name: string,
	description: string,
	created: number,
}