export type ProjectFileModel = {
    id: string;
    name: string;
    extension: string;
}
export type ProjectAuthorModel = {
    id: string;
    name: string;
}
export type ProjectStudentModel = {
    id: string;
    name: string;
}
export type CategoryModel = {
    id: string;
    name: string;
}

export type ProjectResponse = {
    project: ProjectModel;
    teachers: ProjectAuthorModel[];
    students: ProjectStudentModel[];
    categories: CategoryModel[];
}

export type ProjectModel = {
	id: string,
	name: string,
	enabled: boolean,
	description: string,
	created: number,
	archived: boolean
	students: ProjectStudentModel[],
	authors: ProjectAuthorModel[],
	files: ProjectFileModel[],
    category: CategoryModel;
}