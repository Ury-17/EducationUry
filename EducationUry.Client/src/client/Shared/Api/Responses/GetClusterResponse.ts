import {GeoLocation} from "../Types/GeoLocation";

export type GetClusterResponse = {
	photo: ({
		author: string | null;
		comments: number;
		complaints: number;
		created: string;
		description: string;
		file: string;
		id: string;
		locations: GeoLocation[];
		name: string;
		owner: ({
			avatar: string;
			id: string;
			name: string;
			rate: number;
		});
		source: string | null;
		stats: ({
			dislikes: number;
			isDisliked: boolean;
			isFavorite: boolean;
			isLiked: boolean;
			likes: number;
			rate: number;
			views: number;
		});
		tags: string[];
		version: number;
		yearMax: number;
		yearMin: number;
	});
	coord: number[];
	dir: number | null;
}