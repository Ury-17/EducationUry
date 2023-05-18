import {UserSex} from "../Types/UserSex";
import {GeoLocation} from "../Types/GeoLocation";

export type ProfileResponse = {
	login: string;
	name: string;
	avatar: string | undefined;
	sex: UserSex;
	bio: string;
	rate: number;
	links: UserProfileLink[];
	created: string;
	location: GeoLocation | undefined;
	followers: ProfileFollower[];
	subs: UserSubscriptions;
};

export type ProfileFollower = {
	id: string;
	login: string;
	avatar: string | undefined;
	rate: number;
};

export type UserSubscriptions = {
	locations: GeoLocation[];
	users: SubUser[]
};


export type SubUser = {
	id: string;
	login: string;
	avatar: string | undefined;
	rate: number;
}

export type UserName = {
	first: string;
	lastName: string;
	middle: string;
}

export type UserProfileLink = {
	name: string;
	site: string;
	url: string;
}

export type UserLink = {
	name: string;
	site: string;
	url: string;
}
