export type VersionResponse = {
	application: string;
	identity: string;
	build: {
		hosting: string;
		version: string;
	}
}