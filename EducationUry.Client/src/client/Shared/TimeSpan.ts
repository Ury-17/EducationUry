import {DateTime} from "./DateTime";

export class TimeSpan {
	private hours: number;
	private minutes: number;
	private seconds: number;
	
	constructor(hours: number, minutes: number, seconds: number) {
		this.hours = hours;
		this.minutes = minutes;
		this.seconds = seconds;
	}
	
	public getTotalSeconds = () => {
		return (this.hours * 60 + this.minutes) * 60 + this.seconds
	};

	public toString = (hideSeconds?: boolean) => {
		const hours = Math.abs(this.hours);
		const minutes = Math.abs(this.minutes);
		const seconds = Math.abs(this.seconds);
		
		let h = hours.toString();
		let m = hours.toString();
		let s = hours.toString();
		
		if (hours   < 10) {h   = '0'+hours;}
		if (minutes < 10) {m = '0'+minutes;}
		if (seconds < 10) {s = '0'+seconds;}

		if (hideSeconds) {
			return hours+':'+minutes;
		}
		return hours+':'+minutes+':'+seconds;
	};
	
	public diff = (ts: TimeSpan) => {
		const first = this.getTotalSeconds();
		const second = ts.getTotalSeconds();
		const totalDiff = first - second;

		let hours   = Math.floor(totalDiff / 3600);
		let minutes = Math.floor((totalDiff - (hours * 3600)) / 60);
		let seconds = totalDiff - (hours * 3600) - (minutes * 60);

		// if (hours   < 10) {hours   = hours*-1;}
		// if (minutes < 10) {minutes = minutes*-1;}
		// if (seconds < 10) {seconds = seconds*-1;}
		
		// return hours+':'+minutes+':'+seconds;
		// const hours = totalDiff / 3600;
		// const minutes = totalDiff / hours / 60;
		// const seconds = totalDiff / 60;
		
		return new TimeSpan(
			Math.round(hours),
			Math.round(minutes),
			Math.round(seconds)
		);
	};
	
	public getSeconds = () => {
		return this.seconds;
	}

	public getMinutes = () => {
		return this.minutes;
	}
	
	public getHours = () => {
		return this.hours;
	}
	
	public static fromDateTime = (dt: DateTime) => {
		return new TimeSpan(dt.getHours(), dt.getMinutes(), dt.getSeconds());
	};
}