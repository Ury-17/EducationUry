export type WSGetComment = {
	id: string;
	text: string;
	created: string;
	replyId: string | null;
	
	owner: {
		avatar: string;
		id: string;
		login: string;
	},
	photo: {
		id: string;
		name: string;
		yearMax: number;
		yearMin: number;
	}
}