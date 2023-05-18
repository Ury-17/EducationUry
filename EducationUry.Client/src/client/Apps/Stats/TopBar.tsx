import {observer} from "mobx-react-lite";
import {AdTab, Store} from "./Store";
import {Button} from "../../Layouts/Button";
import * as React from "react";
import { AdStatus } from "../../Shared/Api/Controllers/ApiStudents";

export const TopBar = observer((props: ({
	store: Store
})) => {
	const store = props.store;
	return (
		<article className="grid-item content-box" style={{
			margin: '0px',
			marginTop: '0px',
            zIndex: 9,
            top: '48px',
            position: 'fixed'
		}}>
			<div className="inner">
				<div data-v-693a8624="" className="ui-sorting ui-sorting--with-tune-button ui-sorting--only-filters" style={{
					margin: '0px',
					paddingLeft: '8px'
				}}>
					<div data-v-8927c998="" data-v-693a8624="" data-analytics="Subsites tune widget" data-analytics-events="show,click" className="ui-dotted-button">
						<Button
							style={{
								boxShadow: 'none',
								border: 'none'
							}} onClick={() => console.log('123')}>К объявлению</Button>
					</div>
					<div data-v-60c8471c="" data-v-693a8624="" className="ui-filters l-island-round ui-filters--responsive">
						<div data-v-60c8471c="" className="ui-filters__inner">
							<nav className="profile-tab-menu" style={{width: '100%'}}>
								<a className={`${true ? 'selected' : ''} profile-tab-menu-item`} onClick={() => console.log('123')}>Сводка</a>
								<a className={`${false ? 'selected' : ''} profile-tab-menu-item`} style={{display: 'flex'}} onClick={() => console.log('321')}>Отчеты</a>
							</nav>
						</div>
					</div>
				</div>
			</div>
		</article>
	);
});