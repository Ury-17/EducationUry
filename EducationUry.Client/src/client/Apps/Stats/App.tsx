
import { MiniLoader } from "../../Layouts/MiniLoader";
import {observer} from "mobx-react-lite";
import * as React from "react";
import { PropsExtractor } from "../../Shared/PropsExtractor";
import {Store} from "./Store";
import { TopBar } from "./TopBar";

export const App = observer((props: any) => {
    const adId = PropsExtractor.FromLocation().getString("id")

    if (adId === null) {
        return <></>
    }

	const store = React.useState(() => new Store(adId))[0];

	if (store.ad === null && store.error == null) {
		return <div id='page_wrapper' style={{paddingTop: '0px', height: 'auto'}}>
			<div className='page page--index' style={{height: '100%', margin: '0 20px'}}>
				<div style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					justifyContent: 'center',
					marginTop: '100px'
				}}>
					<MiniLoader size={50} show/>
				</div>
			</div>
		</div>
	}

	return <>
		<div id='page_wrapper' style={{
			paddingTop: '0px', margin: '0px 10px',
		}}>
			<div className='page page--index' style={{gridColumn: 1, gridRow: 1}}>
				{store.ad !== null && <>
    	            <TopBar store={store}/>
					<div style={{marginTop: '50px'}}>
						{/* {store.currentTab === AdTab.General && <AdEditorTab store={store}/>} */}
						{/* {store.currentTab === AdTab.Stats && <AdStatsTab store={store}/>} */}
					</div>
				</>}
				{store.error && <div style={{
					color: '#dd0808',
    				textAlign: 'center'
				}}>{store.error}</div>}
			</div>
		</div>
	</>
});