type WaitResult = {
	waitId: string;
	callback: (data: any) => void;
	created: number;
	expired: number;
}
export class ResponseResolver {
	private waits: WaitResult[];

	constructor() {
		this.waits = [];
		// setInterval(() => {
		// 	this.cleanup();
		// }, 1000)
	}

	private cleanup = () => {
		const now = Date.now();
		const cancelWaits = this.waits.filter(c => c.expired > now);
	};

	public resolve = <T>(id: string, data: T) => {
		const waitIndex = this.waits.findIndex(w => w.waitId === id);
		console.log('resolve')
		console.log(waitIndex)

		if (waitIndex === -1) {
			return;
		}

		const targetWait = this.waits[waitIndex];
		targetWait.callback(data);

		this.waits = this.waits.filter(c => c.waitId !== targetWait.waitId);
	}

	public waitResponse = <T>(id: string, expiredSeconds: number, callback: (response: T) => void) => {
		this.waits = this.waits
			.filter(w => w.waitId !== id)
			.concat([this.createWait(id, expiredSeconds, callback)])
	}

	private createWait = <T>(id: string, expiredSeconds: number, callback: (response: T) => void) : WaitResult => {
		const nowAsNumber = Date.now();
		const now = new Date(nowAsNumber);
		return ({
			waitId: id,
			created: nowAsNumber,
			expired: now.setSeconds(now.getSeconds() + expiredSeconds),
			callback: callback
		})
	};
}
