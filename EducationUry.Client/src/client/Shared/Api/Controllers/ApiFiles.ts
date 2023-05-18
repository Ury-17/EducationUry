import {HttpService} from "../HttpService";
import { ProjectFileModel } from "../Responses/ProjectModel";

export class ApiFiles {
	constructor(private endpoint: string, private http: HttpService) {
	}

	public upload = (file: File, callback: (res: ProjectFileModel) => void, failedCallback: (error: string) => void) => {
		const data = new FormData();
		data.set("files", file)
		return this.http.post(`${this.endpoint}/upload`, data, 'multipart/form-data')
		.on((res) => res.jsonAs<ProjectFileModel>(r => {
			callback(r)
		}, failedCallback))
		.emit();
	};

	public get = (id: string) => {
		return `${this.endpoint}/get/${id}`;
	};
}