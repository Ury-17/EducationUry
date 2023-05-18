import {observer} from "mobx-react-lite";
import * as React from "react";
import { PropsExtractor } from "../../../Shared/PropsExtractor";
import { List } from "./List";
import {Store} from "./Store";
import { TopBar } from "./TopBar";

export const App = observer((props: any) => {
    const projectId = PropsExtractor.FromLocation().getString("id")

    if (projectId == null) {
        location.href = "404"
    }

	const store = React.useState(() => new Store(projectId!))[0];


    console.log(location.href)

	return <>
		<div id='page_wrapper' style={{
			paddingTop: '0px', margin: '0px 10px',
		}}>
			<div className='page page--index' style={{gridColumn: 1, gridRow: 1, height: '100%'}}>
				<div  style={{marginTop: '10px', height: '100%'}}>
					{/* <nav className="profile-tab-menu" style={{width: '100%', display: 'block'}}> */}
                        <List store={store}/>
					{/* </nav> */}
				</div>
			</div>
		</div>
	</>
});