export type FastSearchResult = {
	photos: ({
		id: string;
		file: string;
		name: string
	})[],
	users: ({
		id: string;
		avatar: string;
		name: string;
	})[],
	comments: ({
		id: string;
		text: string;
		photo: ({
			id: string;
			name: string;
		})
	})[]
}
