export type GetEditPhotoResponse = {
	id: string;
	name: string;
	author: string | null;
	source: string | null;
	location: string | null;
	tags: string[];
	file: string;
	description: string;
	created: string;
	date: {
		min: number;
		max: number;
	},
	geo: {
		lt: number;
		ln: number;
		angle: number;
	} | undefined,
	access: PhotoAccessType;
}

export enum PhotoAccessType
{
	Published = 0,
	Draft = 1,
	Moderation = 2,
}
