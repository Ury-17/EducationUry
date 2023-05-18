import {observer} from "mobx-react-lite";
import * as React from "react";
import {CommonStore} from "./CommonStore";
import {makeObservable, observable} from "mobx";
import {MiniLoader} from "./MiniLoader";
import {Button} from "./Button";
import {GetMeSubscriptions} from "../Shared/Api/Responses/GetMeSubscriptions";
import {SubUser} from "../Shared/Api/Controllers/HistoryHubApiSubscriptions";
import {GeoLocation} from "../Shared/Api/Types/GeoLocation";
import {GearIcon} from "../Components/Icons/GearIcon";
import {CloseIcon} from "../Components/Icons/CloseIcon";
import {CSSProperties} from "react";
import {Link} from "../Components/Navigations/Link";

export class SettingsSubscriptionStore {
	constructor(private onClose: (isHaveChanges: boolean) => void) {
		makeObservable(this);
	}
	
	public search = () => {
		
	};
	
	@observable
	public isShowLoader = true;
	
	public open = () => {
		this.isClosed = false;
		this.isShowLoader = true;

		CommonStore.instance.api.me
			.subscriptions()
			.on(res => res.jsonAs<GetMeSubscriptions>(value => {
				this.subLocations = value.locations;
				this.subUsers = value.users;
				this.originSubLocations = value.locations;
				this.originSubUsers = value.users;
				this.isShowLoader = false;
			}))
			.emit();
	};
	
	public cancel = () => {
		this.isClosed = true;
		const isHaveChangesByUsers = this.originSubUsers.length !== this.subUsers.length 
			? true 
			: this.originSubUsers.filter(c => this.subUsers.find(j => c.id === j.id) !== undefined).length !== this.originSubUsers.length;
		const isHaveChangesByLocations = this.originSubLocations.length !== this.subLocations.length
			? true
			: this.originSubLocations.filter(c => this.subLocations.find(j => c.id === j.id) !== undefined).length !== this.originSubLocations.length;
		this.onClose(isHaveChangesByLocations || isHaveChangesByUsers);
	};
	
	@observable
	public isClosed: boolean = true;
	@observable
	public isAllowSaved: boolean = true;
	
	@observable
	public currentLocationText: string = '';
	@observable
	public currentUserText: string = '';
	
	@observable
	public searchLocationResult: SearchLocationResult[] | null = null;
	@observable
	public searchUserResult: SearchUserResult[] | null = null;
	
	public onChangeLocationText = (value: string) => {
		this.currentLocationText = value;

		if (value === '') {
			this.searchLocationResult = null;
			return;
		}
		
		setTimeout(() => {
			if (this.currentLocationText === value && value !== '') {
				CommonStore.instance.api.search
					.fastByLocations(this.currentLocationText)
					.on(res => res.jsonAs<any>(value => {
						this.searchLocationResult = value.map(c => ({
							id: c.id,
							text: c.name
						}))
					}))
					.emit();
			}
		}, 1000);
	};
	
	@observable
	public subUsers: ({
		id: string;
		avatar: string;
		login: string;
	})[] = [];
	@observable
	public subLocations: ({
		id: string;
		name: string;
	})[] = [];

	public originSubUsers: ({
		id: string;
		avatar: string;
		login: string;
	})[] = [];
	public originSubLocations: ({
		id: string;
		name: string;
	})[] = [];
	
	public addUser = (id: string) => {
		// const user = this.searchUserResult.find(c => c.id === id)!;
		// this.subUsers.push(({
		// 	id: user.id,
		// 	avatar: user.avatar,
		// 	login: user.login
		// }))
		this.searchUserResult = null;
		this.currentUserText = '';
		
		CommonStore.instance.api.subscriptions
			.subscribeToUser(id, response => {
				console.log(response)
				const user = response.entity as SubUser;

				this.subUsers.push(({
					id: user.id,
					avatar: user.avatar,
					login: user.login
				}))
			})
			.emit();
	};

	public addLocation = (id: string) => {
		// const location = this.searchLocationResult.find(c => c.id === id)!;
		this.searchLocationResult = null;
		this.currentLocationText = '';

		console.log(id)
		CommonStore.instance.api.subscriptions
			.subscribeToLocation(id, response => {
				const location = response.entity as GeoLocation;
				this.subLocations.push(({
					id: location.id,
					name: location.name
				}))
				console.log(response)
			})
			.emit();
	};

	public onChangeUserText = (value: string) => {
		this.currentUserText = value;
		
		if (value === '') {
			this.searchUserResult = null;
			return;
		}

		setTimeout(() => {
			if (this.currentUserText === value && value !== '') {
				CommonStore.instance.api.search
					.fastByUsers(this.currentUserText)
					.on(res => res.jsonAs<any>(value => {
						this.searchUserResult = value.map(c => ({
							id: c.id,
							avatar: c.avatar,
							login: c.login
						}))
					}))
					.emit()
			}
		}, 1000);
	};

