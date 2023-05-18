import {GeoLocation} from "../Types/GeoLocation";

export type GetComplaintListResponse = {
	comments: Complaint<AttitudeComment>[],
	photos: Complaint<AttitudePhoto>[],
	users: Complaint<AttitudeUser>[],
}

export enum AttitudeType {
	User = 0,
	Photo = 1,
	Comment = 2
}

export enum ComplaintStatus
{
	Pending,
	Confirmed,
	Rejected
}

export enum ComplaintType
{
	Insult, // Оскорбление
	Spam, // Спам
	Misleading, // Вводит в заблуждение
	LawViolation, // Нарушение закона
	Copyright, // Нарушение авторских прав
	Other // Прочее
}

type UnitComplaint = {
	attitudeType: AttitudeType,
	closed: null;
	closer: null;
	created: string;
	id: string;
	status: ComplaintStatus;
	type: ComplaintType;
}
type UnitOwner = {
	avatar: string | null;
	complaints: UnitComplaint[];
	id: string;
	name: string;
	rate: number;
}

type AttitudeUser = {
	avatar: string | null;
	comments: number;
	id: string;
	complaints: UnitComplaint[];
	name: string;
	photos: number;
	rate: number;
}

type AttitudePhoto = {
	comments: number;
	created: string;
	description: string;
	file: string;
	id: string;
	isDeleted: boolean;
	locations: GeoLocation[];
	name: string;
	owner: UnitOwner;
	stats: ({
		rate: number;
		likes: number;
		dislikes: number
	}),
	tags: string[];
	yearMax: number | null;
	yearMin: number | null;
}

type AttitudeComment = {
	created: string;
	id: string;
	owner: UnitOwner;
	photo: ({
		fileId: string;
		id: string;
		name: string;
		owner: UnitOwner;
	}),
	text: string;
}

type Complaint<T> = {
	attitude: T;
	attitudeType: AttitudeType;
	closed: null;
	closer: null;
	comment: string | null;
	created: string;
	id: string;
	message: string;
	owner: UnitOwner,
	status: ComplaintStatus;
	type: ComplaintType
}