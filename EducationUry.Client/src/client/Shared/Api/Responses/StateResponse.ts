export type StateResponse = {
	user: {
		id: string;
		email: string;
	} | null,
	api: {
		version: string;
		host: string;
	}
}