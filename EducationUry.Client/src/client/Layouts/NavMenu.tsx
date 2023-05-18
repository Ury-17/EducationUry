import {observer} from "mobx-react-lite";
import * as React from "react";
import {NavMenuStore, NotificationStore, NotificationToast} from "./NavMenuStore";
import {CommonStore} from "./CommonStore";
import {MiniLoader} from "./MiniLoader";
import {Roles} from "../Types/Roles";
import {NavLink} from "react-router-dom";
import {AppBar} from "../Components/Navigations/AppBar";
import {LogoIcon} from "../Components/Icons/LogoIcon";
import {Link} from "../Components/Navigations/Link";
import {FindIcon} from "../Components/Icons/FindIcon";
import {NotificationIcon} from "../Components/Icons/NotificationIcon";
import {DraftIcon} from "../Components/Icons/DraftIcon";
import {FavoriteIcon} from "../Components/Icons/FavoriteIcon";
import {GearIcon} from "../Components/Icons/GearIcon";
import {LogoutIcon} from "../Components/Icons/LogoutIcon";

export const NavButton = observer((props?: {
	isOpen: boolean;
	onToggleMenu: () => void;
	onClick: () => void;
	onCreateMapAd: () => void;
	onCreateBlockAd: () => void;
}) => {
	return <>
		<div data-layout-mobile="icon" data-layout-desktop="label" className="v-split-button v-split-button--default v-split-button--selecting">
			<span data-gtm="Creation button — Write — Click" air-click="openEntryEditor?id=0&amp;to=u" className="v-split-button__main" onClick={(e) => {
				// e.stopPropagation();
				props.onClick();
			}}>
				<div className="v-split-button__icon">
					<svg height="24" width="24" className="icon icon--v_pencil">
						<svg viewBox="0 0 24 24" id="v_pencil"><path fillRule="evenodd" d="M5.868 18.155l.569-1.983 8.891-8.892 1.414 1.415-8.89 8.89-1.984.57zM18.156 7.28l.643-.642-1.414-1.414-.643.642 1.414 1.414zm-13.57 8.091a1 1 0 01.254-.43L15.97 3.808a2 2 0 012.83 0l1.413 1.415a2 2 0 010 2.828l-11.13 11.13a1 1 0 01-.432.255l-3.966 1.138a1 1 0 01-1.237-1.237l1.138-3.966z" clipRule="evenodd"></path></svg>
					</svg>
				</div>
				<div className="v-split-button__label">Добавить</div>
			</span>
			{/*<div data-gtm="Creation button — Toggler — Click" className={`v-split-button__select ${props.isOpen ? 'selected' : ''}`} onClick={() => {*/}
			{/*	props.onToggleMenu();*/}
			{/*	console.log('123')*/}
			{/*}}>*/}
			{/*	<svg height="6" width="12" className="icon icon--ui_arrow_down">*/}
			{/*		<svg viewBox="0 0 18 11" id="ui_arrow_down"><path fillRule="evenodd" d="M8.109 10.41L.369 2.265a1.377 1.377 0 010-1.876 1.217 1.217 0 011.783 0L9 7.594 15.848.39a1.217 1.217 0 011.783 0 1.377 1.377 0 010 1.876L9.89 10.41c-.246.26-.57.39-.891.39-.322 0-.645-.132-.89-.39h-.001z"></path></svg>*/}
			{/*	</svg>*/}
			{/*	<div className="v-split-button__dropdown" style={{display: props.isOpen ? 'block' : 'none', zIndex: 40}}>*/}
			{/*		/!*<Link href='/excursion-editor'>*!/*/}
			{/*		/!*<span data-gtm="Creation button — Promo — Click" air-click="showBoosterConstructor" className="v-split-button-option v-split-button-option--has-icon" onClick={(e) => {*!/*/}
			{/*		/!*	e.stopPropagation();*!/*/}
			{/*		/!*	props.onCreateBlockAd();*!/*/}
			{/*		/!*}}>*!/*/}
			{/*		/!*	<div className="v-split-button-option__icon">*!/*/}
			{/*		/!*		<svg height="16" width="16" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 5H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 12H5V7h14v10z"></path></svg>*!/*/}
			{/*		/!*	</div>*!/*/}
			{/*		/!*	<div className="v-split-button-option__label">*!/*/}
			{/*		/!*		<span>Прогулка</span>*!/*/}
			{/*		/!*	</div>*!/*/}
			{/*		/!*</span>*!/*/}
			{/*		/!*</Link>*!/*/}
			{/*		/!*<span data-gtm="Creation button — Promo — Click" air-click="showBoosterConstructor" className="v-split-button-option v-split-button-option--has-icon" onClick={(e) => {*!/*/}
			{/*		/!*	e.stopPropagation();*!/*/}
			{/*		/!*	props.onCreateBlockAd();*!/*/}
			{/*		/!*}}>*!/*/}
			{/*		/!*	<div className="v-split-button-option__icon">*!/*/}
			{/*		/!*		<svg height="16" width="16" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 5H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 12H5V7h14v10z"></path></svg>*!/*/}
			{/*		/!*	</div>*!/*/}
			{/*		/!*	<div className="v-split-button-option__label">*!/*/}
			{/*		/!*		<span>Стандартное объявление</span>*!/*/}
			{/*		/!*	</div>*!/*/}
			{/*		/!*</span>*!/*/}
			{/*		<span data-gtm="Creation button — Promo — Click" air-click="showBoosterConstructor" className="v-split-button-option v-split-button-option--has-icon" style={{borderBottom: "none"}} onClick={(e) => {*/}
			{/*			e.stopPropagation();*/}
			{/*			props.onCreateMapAd();*/}
			{/*		}}>*/}
			{/*			<div className="v-split-button-option__icon">*/}
			{/*				<svg height="16" width="16" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3-8c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"></path></svg>*/}
			{/*			</div>*/}
			{/*			/!*<div className="v-split-button-option__label">*!/*/}
			{/*			/!*	<span>Объявление на карте</span>*!/*/}
			{/*			/!*</div>*!/*/}
			{/*		</span>*/}
			{/*	</div>*/}
			{/*</div>*/}
		</div>
	</>
	
	// return <div
	// 	style={{cursor: 'pointer'}}
	// 	onClick={() => props?.onClick()}
	// 	className="d-flex position-relative">
	// 	<a className="js-selected-navigation-item Header-link flex-auto mt-md-n3 mb-md-n3 py-2 py-md-3 mr-0 mr-md-3 border-top border-md-top-0 border-white-fade">
	// 		<Button style={{
	// 			borderTopRightRadius: '0px',
	// 			borderBottomRightRadius: '0px',
	// 		}}>Добавить
	// 			<Button style={{
	// 				borderTopLeftRadius: '0px',
	// 				borderBottomLeftRadius: '0px',
	// 			}}>+</Button>
	// 		</Button>
	// 	</a>
	// </div>
});

