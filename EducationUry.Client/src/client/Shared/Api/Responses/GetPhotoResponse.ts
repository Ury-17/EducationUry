import {GeoLocation} from "../Types/GeoLocation";

export type GetPhotoResponse = {
	id: string;
	name: string;
	author: string | null;
	source: string | null;
	locations: GeoLocation[];
	tags: string[];
	file: string;
	ymn: number;
	ymx: number;
	description: string;
	created: string;
	version: number;
	owner: {
		id: string;
		login: string;
		avatar: string | null;
		rate: number;
	},
	comments: PhotoComment[],
	views: number;
	complaints: number;
	coord: number[] | undefined;
	favorite: number;
}

export type PhotoComment = {
	id: string;
	text: string;
	rate: number;
	created: string;
	complaints: number;
	replyId: string | null;
	version: number;
	y:  {
		rate: number | undefined;
	},
	owner: {
		id: string;
		login: string;
		avatar: string | null;
	}
}