	public removeLocation = (id: string) => {
		
		CommonStore.instance.api.subscriptions
			.unsubscribeToLocation(id, response => {
				console.log(response)
				this.subLocations = this.subLocations.filter(c => c.id !== response.id);
			})
			.emit();
	}
	
	public removeUser = (id: string) => {
		
		CommonStore.instance.api.subscriptions
			.unsubscribeToUser(id, response => {
				console.log(response)
				this.subUsers = this.subUsers.filter(c => c.id !== response.id);
			})
			.emit();
	}
}

export const SettingsSubscription = observer((props: {
	store: SettingsSubscriptionStore;
}) => {
	const store = props.store;
	
	if (store.isClosed) {
		return <></>;
	}

	return <div className="v-popup-fp-container">
		<div className="v-popup-fp-overlay">
			<div className="v-popup-fp-window">
				<div className="v-popup-fp-window__controls">
					<div className="v-popup-fp-window__control" onClick={() => props.store.cancel()}>
						<CloseIcon/>
					</div>
				</div>
				<div className="v-popup-fp-window__body">
					<div className="editor l-island-bg" style={{'--scrollbar-size': '0px'}}>
						<div data-ignore-scroll-lock="" className="editor__body">
							<div className="editor__authors">
								<div className="editor-ap">
									<div className="editor-ap__content l-editor l-flex l-fa-center">
										<div className="editor-ap__item">
											<div className="editor-subsite-select editor-subsite-select--disabled">
												<div className="editor-subsite-select__current">
													<span className="editor-subsite-select__image">
														<img src={CommonStore.instance.api.files.getSmallUserAvatar(CommonStore.instance.user!.avatar)}/>
													</span>
													<span className="editor-subsite-select__label" style={{fontSize: '23px'}}>Подписки</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div data-ignore-scroll-lock="" className="editor__scrollable">
								<div className="editor__content">
									<div className="l-editor">
										<div style={{
											display: 'grid',
											gridGap: '10px',
											columns: 'auto auto',
											gridTemplateColumns: 'repeat(2, 50%)'
										}}>
											<div className="ui-limited-input ui-limited-input--big" data-length="120" style={{gridColumn: 1}}>
												<div className='subs-settings-title'>Локации <span className='sub-indicator-count'>{store.subLocations.length}</span></div>

												<input
													value={store.currentLocationText}
													onChange={(e) => store.onChangeLocationText(e.target.value)}
													type='text'
													placeholder='Локация'
													onKeyUp={(e) => {
														if (e.key === 'Enter') {
															// props.onAdd();
														}
													}} style={{
													marginTop: '15px',
													width: '100%',
													outline: 'none',
													border: '1px solid #d6d6d6',
													borderRadius: '8px',
													height: '38px',
													padding: '0px 20px',
													fontSize: '16px'
												}}/>

												{store.isShowLoader 
													? <div style={{
														width: '100%',
														height: '100%',
														display: 'flex',
														justifyContent: 'center',
														fontSize: '40px'
													}}>
														<MiniLoader size={50} show/>
													</div>
													: <SearchLocationList result={props.store.searchLocationResult} onAdd={id => store.addLocation(id)}/>
												}
												{props.store.subLocations.length !== 0 &&
												<div style={{
													marginTop: '10px',
													border: '1px solid #d6d6d6',
													borderRadius: '8px',
													padding: '10px 20px'
												}}>
													{store.subLocations.map((l, idx) =>
														<div key={idx} style={{
															display: 'grid',
															columns: 'auto auto',
															marginTop: idx === 0 ? '0px' : '10px',
														}}>
															<div
																style={{
																	gridColumn: 1,
																	color: '#333',
																	fontSize: '15px',
																	fontWeight: 500,
																	whiteSpace: 'nowrap',
																	lineHeight: '27px',
																	overflow: 'hidden',
																	textOverflow: 'ellipsis'
																}}>{l.name}</div>
															<div style={{gridColumn: 2, display: 'flex', marginLeft: 'auto'}}>
																<Button onClick={() => store.removeLocation(l.id)}>Отписаться</Button>
															</div>
														</div>)}
												</div>
												}
											</div>
											
											<div className="ui-limited-input ui-limited-input--big" data-length="120" style={{gridColumn: 2}}>
												<div className='subs-settings-title'>Пользователи <span className='sub-indicator-count'>{store.subUsers.length}</span></div>
												<input
													value={store.currentUserText}
													onChange={(e) => store.onChangeUserText(e.target.value)}
													type='text'
													placeholder='Пользователь'
													onKeyUp={(e) => {
														if (e.key === 'Enter') {
															// props.onAdd();
														}
													}} style={{
													marginTop: '15px',
													width: '100%',
													outline: 'none',
													border: '1px solid #d6d6d6',
													borderRadius: '8px',
													height: '38px',
													padding: '0px 20px',
													fontSize: '16px'
												}}/>
												{store.isShowLoader
													? <div style={{
														width: '100%',
														height: '100%',
														display: 'flex',
														justifyContent: 'center',
														fontSize: '40px'
													}}>
														<MiniLoader size={50} show/>
													</div>
													: <SearchUserList result={props.store.searchUserResult} onAdd={id => store.addUser(id)}/>
												}
												{props.store.subUsers.length !== 0 &&
												<div style={{
													marginTop: '10px',
													border: '1px solid #d6d6d6',
													borderRadius: '8px',
													padding: '10px 20px'
												}}>
													{store.subUsers.map((l, idx) =>
														<div key={idx} style={{
															display: 'grid',
															columns: 'auto auto',
															marginTop: idx === 0 ? '0px' : '10px',
														}}>
															<div
																style={{
																	gridColumn: 1,
																	color: '#333',
																	fontSize: '15px',
																	fontWeight: 500,
																	lineHeight: '27px',
																	display: 'flex'
																}}>
																<Link href={`/user?id=${l.id}`} style={{display: 'flex', color: '#555'}}>
																	<img style={{width: '32px', borderRadius: '5px', marginRight: '10px'}} src={CommonStore.instance.api.files.getSmallUserAvatar(l.avatar)}/>
																	<div style={{
																		paddingTop: '2px',
																		overflow: 'hidden',
																		whiteSpace: 'nowrap',
																		textOverflow: 'ellipsis'
																	}}>
																		{l.login}
																	</div>
																</Link>
															</div>
															<div style={{gridColumn: 2, display: 'flex', marginLeft: 'auto'}}>
																<Button onClick={() => store.removeUser(l.id)}>Отписаться</Button>
															</div>
														</div>)}
												</div>
												}
											</div>
										</div>
										<div className="ui-limited-input ui-limited-input--big" data-length="120">
										</div>
										<div className="ui-limited-input ui-limited-input--big" data-length="120">
										</div>
										<div className="ui-limited-input ui-limited-input--big" data-length="120">
										</div>
										<div className="ui-limited-input ui-limited-input--big" data-length="120" style={{marginTop: '15px'}}>
										</div>
										<div className="ui-limited-input ui-limited-input--big" data-length="120">
										</div>
										<div className="ui-limited-input ui-limited-input--big" data-length="120">
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
});