export const NavMenu = observer((props?: {
	store: NavMenuStore;
}) => {
	const store = props.store;
	
	return (
		<>
			<AppBar>
				<div className="Header-item mt-n1 mb-n1  d-none d-md-flex">
					<Link href='/'>
						<LogoIcon/>
					</Link>
				</div>
				<div
					className='Header-item Header-item--full flex-column flex-md-row width-full flex-order-2 flex-md-order-none mr-0 mr-md-3 mt-3 mt-md-0 Details-content--hidden-not-important d-md-flex'>
					<div
						style={{zIndex: 40}}
						className="header-search flex-auto js-site-search position-relative flex-self-stretch flex-md-self-auto mb-3 mb-md-0 mr-0 mr-md-3 js-jump-to">
						<div className="position-relative">
							<form className="js-site-search-form" role="search" aria-label="Site"
								  data-unscoped-search-url="/search" action="/search" acceptCharset="UTF-8"
								  method="get">
								<label
									className="form-control input-sm header-search-wrapper p-0 js-chromeless-input-container header-search-wrapper-jump-to position-relative d-flex flex-justify-between flex-items-center">
									<input type="text"
										   className="form-control input-sm header-search-input jump-to-field js-jump-to-field js-site-search-focus "
										   data-hotkey="s,/" name="q" value={props.store.searchText}
										   onChange={(e) => props.store.changeSearchText(e.target.value)}
										   placeholder="Поиск…" data-unscoped-placeholder="Search or jump to…"
										   data-scoped-placeholder="Search or jump to…" role="combobox"
										   aria-autocomplete="list" autoComplete="off"/>
									<div className='mr-2 header-search-key-slash' style={{
										paddingTop: '7px',
										cursor: 'text',
									}}>
										<FindIcon/>
									</div>
								</label>
							</form>
						</div>
					</div>

					{props.store.isShowSearchList &&
					<SearchList store={props.store}/>}

					{props.store.searchResult !== null &&
					<div style={{
						zIndex: 35,
						position: 'fixed',
						background: 'rgba(204, 204, 204, 0)',
						width: '100%',
						height: '100%',
						left: '0px',
						top: '0px'
					}} onClick={() => {
						props.store.searchResult = null;
					}}></div>
					}

					{props.store.showCreationMenu &&
					<div style={{
						zIndex: 35,
						position: 'fixed',
						background: 'rgba(204, 204, 204, 0)',
						width: '100%',
						height: '100%',
						left: '0px',
						top: '0px'
					}} onClick={() => store.toggleCreationMenu()}></div>
					}
					<nav className="d-flex flex-column flex-md-row flex-self-stretch flex-md-self-auto"
						 aria-label="Global">
						<Link href='/projects/dashboard'>Проекты</Link>
						<Link href='/teachers'>Преподователи</Link>
						<Link href='/students'>Ученики</Link>
						<Link href='/categories'>Категории</Link>
						<Link href='/roles'>Роли</Link>

						{/* <NavButton
							onCreateBlockAd={() => props.store.openBlockAdEditor()}
							onCreateMapAd={() => props.store.openMapAdEditor()}
							onToggleMenu={() => props.store.toggleCreationMenu()}
							isOpen={props.store.showCreationMenu}
							onClick={() => {
								if (CommonStore.instance.user === null) {
								} else {
									props.store.editPhoto(null);
								}
							}}/> */}
					</nav>

				</div>
				{CommonStore.instance.isAuthorized &&
					 <>
						{store.notificationStore.isShowNotifications &&
						<div style={{
							zIndex: 35,
							position: 'fixed',
							background: 'rgba(204, 204, 204, 0)',
							width: '100%',
							height: '100%',
							left: '0px',
							top: '0px'
						}} onClick={() => store.notificationStore.toggle()}></div>
						}
						<div className="Header-item mr-0 mr-md-3 flex-order-1 flex-md-order-none" style={{zIndex: 40}}>
							<div
								className={`head-notifies ${store.notificationStore.isShowNotifications ? 'head-notifies--showed' : ''}`}
								air-module="module.notifiesPanel">
								<div onClick={() => store.notificationStore.toggle()}
									className="head-notifies__toggler main_menu__item main_menu__item--notifications l-inline-block t-no_select"
									style={{paddingTop: '2px'}}>
									<NotificationIcon/>
									{store.notificationStore.totalCount !== 0 &&
									<span className="head-notifies__badge">{store.notificationStore.totalCount}</span>}
								</div>
								{/* <NotificationList store={store.notificationStore}/> */}
							</div>
						</div>
						<div className="Header-item position-relative mr-0 d-none d-md-flex">
							<details className="details-overlay details-reset js-feature-preview-indicator-container">
								<summary onClick={() => store.showMenu = !store.showMenu} className="Header-link"
										 aria-label="View profile and more"
										 data-ga-click="Header, show menu, icon:avatar" aria-haspopup="menu"
										 role="button">
									<span>{CommonStore.instance.user?.email}</span>
									<span className="dropdown-caret"></span>
								</summary>
							</details>
						</div>
						{store.showMenu &&
						<div style={{
							zIndex: 35,
							position: 'fixed',
							background: 'rgba(204, 204, 204, 0)',
							width: '100%',
							height: '100%',
							left: '0px',
							top: '0px'
						}} onClick={() => store.toggleMenu()}></div>
						}
						{store.showMenu &&
						<>
							<div data-v-06ea7b0a="" data-v-19329d4a="" className="bubble" arrow-alignment="top right"
								 data-dropdown="" style={{width: '200px'}} onClick={() => store.toggleMenu()}>
								<div data-v-06ea7b0a="" className="bubble__container">
									<div data-v-06ea7b0a="" className="bubble__title">Профиль</div>
									<div data-v-3c29ab00="" data-v-19329d4a="" data-ignore-scroll-lock="" className="list"
										 data-v-06ea7b0a="" style={{fontSize: '14px'}}>
										<NavLink to='/profile' data-v-15682870="" data-v-3c29ab00="" href='profile' className="list__item item item--selected" data-key="336025_1">
											<div data-v-15682870="" className="item__image">
												{/* <img data-v-15682870="" alt=""
													 src={CommonStore.instance.api.files.getSmallUserAvatar(CommonStore.instance.user.avatar)}/> */}
											</div>
											<span data-v-15682870="" className="item__text">{CommonStore.instance.user?.email}</span>
										</NavLink>
										<NavLink to='/profile?tab=drafts' data-v-15682870="" data-v-3c29ab00=""
												 className="list__item item" data-key="999999901_1"
												 style={{color: 'rgb(129, 129, 129)'}}>
											<div data-v-15682870="" className="item__icon">
												<div data-v-15682870="" style={{width: '15px', height: '15px'}}>
													<DraftIcon/>
												</div>
											</div>
											<span data-v-15682870="" className="item__text">Черновики<div data-v-15682870="" className="item__badge">2</div></span>
										</NavLink>
										<NavLink data-v-15682870="" data-v-3c29ab00="" to='/profile?tab=favorites'
												 className="list__item item" data-key="999999903_1"
												 style={{color: 'rgb(129, 129, 129)'}}>
											<div data-v-15682870="" className="item__icon">
												<div data-v-15682870="" style={{width: '15px', height: '15px'}}>
													<FavoriteIcon/>
												</div>
											</div>
											<span data-v-15682870="" className="item__text">Закладки</span>
										</NavLink>
										{/*<NavLink data-v-3c29ab00="" to='/cabinet'*/}
										{/*		 className="list__item item" data-key="999999903_1"*/}
										{/*		 style={{color: 'rgb(129, 129, 129)'}}>*/}
										{/*	<div data-v-15682870="" className="item__icon">*/}
										{/*		/!*<div data-v-15682870="" style={{width: '15px', height: '15px'}}>*!/*/}
										{/*			/!*<GearIcon/>*!/*/}
										{/*		/!*</div>*!/*/}
										{/*	</div>*/}
										{/*	<span data-v-15682870="" className="item__text">Кабинет</span>*/}
										{/*</NavLink>*/}
										<NavLink data-v-3c29ab00="" to='/profile/settings'
												 className="list__item item" data-key="999999903_1"
												 style={{color: 'rgb(129, 129, 129)'}}>
											<div data-v-15682870="" className="item__icon">
												<div data-v-15682870="" style={{width: '15px', height: '15px'}}>
													<GearIcon/>
												</div>
											</div>
											<span data-v-15682870="" className="item__text">Настройки</span>
										</NavLink>
										<div data-v-15682870="" data-v-3c29ab00="" className="list__item item" onClick={() => CommonStore.instance.api.accounts.logout().emit()}
											 data-key="999999904_1" style={{color: 'rgb(233, 42, 64)'}}>
											<div data-v-15682870="" className="item__icon">
												<div data-v-15682870="" style={{width: '16px', height: '16px'}}>
													<LogoutIcon/>
												</div>
											</div>
											<span data-v-15682870="" className="item__text">Выход</span>
										</div>
									</div>
								</div>
							</div>
						</>
						}
					</>}
			</AppBar>
			<Toasts store={store.notificationStore}/>
		</>
	);
});

