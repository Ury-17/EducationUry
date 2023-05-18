import {UserSex} from "../Types/UserSex";
import {GeoLocation} from "../Types/GeoLocation";
import {UserLink} from "./ProfileResponse";

export type GetProfileSettingsResponse = {
	name: string;
	avatar: string;
	location: GeoLocation | null;
	sex: UserSex;
	bio: string;
	links: UserLink[];
}