import { StudentModel } from "../../Shared/Api/Controllers/ApiStudents";
import { CommonStore } from "../../Layouts/CommonStore";
import { computed, makeObservable, observable} from "mobx";

export enum AdTab {
    General,
}

export class Store {
	constructor() {
		makeObservable(this);

        this.refresh();
	}

	@observable
	public students: StudentModel[] = [];
	@observable
	public filter: string = '';
	@observable
	public editId: string = '';
	@observable
	public editName: string = '';

    public refresh = () => {
        CommonStore.instance.api.students.list(res => {
            this.students = res
        })
	}

	@computed
	public get filteredStudents() {
        if (this.filter.replace(' ', '').length === 0) {
            return this.students;
        }

        const regex = new RegExp(this.filter.toLowerCase());
        return this.students
            .filter(x => regex.test(x.name.toLowerCase()));
	}

	public beginEdit = (id: string) => {
		this.editId = id;
		this.editName = this.students.find(x => x.id === id)?.name || '';
	};

	public endEdit = () => {
		CommonStore.instance.api.students.update(({
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
        CommonStore.instance.api.students.create('Новый ученик', () => {
            this.refresh()
        }, () => {})
	};

    public toArchive = (id: string) => {
        CommonStore.instance.api.students.delete(id, () => {
            this.refresh()
        })
    }
}