import { CommonStore } from "../../../Layouts/CommonStore";
import {computed, makeObservable, observable} from "mobx";
import * as React from "react";
import {RefObject} from "react";
import { SignUpResponse } from "../../../Shared/Api/Controllers/ApiRegistration";

export class RegistrationStore {
	constructor() {
		makeObservable(this);

		this.applicationCommand = ({
			login: '',
			email: '',
			password: ''
		});

		this.secretCodeRef1 = React.createRef<HTMLInputElement>();
		this.secretCodeRef2 = React.createRef<HTMLInputElement>();
		this.secretCodeRef3 = React.createRef<HTMLInputElement>();
		this.secretCodeRef4 = React.createRef<HTMLInputElement>();
	}

	@observable
	public applicationCommand: ({
		login: string;
		email: string;
		password: string;
	})
	
    @observable
    public email: string = ""
    @observable
    public password: string = ""
    @observable
    public showCodePage: boolean = false

	@observable
	public isWaitCode: boolean = false;
	@observable
	public secretCodeRef1: RefObject<HTMLInputElement>;
	@observable
	public secretCodeRef2: RefObject<HTMLInputElement>;
	@observable
	public secretCodeRef3: RefObject<HTMLInputElement>;
	@observable
	public secretCodeRef4: RefObject<HTMLInputElement>;

	@observable
	public code: string[] = ['', '', '', ''];

	@observable
	public expiredDt: ({
		current: number;
		border: number;
	}) | null = null

	public writeCode = (value: string, idx: number) => {
		this.code[idx] = value;

		if (idx === 0) {
			this.secretCodeRef2.current?.focus();
		} else if (idx === 1) {
			this.secretCodeRef3.current?.focus();
		} else if (idx === 2) {
			this.secretCodeRef4.current?.focus();
		}
	};

    @computed
    public get isValid() {
        return this.email.includes('@') && this.email.includes('.') && this.password.length >= 4 && this.password.length <= 16
    }

	@computed
	public get expiredDateTime() {
		if (this.expiredDt === null) {
			return '00:00';
		}

		const minutes = Math.floor(this.expiredDt.current / 60);
		const seconds = this.expiredDt.current - (minutes * 60);

		let m = minutes.toString();
		let s = seconds.toString();

		if (minutes < 10) {m = '0'+minutes;}
		if (seconds < 10) {s = '0'+seconds;}

		return `${m}:${s}`;
	}

	public secretKey: string | null = null;

	@observable
	private signUpResponse?: SignUpResponse
	@observable
	public responseError?: string
	private resetError = () => {
		this.responseError = undefined;
	}

	private getMinutes = (waitMinutes: number) => {
		const now = new Date();
		const border = new Date(now.setMinutes(now.getMinutes() + (waitMinutes / 60))).getTime();

		return ({
			current: waitMinutes,
			border: border
		})
	}

    public sendSecretCode = () => {
		this.resetError();

		CommonStore.instance.api.registration.sendCode(this.email, this.password,
			res => {
				this.signUpResponse = res
        		this.showCodePage = true
        		this.isWaitCode = true;

				const dt = this.getMinutes(res.wait)
				
				this.expiredDt = ({
					current: dt.current,
					border: dt.border
				})
				this.updateExpiredTime();
			},
			error => {
				this.responseError = error
			})
    }

	@computed
	public get isValidSecretCode() {
		const secretCode = `${this.code[0]}${this.code[1]}${this.code[2]}${this.code[3]}`;

		return secretCode.length == 4 && checkSymbol(secretCode[0]) && checkSymbol(secretCode[0]) && checkSymbol(secretCode[0]) && checkSymbol(secretCode[0])

		function checkSymbol(v: string) {
			return v != "" && v != " "
		}
	}

    public verifySecretCode = () => {
		this.resetError();

		const secretCode = `${this.code[0]}${this.code[1]}${this.code[2]}${this.code[3]}`;

		if (!this.isValidSecretCode) {
			return;
		}
		
		
		if (this.signUpResponse !== undefined) {
			const appId = this.signUpResponse.applicationId;
			console.log(appId)
			CommonStore.instance.api.registration.verifyCode(appId, secretCode,
				res => {
					console.log(res.userId)
					this.expiredDt = null;
 	       			this.showCodePage = true
 	       			this.isWaitCode = true;
					this.showFinishRegistration = true;
				},
				error => {
					this.responseError = error
				})
		}
	}

	@observable
	public showFinishRegistration: boolean = false;

	private updateExpiredTime = () => {
		const interval = setInterval(() => {
			if (this.expiredDt !== null && this.expiredDt.current > 0) {
				this.expiredDt.current-=1;
				console.log('123')
			} else {
				clearInterval(interval);
			}
		}, 1000);
	};
}