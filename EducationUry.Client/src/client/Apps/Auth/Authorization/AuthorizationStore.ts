import { CommonStore } from "../../../Layouts/CommonStore";
import {computed, makeObservable, observable} from "mobx";
import { SignInResponse } from "../../../Shared/Api/Controllers/ApiAuthorization";

export class AuthorizationStore {
	constructor() {
		makeObservable(this);
	}

    @observable
    public email: string = ""
    @observable
    public password: string = ""
    @observable
    public userError?: string;

    @computed
    public get isValid() {
        return this.email.includes('@') && this.email.includes('.') && this.password.length >= 4 && this.password.length <= 16
    }

    public login = () => {
        CommonStore.instance.api.auth.signIn(this.email, this.password, this.loginSuccess, this.loginFailed)
    }

    private loginSuccess = (res: SignInResponse) => {
        location.href = location.origin + "/projects/dashboard"
    }

    private loginFailed = (error: string) => {
        this.userError = error
    }
}