export enum GetMapPhotoDataType {
	Entity = 0,
	Cluster = 1
}

export type GetMapPhotoCluster = {
	id: string;
	ln: number;
	lt: number;
	
	data: ({
		dir: number | null | undefined;
		type: GetMapPhotoDataType;
		p: ({
			id: string;
			fId: string;
			name: string;
			ymn: number | null;
			ymx: number | null;
		}) | undefined,
		size: number | undefined;
	})
};