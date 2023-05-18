import {UserSex} from "../Types/UserSex";
import {GeoLocation} from "../Types/GeoLocation";
import {UserLink, UserSubscriptions} from "./ProfileResponse";

export type GetUserDetail = {
	name: string;
	avatar: string;
	sex: UserSex;
	bio: string;
	rate: number;
	links: UserLink[];
	id: string;
	login: string;
	// email: string;
	location: GeoLocation | undefined;
	fs: number;
	subs: UserSubscriptions;
	isSubscribed: number;
	created: string;
	isComplained: number;
}