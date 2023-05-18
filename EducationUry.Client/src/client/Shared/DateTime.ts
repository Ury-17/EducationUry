import {TimeSpan} from "./TimeSpan";

type MonthUnit = {
	idx: number;
	fullName: string;
	shortName: string;
};

const monthNames: MonthUnit[] = [
	({ idx: 1, fullName: 'Январь', shortName: 'Янв' }),
	({ idx: 2, fullName: 'Февраль', shortName: 'Фев' }),
	({ idx: 3, fullName: 'Март', shortName: 'Март' }),
	({ idx: 4, fullName: 'Апрель', shortName: 'Апр' }),
	({ idx: 5, fullName: 'Май', shortName: 'Май' }),
	({ idx: 6, fullName: 'Июнь', shortName: 'Июнь' }),
	({ idx: 7, fullName: 'Июль', shortName: 'Июль' }),
	({ idx: 8, fullName: 'Август', shortName: 'Авг' }),
	({ idx: 9, fullName: 'Сентябрь', shortName: 'Сент' }),
	({ idx: 10, fullName: 'Октябрь', shortName: 'Окт' }),
	({ idx: 11, fullName: 'Ноябрь', shortName: 'Ноябрь' }),
	({ idx: 12, fullName: 'Декабрь', shortName: 'Дек' }),
];

export class DateTime {
	private baseDate: Date;
	
	constructor(date: Date) {
		this.baseDate = date;
	}
	
	public static parse = (value: string) => {
		return new DateTime(new Date(Date.parse(value)));
	};
	
	public static now = () => {
		return new DateTime(new Date());
	};
	
	public toString = (format: string) => {
	};
	
	public getDay = () => {
		return this.baseDate.getDate();
	};
	
	public getDate = () => {
		return new Date(this.getYear(), this.getMonth(), this.getDay(), this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds())
	};
	
	public getTicks = () => {
		return this.baseDate.getTime();
	};
	
	public getMonth = () => {
		return this.baseDate.getMonth()+1;
	};

	public getMonthAsString = () => {
		return monthNames.find(c => c.idx === this.getMonth())!;
	};
	
	public isAfter = (dt: DateTime) => {
		return this.getTicks() > dt.getTicks()
	};

	public isBefore = (dt: DateTime) => {
		return !this.isAfter(dt);
	};
	
	public toTimeSpan = () => {
		return TimeSpan.fromDateTime(this);
	};
	
	public toShortWhenString = (textMonth?: boolean) => {
		const now = DateTime.now();
		const diff = now.toTimeSpan().diff(this.toTimeSpan());
		
		if (now.addSecond(-15).isBefore(this)) {
			return 'Только что';
		}
		if (now.addMinute(-1).isBefore(this)) {
			return 'Меньше минуты';
		}
		if (now.addHour(-1).isBefore(this)) {
			return `${diff.getMinutes()}М`;
		}
		if (now.addDay(-1).isBefore(this)) {
			return `${diff.toString(true)}Ч`;
		}
		return this.toFullString(textMonth);
	};

	public addYear = (value: number) => {
		const dt = new Date(new Date(this.baseDate).setFullYear(this.getYear() + value));
		
		return new DateTime(dt);
	};

	public addDay = (value: number) => {
		const dt = new Date(new Date(this.baseDate).setDate(this.getDay() + value));
		
		return new DateTime(dt)
	};

	public addMonth = (value: number) => {
		const dt = new Date(new Date(this.baseDate).setMonth(this.getMonth() + value));
		return new DateTime(dt)
	};
	
	public addMinute = (value: number) => {
		const dt = new Date(new Date(this.baseDate).setMinutes(this.getMinutes() + value));
		return new DateTime(dt)
	};

	public addSecond = (value: number) => {
		const dt = new Date(new Date(this.baseDate).setSeconds(this.getSeconds() + value));
		return new DateTime(dt)
	};

	public addHour = (value: number) => {
		const dt = new Date(new Date(this.baseDate).setHours(this.getHours() + value));
		
		return new DateTime(dt)
	};

	public toDateString = () => {
		return `${this.getDay()}.${this.getMonth()}.${this.getYear()}`;
	};

	public toTimeString = (hideSeconds?: boolean) => {
		const hours = this.getHours();
		const minutes = this.getMinutes();
		const seconds = this.getSeconds();

		let h = hours.toString();
		let m = minutes.toString();
		let s = seconds.toString();
		
		if (hours   < 10) {h   = '0' + hours;}
		if (minutes < 10) {m = '0' + minutes;}
		if (seconds < 10) {s = '0' + seconds;}

		if (hideSeconds) {
			return h+':'+m;
		}
		return h+':'+m+':'+s;
	};

	public toFullString = (textMonth?: boolean) => {
		if (textMonth) {
			const monthName = monthNames.find(m => m.idx === this.getMonth())?.shortName;
			return `${this.getDay()} ${monthName} ${this.getYear()}`;
		}
		return `${this.getDay()}.${this.getMonth()}.${this.getYear()} ${this.toTimeString(true)}`;
	};

	public getYear = () => {
		return this.baseDate.getFullYear();
	};
	
	public getHours = () => {
		return this.baseDate.getHours();
	};
	
	public getMinutes = () => {
		return this.baseDate.getMinutes();
	};
	
	public getSeconds = () => {
		return this.baseDate.getSeconds();
	};
	
	public getMilliseconds = () => {
		return this.baseDate.getMilliseconds();
	};

	public static fromUnix(dt: number): number {
		return dt * 1000;
	}
}