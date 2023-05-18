import {GeoLocation} from "../Types/GeoLocation";

export type GetFavoritesResponse = {
	author: string | null;
	comments: number;
	complaints: number;
	coord: number[] | null;
	created: string;
	description: string;
	favorite: number;
	file: string;
	id: string;
	locations: GeoLocation[];
	name: string;
	owner: ({
		avatar: string;
		id: string;
		login: string;
		rate: number;
	});
	source: string | null;
	tags: string[];
	version: number;
	views: number;
	ymn: number | null;
	ymx: number | null;
}