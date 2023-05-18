import { CommonStore } from "../../../Layouts/CommonStore";
import { computed, makeObservable, observable} from "mobx";
import { Project } from "../../../Shared/Api/Controllers/ApiProjects";

export enum ProjectsTab {
    Actuals,
    Archived
}

export class Store {
	constructor() {
		makeObservable(this);

        this.currentTab = ProjectsTab.Actuals;
        this.setTab(this.currentTab)
        this.refresh();
	}

    @observable
    public currentTab: ProjectsTab;
    @observable
    private projs: Project[] = []

    @computed
    public get projects() {
        return this.projs;
    }

    public createProject = () => {
        const name = 'Новый проект';
        const desc = 'Добавьте описание';
        CommonStore.instance.api.projects.create(name, desc, (r) => {
            this.projs.push(({
                name: name,
                description: desc,
                id: r.id,
                created: new Date().getDate(),
            }));
            document.getElementById(`project-${r.id}`)?.click();
        }, () => console.log('123'))
    };

    public setTab = (tab: ProjectsTab) => {
        if (this.currentTab != tab) {
            this.currentTab = tab;
            this.refresh();
        }
    };

    public refresh = () => {
        if (this.currentTab === ProjectsTab.Actuals) {
            CommonStore.instance.api.projects.actual(res => {
                this.projs = res.projects
            })
        }
        else {
            CommonStore.instance.api.projects.archive(res => {
                this.projs = res.projects
            })
        }
    }

    public toArchive = (id: string) => {
        CommonStore.instance.api.projects.delete(id, () => {
            this.refresh()
        })
    }
}