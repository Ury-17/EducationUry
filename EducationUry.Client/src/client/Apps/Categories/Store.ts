import { CommonStore } from "../../Layouts/CommonStore";
import { computed, makeObservable, observable} from "mobx";
import { CategoryModel } from "../../Shared/Api/Responses/ProjectModel";

export enum AdTab {
    General,
}

export class Store {
	constructor() {
		makeObservable(this);

        this.refresh();
	}

	@observable
	public categories: CategoryModel[] = [];
	@observable
	public filter: string = '';
	@observable
	public editId: string = '';
	@observable
	public editName: string = '';

    public refresh = () => {
        CommonStore.instance.api.categories.list(res => {
            console.log(res);
            this.categories = res
        })
	}

	@computed
	public get filteredCategories() {
        if (this.filter.replace(' ', '').length === 0) {
            return this.categories;
        }

        const regex = new RegExp(this.filter.toLowerCase());
        return this.categories
            .filter(x => regex.test(x.name.toLowerCase()));
	}

	public beginEdit = (id: string) => {
		this.editId = id;
		this.editName = this.categories.find(x => x.id === id)?.name || '';
	};

	public endEdit = () => {
		CommonStore.instance.api.categories.update(({
			id: this.editId,
			name: this.editName
		}), () => {
			this.cancelEdit();
			this.refresh();
		})
	};

	public cancelEdit = () => {
		this.editId = '';
		this.editName = '';
	};

	public create = () => {
        CommonStore.instance.api.categories.create('Новая категория', () => {
            this.refresh()
        }, () => {})
	};

    public toArchive = (id: string) => {
        CommonStore.instance.api.categories.delete(id, () => {
            this.refresh()
        })
    }
}