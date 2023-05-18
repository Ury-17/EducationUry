import {observer} from "mobx-react-lite";
import {ProjectsTab, Store} from "./Store";
import {Button} from "../../../Layouts/Button";
import * as React from "react";
import { AddIcon } from "../../../Components/Icons/AddIcon";

export const TopBar = observer((props: ({
	store: Store
})) => {
	const store = props.store;
	return (
		<article className="grid-item content-box" style={{
			margin: '0px',
			marginTop: '0px',
			width: '100%'
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
							}}
							icon={<AddIcon/>} onClick={() => store.createProject()}>Добавить проект</Button>
					</div>
					<div data-v-60c8471c="" data-v-693a8624="" className="ui-filters l-island-round ui-filters--responsive">
						<div data-v-60c8471c="" className="ui-filters__inner">
							<nav className="profile-tab-menu" style={{width: '100%'}}>
								<a className={`${store.currentTab === ProjectsTab.Actuals ? 'selected' : ''} profile-tab-menu-item`} onClick={() => store.setTab(ProjectsTab.Actuals)}>Текущие</a>
								<a className={`${store.currentTab === ProjectsTab.Archived ? 'selected' : ''} profile-tab-menu-item`} style={{display: 'flex'}} onClick={() => store.setTab(ProjectsTab.Archived)}>В архиве</a>
							</nav>
						</div>
					</div>
				</div>
			</div>
		</article>
	);
});
