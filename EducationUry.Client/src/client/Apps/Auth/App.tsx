import {observer} from "mobx-react-lite";
import * as React from "react";
import {AuthorizationTab} from "./Authorization/AuthorizationTab";
import {AuthTab, Store} from "./Store";
import {Button} from "../../Layouts/Button";
import {Dialog, DialogContent, DialogToolbar} from "../../Components/Feedback/Dialog";
import {Box} from "../../Components/Layouts/Box";
import {AdBlockPopover} from "../../Layouts/Ads/AdBlockPopover";
import { RegistrationTab } from "./Registration/RegistrationTab";

export const App = observer((props: any) => {
	const store = React.useState(() => new Store())[0];

	return <>
		<div id='page_wrapper' style={{
			paddingTop: '0px', maxWidth: '700px', margin: 'auto',
		}}>
			
			<div className='page page--index' style={{gridColumn: 1, gridRow: 1}}>
				<div className='profile-container' style={{boxShadow: '0px 0px 12px -5px #ccc', borderRadius: '5px'}}>
					<div>
						<nav className="profile-tab-menu" style={{width: '100%', display: 'block'}}>
                            {store.tab === AuthTab.Auth && <AuthorizationTab store={store}/>}
                            {store.tab === AuthTab.Registration && <RegistrationTab store={store}/>}
						</nav>
					</div>
				</div>
			</div>
		</div>
	</>
});
