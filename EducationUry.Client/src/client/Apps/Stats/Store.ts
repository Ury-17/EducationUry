import { CommonStore } from "../../Layouts/CommonStore";
import { makeObservable, observable} from "mobx";
import { AdDetailResponse } from "../../Shared/Api/Controllers/ApiStudents";
import { useHistory } from "react-router";

export enum AdTab {
    General,
    Stats
}

export class Store {
	constructor(private adId: string) {
		makeObservable(this);

        this.history = useHistory();
        this.ad = null;

        this.load();
	}

    private history: any;

    private load = () => {
        CommonStore.instance.api.ads.getById(this.adId, r => {
            this.ad = r
        }, this.showError)
    }

    @observable
    public ad: AdDetailResponse | null;
    @observable
    public error: string | null = null;

    private showError = (err: string) => {
        console.log(err)
        this.error = err;
    }
}