type SearchLocationResult = {
	id: string;
	text: string;
}

type SearchUserResult = {
	id: string;
	avatar: string;
	login: string;
}

export const SearchLocationList = observer((props: ({
	onAdd: (id: string) => void;
	result: SearchLocationResult[] | null;
	style?: CSSProperties;
	itemsColor?: string;
})) => {
	// const result = props.store.searchResult;
	if (props.result === null) {
		return <></>
	}

	return (
		<div className="search-dropdown search-dropdown--focused" style={{width: '333px', marginTop: '5px', background: '#fff', position: 'absolute', top: '85px', ...props.style}}>
			{false
				? <div style={{
					margin: '10px auto',
					display: 'flex'
				}}>
					<MiniLoader show style={{
						margin: '0px auto',
					}}/>
				</div>
				: props.result === null || props.result?.length === 0 ? <div style={{textAlign: 'center', margin: '10px'}}>Ничего не найдено</div> : <>
					{props.result.length !== 0 &&
					<div className='nav-search-group' style={{borderColor: '#ededed', paddingBottom: '0px'}}>
						{props.result.map((r, idx) =>
							<a key={idx} onClick={() => props.onAdd(r.id)} className="search-dropdown-item-light search-dropdown-item-light--content">
								<div className="search-dropdown-item__value" style={{color: props.itemsColor}}>{r.text}</div>
							</a>)}
					</div>}
				</>}

		</div>
	);
});
const SearchUserList = observer((props: ({
	onAdd: (id: string) => void;
	result: SearchUserResult[] | null;
})) => {
	if (props.result === null) {
		return <></>
	}

	return (
		<div className="search-dropdown search-dropdown--focused" style={{width: '333px', marginTop: '5px', background: '#fff', position: 'absolute', top: '85px'}}>
			{false
				? <div style={{
					margin: '10px auto',
					display: 'flex'
				}}>
					<MiniLoader show style={{
						margin: '0px auto',
					}}/>
				</div>
				: props.result === null || props.result?.length === 0 ? <div style={{textAlign: 'center', margin: '10px'}}>Ничего не найдено</div> : <>
					{props.result.length !== 0 &&
					<div className='nav-search-group' style={{borderColor: '#ededed', paddingBottom: '0px'}}>
						{props.result.map((r, idx) =>
							<a key={idx} onClick={() => props.onAdd(r.id)} className="search-dropdown-item-light search-dropdown-item-light--content">
								<div className="search-dropdown-item__image">
									<img src={CommonStore.instance.api.files.getSmallUserAvatar(r.avatar)} alt="" className="andropov_image andropov_image--bordered"/>
								</div>
								<div className="search-dropdown-item__value">{r.login}</div>
							</a>)}
					</div>}
				</>}

		</div>
	);
});
