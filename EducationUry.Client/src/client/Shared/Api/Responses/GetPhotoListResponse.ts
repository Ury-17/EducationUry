import {GeoLocation} from "../Types/GeoLocation";

export type GetPhotoListResponse = {
	_id: string;
	comments: number;
	complaints: number;
	created: string;
	description: string;
	fileId: string;
	locations: GeoLocation[];
	name: string;
	owner: {
		_id: string;
		avatarId: string | null;
		name: string;
	},
	stats: {
		dislikes: number;
		likes: number;
		isLiked: boolean;
		isDisliked: boolean;
		isFavorite: boolean;
	},
	tags: string[];
	yearMin: number;
	yearMax: number;
	geo: GeoPhoto | null;
}

export type GeoPhoto = ({
	dir: number | null;
	coord: number[];
})