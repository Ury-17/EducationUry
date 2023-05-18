import {computed, makeObservable, observable} from "mobx";
import { CommonStore } from "../../Layouts/CommonStore";
import { TeacherModel } from "../../Shared/Api/Controllers/ApiTeachers";

export class Store {
	constructor() {
		makeObservable(this);
        this.refresh();
	}

	@observable
	public teachers: TeacherModel[] = [];
	@observable
	public filter: string = '';
	@observable
	public editId: string = '';
	@observable
	public editName: string = '';

    public refresh = () => {
        CommonStore.instance.api.teachers.list(res => {
            this.teachers = res
        })
	}

	@computed
	public get filteredTeachers() {
        if (this.filter.replace(' ', '').length === 0) {
            return this.teachers;
        }

        const regex = new RegExp(this.filter.toLowerCase());
        return this.teachers
            .filter(x => regex.test(x.name.toLowerCase()));
	}

	public beginEdit = (id: string) => {
		this.editId = id;
		this.editName = this.teachers.find(x => x.id === id)?.name || '';
	};

	public endEdit = () => {
		CommonStore.instance.api.teachers.update(({
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
        CommonStore.instance.api.teachers.create('Новый преподаватель', () => {
            this.refresh()
        }, () => {})
	};

    public toArchive = (id: string) => {
        CommonStore.instance.api.teachers.delete(id, () => {
            this.refresh()
        })
    }
}