export type GetMeSubscriptions = {
	users: ({
		id: string;
		avatar: string;
		login: string;
	})[],
	locations: ({
		id: string;
		name: string;
		idx: number;
	})[]
}