const ToastItem = observer((props: ({
	key?: number;
	toast: NotificationToast;
})) => {
	return <>
		<div className={`notification-toast ${props.toast.isShow ? 'show' : 'hide'}`} key={props.key} onClick={() => props.toast.onClose(props.toast.id)}>
			<div style={{
				display: 'flex'
			}}>
				<div>
					<img src={CommonStore.instance.api.files.getSmallUserAvatar(props.toast.file)} style={{
						width: '37px',
						height: '37px'
					}}/>
				</div>
				<div style={{
					fontSize: '14px',
					margin: '0px 10px',
					maxWidth: '200px',
				}}>{props.toast.text}</div>
				{/*<div style={{display: 'flex'}}>*/}
				{/*	<div className='v-popup-fp-window__control' style={{color: '#ccc', padding: '0px'}} onClick={() => props.toast.onClose(props.toast.id)}>*/}
				{/*		<svg height="24" width="24" className="icon icon--v_close"><svg viewBox="0 0 24 24" id="v_close"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.293 5.293a1 1 0 011.414 0L12 10.586l5.293-5.293a1 1 0 111.414 1.414L13.414 12l5.293 5.293a1 1 0 01-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 01-1.414-1.414L10.586 12 5.293 6.707a1 1 0 010-1.414z"></path></svg></svg>*/}
				{/*	</div>*/}
				{/*</div>*/}
			</div>

		</div>
	</>
});

