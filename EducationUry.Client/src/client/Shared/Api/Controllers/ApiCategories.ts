import {HttpService} from "../HttpService";

export type CategoryModel = {
	id: string;
	name: string;
}
export type CategoryListResponse = {
	categories: CategoryModel[];
}

export class ApiCategories {
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

	public update = (model: CategoryModel, callback: () => void) => {
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

	public list = (callback: (res: CategoryModel[]) => void) => {
		return this.http
		.get(`${this.endpoint}/list`)
		.on(res => res.jsonAs<CategoryListResponse>(r => {
			callback(r.categories)
		}, () => console.log("ERROR")))
		.emit();
	};
}