export type MeCommentsResponse = {
	text: string;
	rate: number;
	id: string;
	created: string;
	photo: ({
		id: string;
		name: string;
	})
}