import {observer} from "mobx-react-lite";
import * as React from "react";
import {CommonStore} from "../../Layouts/CommonStore";

export const NotFoundPage = observer((_?: any) => {
	
	return <>
		<div id='page_wrapper' style={{paddingTop: '0px'}}>
			<div className='page page--index' style={{height: '100%'}}>
				<div style={{
				width: '100%',
				height: '100%',
				display: 'flex',
					marginTop: '100px',
					fontSize: '25px',
					color: '#9c9a9a',
				justifyContent: 'center'
				}}>
					Такой страницы не существует :(
				</div>
			</div>
		</div>
	</>
});
