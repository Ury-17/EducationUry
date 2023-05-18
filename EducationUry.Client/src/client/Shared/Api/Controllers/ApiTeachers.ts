import {HttpService} from "../HttpService";

export type TeacherModel = {
	id: string;
	name: string;
}
export type TeacherListResponse = {
	teachers: TeacherModel[];
}
export class ApiTeachers {
	constructor(private endpoint: string, private http: HttpService) {
	}
	
	public create = (name: string, callback: () => void, failedCallback: (error: string) => void) => {
		return this.http.post(`${this.endpoint}/create`, ({
			id: 'e8a5c1b1-7ddc-45f4-a2d1-4888e8379be2',
			name: name,
		}))
		.on(() => callback())
		.emit();
	};

	public update = (model: TeacherModel, callback: () => void) => {
		return this.http.post(`${this.endpoint}/update`, model)
		.on(() => callback())
		.emit();
	};

	public delete = (id: string, callback: () => void) => {
		return this.http.delete(`${this.endpoint}/${id}`, ({
			id: id
		}))
		.on(() => callback())
		.emit();
	};

	public list = (callback: (res: TeacherModel[]) => void) => {
		return this.http
		.get(`${this.endpoint}/list`)
		.on(res => res.jsonAs<TeacherListResponse>(r => {
			callback(r.teachers)
		}, () => console.log("ERROR")))
		.emit();
	};
}
