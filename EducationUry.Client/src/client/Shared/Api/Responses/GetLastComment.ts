export type GetLastComment = {
	id: string;
	text: string;
	created: string;
	owner: ({
		id: string;
		login: string;
		avatar: string;
	}),
	photo: ({
		id: string;
		name: string;
		yearMin: number;
		yearMax: number;
	})
}