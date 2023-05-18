import {action, computed, makeObservable, observable} from "mobx";
import {CommonStore} from "./CommonStore";
import {FastSearchResult} from "../Shared/Api/Responses/FastSearchResult";
import {DateTime} from "../Shared/DateTime";

export class NotificationStore {
	constructor() {
		makeObservable(this);

		this.isShowNotifications = false;
		this.isShowLoader = false;
		this.totalCount = 0;
		
		// this.addNotification('1', 'Добро пожаловать', NotificationType.System, 'сегодня')
		// this.addNotification('2', 'Ваш комментарий оценили', NotificationType.CommentLiked, 'вчера')
		// this.addNotification('3', 'Пользователь добавил комментарий', NotificationType.UserAddPhoto, '2 часа назад')
		
		// setTimeout(() => {
		// 	this.addToast('1', CommonStore.instance.user?.avatar, 'Пользователь Winster332_Kuka оценил ваш комментарий')
		// }, 1000)
		
		// setTimeout(() => {
		// 	this.addToast('2', CommonStore.instance.user?.avatarId, 'Добро пожаловать в HistoryHub')
		// }, 1000)
		// setTimeout(() => {
		// 	this.addToast('3', CommonStore.instance.user?.avatarId, 'Фотография успешно обработана')
		// }, 1200)
		// setTimeout(() => {
		// 	this.addToast('4', CommonStore.instance.user?.avatarId, 'Фотография успешно обработана')
		// }, 1200)
	}
	
	@observable
	public toasts: NotificationToast[] = [];
	public totalCount: number;
	@observable
	public isShowNotifications: boolean;
	@observable
	public items: NotificationItem[] = [];
	@observable
	public isShowLoader: boolean;
	
	public addToast = (id: string, file: string, text: string) => {
		this.toasts.push(({
			id: id, 
			file: file, 
			isShow: true, 
			text: text,
			onClose: (toastId) => {
				const toastIndex = this.toasts.findIndex(c => c.id === toastId);
				if (toastIndex !== -1) {
					this.toasts[toastIndex].isShow = false;

					setTimeout(() => {
						this.toasts = this.toasts.filter(c => c.id !== this.toasts[toastIndex].id);
					}, 1000);
				}
			}
		}))
	}

	public addNotification = (id: string, message: string, type: NotificationType, dateTime: string) => {
		this.items.push(({
			id: id,
			message: message,
			type: type,
			dateTime: dateTime
		}))
	};

	public toggle = () => {
		this.isShowNotifications = !this.isShowNotifications;
		this.items = [];
		
		if (this.isShowNotifications) {
			this.isShowLoader = true;
			// CommonStore.instance.api.me
			// 	.notifications(5)
			// 	.on(res => res.jsonAs<any>(value => {
			// 		this.isShowLoader = false;
			// 		console.log(value)
			// 		for (let i = 0; i < value.length; i++) {
			// 			const n = value[i];
						
			// 			this.addNotification(n.id, n.text, NotificationType.CommentLiked, DateTime.parse(n.dateTime).toShortWhenString(true));
			// 		}
			// 	}))
			// 	.emit();
		} else {
			this.totalCount = 0;
		}
	};
}

export type NotificationToast = {
	id: string;
	file: string;
	text: string;
	isShow: boolean;
	onClose: (id: string) => void;
}

export enum NotificationType {
	System,
	UserAddPhoto,
	CommentLiked,
	CommentDisliked
}

export type NotificationItem = {
	id: string;
	message: string;
	type: NotificationType;
	dateTime: string;
}

export class NavMenuStore {
	constructor() {
		makeObservable(this);
		
		this.collapsed = true;
		this.showMenu = false;
		this.searchText = '';
		this.searchResult = null;
		
		this.notificationStore = new NotificationStore();
		// document.body.onclick = () => {
		// 	console.log('click')
			// if (this.showCreationMenu) {
			// 	this.showCreationMenu = false;
			// }
		// };
	}
	
	public notificationStore: NotificationStore;
	
	@observable
	public collapsed: boolean;
	@observable
	public showMenu: boolean;
	@observable
	public searchText: string;
	
	@computed
	public get isShowSearchList() {
		return this.searchText.replace(' ', '').length !== 0;
	}
	
	@observable
	public showPhotoEditorPopover: boolean = false;
	
	@observable
	public showCreationMenu: boolean = false;

	@action
	public toggleCreationMenu = () => {
		this.showCreationMenu = !this.showCreationMenu;
	}

	public toggleNavbar = () => {
		this.collapsed = !this.collapsed
	}
	
	public toggleMenu = () => {
		this.showMenu = !this.showMenu;
	};
	
	@observable
	public isShowSearchLoader: boolean = false;
	
	public changeSearchText = (text: string) => {
		this.searchText = text;
		this.isShowSearchLoader = true;
		setTimeout(() => {
			if (this.searchText === text) {
				console.log('yes')
				console.log(this.searchText)
				this.isShowSearchLoader = false;
				
				if (text === '') {
					this.searchResult = null;
					this.searchText = '';
				} else {
					this.fastSearch();
				}
			}
		}, 1000)
	}
	
	private fastSearch = () => {
		// CommonStore.instance.api.search
		// 	.fast(this.searchText)
		// 	.on(res => res.jsonAs<FastSearchResult>(value => {
		// 		this.searchResult = value;
		// 		console.log(this.searchResult)
		// 	}))
		// 	.emit();
	};
	
	public logout = () => {
		CommonStore.instance.api.logout();
	};
	
	@observable
	public searchResult: FastSearchResult | null;

	@observable
	public showAdBlockEditor: boolean = false;
	
	public openBlockAdEditor = () => {
		this.showCreationMenu = false;
		this.showAdBlockEditor = true;
		console.log('open block ad')
	};

	public openMapAdEditor = () => {
		this.showCreationMenu = false;
		console.log('open map ad')
	};
}
