import {computed, makeObservable, observable} from "mobx";
import {LoaderStore} from "../Shared/LoaderStore";
import {WebClient} from "../Shared/Api/WebClient";
// import {MeResponse} from "../Shared/Api/Responses/MeResponse";
import {MeResponse} from "../Shared/Api/Responses/MeResponse";
import {NavMenuStore} from "./NavMenuStore";

class PageLoader {
	constructor() {
		makeObservable(this);
		this.isLoading = false;
	}
	
	@observable
	public isLoading: boolean;
	
	public beginLoading = () => {
		this.isLoading = true;
	};
	
	public finishLoading = () => {
		this.isLoading = false;
	};
}

export class CommonStore {
	constructor() {
		makeObservable(this);
		this.user = null;
		this.loaderStore = new LoaderStore();
		this.api = new WebClient();
		this.loader = new PageLoader();
		this.navBarStore = new NavMenuStore();
	}


	public navBarStore: NavMenuStore;
	public loaderStore: LoaderStore;
	public loader: PageLoader;
	public api: WebClient;
	
	@observable
	public isShowCommentsStream?: boolean = true;
	
	@observable
	public toasts: ToastMessage[] = [];
	@observable
	public user: MeResponse | null;
	@computed
	public get isAuthorized() {
		return this.user != null;
	}
	
	public addToastText = (text: string) => {
		this.toasts.push(({
			type: 'text',
			value: text,
			onClose: (idx: number) => {
				this.toasts.splice(idx, 1);
			}
		}))
	};
	
	@observable
	public version: string = '';
	public static instance: CommonStore;
}

type ToastMessage = {
	type: 'text' | 'message';
	value: string;
	caption?: string;
	onClose: (idx: number) => void;
}
