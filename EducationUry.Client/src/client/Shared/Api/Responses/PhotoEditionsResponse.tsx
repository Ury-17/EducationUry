export type PhotoEditionsResponse = {
	current: ({
		author: string | null
		created: string;
		description: string;
		fileId: string;
		id: string;
		name: string;
		owner: ({
			avatarId: string;
			id: string;
			login: string;
			rate: number
		}),
		source: string | null
		tags: string[]
		ymn: number | null
		ymx: number | null
	}),
	editions: ({
		dateTime: string;
		fields: any;
		ownedBy: string;
		version: number;
	})[]
};