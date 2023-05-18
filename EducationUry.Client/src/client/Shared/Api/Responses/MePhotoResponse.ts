export type MePhotoResponse = {
	access: {
		link: string;
		type: number;
	},
	author: string | null,
	createdDateTime: string;
	description: string;
	file: string;
	isDeleted: boolean;
	locationId: string;
	name: string;
	ownerId: string;
	source: string | null;
	tags: string[];
	yearMax: string;
	yearMin: string;
	id: string;
}