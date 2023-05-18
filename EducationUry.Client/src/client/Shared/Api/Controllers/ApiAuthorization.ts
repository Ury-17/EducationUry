import { DateTime } from "../../../Shared/DateTime";
import {HttpService} from "../HttpService";
import { JwtPair } from "../Types/JwtPair";

export class ApiAuthorization {
	constructor(private endpoint: string, private http: HttpService, private onLogin: (jwtPair: JwtPair) => void, private onLogout: () => void) {
	}

	public signIn = (email: string, password: string, callback: (res: SignInResponse) => void, failedCallback: (error: string) => void) => {
		this.http.post(`${this.endpoint}/signin`, {
			email: email,
			password: password
		})
		.on(res => res.jsonAs<SignInResponse>(r => {
			const claims = JSON.parse(atob(r.access.split(".")[1]))
			const jwt = ({
				accessToken: r.access,
				refreshToken: r.refresh,
				exp: DateTime.fromUnix(claims.exp)
			})
			this.http.setActiveJwtPair(jwt)
			this.onLogin(jwt);
			callback(r)
		}, failedCallback))
		.emit()
	};

	public signOut = () => {
		return this.http.get(`${this.endpoint}/signout`).on(() => {
			this.onLogout();
		}).emit();
	};
}

export type SignInResponse = {
	access: string
	refresh: string
}