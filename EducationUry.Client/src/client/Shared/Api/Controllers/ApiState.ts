import {HttpService} from "../HttpService";

export class ApiState {
	constructor(private endpoint: string, private http: HttpService) {
	}

	public get = () => {
		return this.http.get(`${this.endpoint}/get`);
	};
}
