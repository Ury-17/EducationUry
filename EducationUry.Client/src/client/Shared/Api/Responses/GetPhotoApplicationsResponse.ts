import {GeoLocation} from "../Types/GeoLocation";
import {GeoPhoto} from "./GetPhotoListResponse";

export type GetPhotoApplicationsResponse = {
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