const Toasts = observer((props: ({
	store: NotificationStore;
})) => {
	return <>
		<div style={{
			position: 'fixed',
			right: '0px',
			color: '#000',
			marginTop: '10px',
			marginRight: '10px',
			pointerEvents: 'none'
		}}>
			{props.store.toasts.map((toast, idx) =>
				<ToastItem key={idx} toast={toast}/>
			)}
		</div>
	</>
});

const SearchList = observer((props: ({
	store: NavMenuStore
})) => {
	const result = props.store.searchResult;
	
	const closeAndGo = () => {
		props.store.searchResult = null;
	};

	return (
		<div className="search-dropdown search-dropdown--focused" style={{width: '270px', zIndex: 36}}>
			{props.store.isShowSearchLoader 
				? <div style={{
					margin: '10px auto',
					display: 'flex'
				}}>
					<MiniLoader show style={{
						margin: '0px auto',
					}}/>
				</div>
				: props.store.searchResult === null ? <></> : <>
					{result.users.length !== 0 &&
					<div className='nav-search-group'>
						<p className='nav-search-group-title'>Пользователи</p>
						{result.users.map((user, idx) => 
						<NavLink key={idx} to={`/user?id=${user.id}`} onClick={closeAndGo} className="search-dropdown-item search-dropdown-item--subsite search-dropdown-item--focused">
							<div className="search-dropdown-item__image">
								<img src={CommonStore.instance.api.files.getSmallUserAvatar(user.avatar)} alt="" className="andropov_image andropov_image--bordered"/>
							</div>
							<div className="search-dropdown-item__value">{user.name}</div>
						</NavLink>)}
					</div>}
					{result.comments.length !== 0 &&
					<div className='nav-search-group'>
						<p className='nav-search-group-title'>Комментарии</p>
						{result.comments.map((comment, idx) => 
						<NavLink key={idx} to={`/photo?id=${comment.photo.id}&comment=${comment.id}`} onClick={closeAndGo} className="search-dropdown-item search-dropdown-item--content">
							<div className="search-dropdown-item__value">{comment.text}</div>
							{/*<div className="search-dropdown-item__value">{comment.photo.name}</div>*/}
						</NavLink>)}
					</div>}
					{result.photos.length !== 0 &&
					<div className='nav-search-group'>
						<p className='nav-search-group-title'>Фотографии</p>
						{result.photos.map((photo, idx) => 
						<NavLink key={idx} to={`/photo?id=${photo.id}`} onClick={closeAndGo} className="search-dropdown-item search-dropdown-item--subsite search-dropdown-item--focused">
							<div className="search-dropdown-item__image">
								<img src={CommonStore.instance.api.files.getSmallUserAvatar(photo.file)} alt="" className="andropov_image andropov_image--bordered"/>
							</div>
							<div className="search-dropdown-item__value">{photo.name}</div>
						</NavLink>)}
					</div>}
					{result.photos.length !== 0 || result.comments.length !== 0 || result.users.length !== 0 
						? <NavLink to={`/search`} onClick={closeAndGo} className="search-dropdown-item search-dropdown-item--submit">
						<div className="search-dropdown-item__image">
							<svg height="8" width="8" className="icon icon--enter" style={{fill: '#ccc'}}>
								<path d="M7.158.4v4.35H1.6l1.516-1.515-.59-.59L0 5.173l2.526 2.526.59-.59L1.6 5.594H8V.4h-.842z"></path>
							</svg>
						</div>
						<div className="search-dropdown-item__value">
							<span>Перейти к результатам</span>
						</div>
					</NavLink> 
						: <div style={{
							color: '#ccc',
							textAlign: 'center'
						}}>Ничего не нашлось</div>}
				</>}
			
		</div>
	);
});
