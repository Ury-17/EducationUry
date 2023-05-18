import {HttpService} from "../HttpService";

export class HistoryHubApiRegistration {
	private host: string = 'http://localhost:10000/api/registration';

	constructor(private http: HttpService) {}

	public verifyCode = (applicationId: string, code: string, callback: (res: VerifyCodeResponse) => void, failedCallback: (error: string) => void) => {
		return this.http
			.post(`${this.host}/checkcode`, {
				applicationId: applicationId,
				code: code,
			})
			.on(res => res.jsonAs<VerifyCodeResponse>(callback, failedCallback))
			.emit();
	};

	public sendCode = (email: string, password: string, callback: (res: SignUpResponse) => void, failedCallback: (error: string) => void) => {
		return this.http
			.post(`${this.host}/signup`, {
				email: email,
				password: password,
			})
			.on(res => res.jsonAs<SignUpResponse>(callback, failedCallback))
			.emit();
	};
}

export type SignUpResponse = {
	applicationId: string
	wait: number
}

export type VerifyCodeResponse = {
	userId: string
}