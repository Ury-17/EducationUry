export type CommentEdition = {
	dateTime: string;
	text: string;
	version: number;
	owner: ({
		id: string;
		avatar: string;
		login: string;
		rate: number;
	})
};