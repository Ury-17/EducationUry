import {observer} from "mobx-react-lite";
import * as React from "react";
import { List } from "./List";
import {ProjectsTab, Store} from "./Store";
import { TopBar } from "./TopBar";

export const App = observer((props: any) => {
	const store = React.useState(() => new Store())[0];

	return <>
		<div id='page_wrapper' style={{
			paddingTop: '0px', margin: '0px 10px',
		}}>
			<div className='page page--index' style={{gridColumn: 1, gridRow: 1}}>
                <TopBar store={store}/>
				<div  style={{marginTop: '10px'}}>
					{/* <nav className="profile-tab-menu" style={{width: '100%', display: 'block'}}> */}
                        <List store={store} canArchive={store.currentTab === ProjectsTab.Actuals}/>
					{/* </nav> */}
				</div>
			</div>
		</div>
	</>
});
