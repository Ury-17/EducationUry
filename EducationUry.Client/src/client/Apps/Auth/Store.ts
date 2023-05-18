import { makeObservable, observable} from "mobx";
import { AuthorizationStore } from "./Authorization/AuthorizationStore";
import { RegistrationStore } from "./Registration/RegistrationStore";

export enum AuthTab {
    Auth,
    Registration
}

export class Store {
	constructor() {
		makeObservable(this);

        this.regStore = new RegistrationStore();
        this.authStore = new AuthorizationStore();

        this.tab = AuthTab.Auth;
        this.setTab(this.tab);
	}

    @observable
    public regStore: RegistrationStore
    @observable
    public authStore: AuthorizationStore;

    @observable
    public tab: AuthTab;

    public setTab = (tab: AuthTab) => {
        this.tab = tab;
    }
}