import { CommonStore } from "../../../Layouts/CommonStore";
import { computed, makeObservable, observable} from "mobx";
import { DateTime } from "../../../Shared/DateTime";
import { AdResponse, AdStatus, CreateAdResponse } from "../../../Shared/Api/Controllers/ApiStudents";
import { useHistory } from 'react-router-dom';
import { useEffect } from "react";
import { ProjectModel } from "../../../Shared/Api/Responses/ProjectModel";
import { CategoryModel } from "../../../Shared/Api/Responses/ProjectModel";
import { ProjectAuthorModel } from "../../../Shared/Api/Responses/ProjectModel";
import { ProjectStudentModel } from "../../../Shared/Api/Responses/ProjectModel";
import React from "react";

export enum AdsTab {
    Actuals,
    Archived
}

export type EditModel = {
    editing: boolean;
    isShowAuthorsDialog: boolean;
    isShowStunetsDialog: boolean;
    filterByAuthors: string;
    filterByStudents: string;
    model: ProjectModel;
}

export class Store {
	constructor(private projectId: string) {
		makeObservable(this);

        this.history = useHistory();
        this.project = null;
        this.editModel = ({
            editing: false,
            filterByAuthors: '',
            filterByStudents: '',
            isShowAuthorsDialog: false,
            isShowStunetsDialog: false,
            model: ({
                id: '',
                name: '',
                description: '',
                category: ({
                    id: '',
                    name: '',
                }),
                files: [],
                authors: [],
                archived: false,
                students: [],
                enabled: true,
                created: 0
            })
        });
        this.btnUploadFile = React.createRef();

        this.currentTab = AdsTab.Actuals;
        this.setTab(this.currentTab);
        this.refresh();
	}

    private history: any;

    @observable
    public editModel: EditModel;
    @observable
    public currentTab: AdsTab;

    @observable
    public project: ProjectModel | null;
    public btnUploadFile: React.RefObject<HTMLInputElement>;
    @observable
    public categories: CategoryModel[] = []
    @observable
    public teachers: ProjectAuthorModel[] = []
    @observable
    public students: ProjectStudentModel[] = []

    public setTab = (tab: AdsTab) => {
        if (this.currentTab !== tab) {
            this.currentTab = tab;
            this.refresh();
        }
    };

    public uploadFile = (file: File | null) => {
        if (file === null)
            return;

        CommonStore.instance.api.files.upload(file, (r) => {
            if (this.editModel.editing) {
                this.editModel.model.files.push(r);
            }
        }, () => console.log('error'));
        console.log(file);
    };

    public cancelEdit = () => {
        // CommonStore.instance.api.ads.delete(id, () => this.refresh(), this.showError)
        this.editModel.editing = false;
        this.editModel.isShowAuthorsDialog = false;
        this.editModel.isShowStunetsDialog = false;
        this.editModel.filterByAuthors = '';
        this.editModel.filterByStudents = '';

        if (this.project === null)
            return;

        this.editModel.model = ({
            id: this.project.id,
            name: this.project.name,
            description: this.project.description,
            category: ({
                id: this.project.category.id,
                name: this.project.category.name,
            }),
            files: this.project.files.map(x => ({ id: x.id, name: x.name, extension: x.extension})),
            authors: this.project.authors.map(x => ({id: x.id, name: x.name})),
            archived: this.project.archived,
            students: this.project.students.map(x => ({id: x.id, name: x.name})),
            enabled: this.project.enabled,
            created: this.project.created
        })
    }

    public saveEdit = () => {
        CommonStore.instance.api.projects.update(this.editModel.model, () => {
            this.cancelEdit();
            this.refresh();
        })
    }

    public edit = () => {
        this.editModel.editing = true;
        this.editModel.isShowAuthorsDialog = false;
        this.editModel.isShowStunetsDialog = false;
        this.editModel.filterByAuthors = '';
        this.editModel.filterByStudents = '';

        if (this.project === null)
            return;

        this.editModel.model = ({
            id: this.project.id,
            name: this.project.name,
            description: this.project.description,
            category: ({
                id: this.project.category.id,
                name: this.project.category.name,
            }),
            files: this.project.files.map(x => ({ id: x.id, name: x.name, extension: x.extension})),
            authors: this.project.authors.map(x => ({id: x.id, name: x.name})),
            archived: this.project.archived,
            students: this.project.students.map(x => ({id: x.id, name: x.name})),
            enabled: this.project.enabled,
            created: this.project.created
        })
    }

    public demo = () => {
        this.history.push(`/projects/demo?id=${this.projectId}`);
    };

    public create = () => {
        CommonStore.instance.api.ads.create('Новый рекламный блок', 'Описание...', this.projectId, (r) => {
       // this.refresh()
            this.history.push(`/ad?id=${r.id}`);
        }, this.showError)
    };

    public refresh = () => {
        CommonStore.instance.api.projects.get(this.projectId, res => {
            this.project = res.project;
            this.students = res.students;
            this.teachers = res.teachers;
            this.categories = res.categories;
            this.cancelEdit();
        }, this.showError)
    }

    public showError = (error: string) => {
        console.log(error)
    }
}