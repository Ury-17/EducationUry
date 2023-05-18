import {makeObservable, observable} from "mobx";

export class EventHandler<T> {
	// @observable
	private callbacks: ((arg: T) => void)[];
	
	constructor() {
		// makeObservable(this);
		this.callbacks = [];
	}
	
	public addListener = (listener: (arg: T) => void) => {
		this.callbacks.push(listener);
	};
	
	public invoke = (arg: T) => {
		for (let i = 0; i < this.callbacks.length; i++) {
			this.callbacks[i](arg);
		}
	};
}