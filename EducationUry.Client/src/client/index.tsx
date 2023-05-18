// import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import * as React from 'react';
import {observer} from "mobx-react-lite";
import {NavMenu} from "./Layouts/NavMenu";
import {CommonStore} from "./Layouts/CommonStore";
import {NavMenuLoader} from "./Layouts/NavMenuLoader";
// import {PhotoEditor} from "./Layouts/PhotoEditor";
import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";

import {App as AuthApp} from "./Apps/Auth/App";
import {App as ProjectsApp} from "./Apps/Projects/Dashboard/App";
import {App as ProjectApp} from "./Apps/Projects/Project/App";
import {App as StudentsApp} from "./Apps/Students/App";
import {App as CategoriesApp} from "./Apps/Categories/App";
import {App as AdStatsApp} from "./Apps/Stats/App";
import {App as TeacherApp} from "./Apps/Teacher/App";
import { configure } from "mobx"

configure({
    enforceActions: "never",
})

console.log(window.location.href);

const targetDomain = 'https://localhost:8080';

if (window.location.href.length >= targetDomain.length) {
	const extractCbParams = (params: any) => {
		return ({
			accessToken: params.accessToken as string,
			refreshToken: params.refreshToken as string,
			exp: parseInt(params.exp)
		})
	}
	const callbackLocations = [
		'/google/cb',
		'/vk/cb'
	];
	const segments = window.location.href.substr(targetDomain.length).split('?');
	if (segments.length === 2 && callbackLocations.includes(segments[0])) {
		const params = segments[1]
			.split('&')
			.map(p => p.split('='))
			.filter(pair => pair.length === 2)
			.map(p => ({
				[p[0]]: p[1]
			}))
			.reduce((a, b) => ({...b, ...a}));
		const jwt = extractCbParams(params);
		console.log(jwt)
		
		localStorage.setItem('jwt', JSON.stringify(jwt));
		window.close();
	}
}

CommonStore.instance = new CommonStore();
CommonStore.instance.api.initialize();

export const ClientApp = observer((_?: any) => {
    return <>
		{CommonStore.instance.user !== null &&
		<div className='navbar-header'>
			<NavMenuLoader isLoading={CommonStore.instance.loader.isLoading}/>
			<NavMenu store={CommonStore.instance.navBarStore}/>
		</div>}
		<div className='main layout' style={{height: '100%'}}>
			<Switch>
				<Route path='/auth' component={AuthApp}/>
				<Route path='/project' component={ProjectApp}/>
				<Route exact path='/projects/dashboard' component={ProjectsApp}/>
				<Route path='/students' component={StudentsApp}/>
				<Route path='/categories' component={CategoriesApp}/>
				<Route path='/stats' component={AdStatsApp}/>
				<Route path='/teachers' component={TeacherApp}/>
			</Switch>
		</div>
	</>
});

window.appIsLoaded = () => {
	ReactDOM.render(
		<BrowserRouter>
			<ClientApp/>
		</BrowserRouter>,
		document.getElementById("root"));

	registerServiceWorker();
};
