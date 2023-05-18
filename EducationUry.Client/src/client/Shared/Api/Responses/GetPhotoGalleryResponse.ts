import {GeoLocation} from "../Types/GeoLocation";
import {GeoPhoto} from "./GetPhotoListResponse";

export type GetGalleryResponse = {
	list: GetPhotoGalleryResponse[];
	moderation: GetPhotoModerationResponse[];
};

export type GetPhotoModerationResponse = {
	id: string;
	created: string;
	description: string;
	file: string;
	locations: GeoLocation[];
	name: string;
	owner: {
		id: string;
		avatar: string | null;
		login: string;
	},
	tags: string[];
	yearMin: number;
	yearMax: number;
	geo: GeoPhoto | null;
}

export type GetPhotoGalleryResponse = {
	id: string;
	comments: number;
	complaints: number;
	created: string;
	description: string;
	favorites: number;
	file: string;
	locations: GeoLocation[];
	name: string;
	owner: {
		id: string;
		avatar: string | null;
		login: string;
	},
	tags: string[];
	yearMin: number;
	yearMax: number;
	geo: GeoPhoto | null;
}