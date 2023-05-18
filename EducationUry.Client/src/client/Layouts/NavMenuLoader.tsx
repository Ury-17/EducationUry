import {observer} from "mobx-react-lite";
import * as React from "react";

export const NavMenuLoader = observer((props?: {
	isLoading?: boolean;
}) => {
	return <span data-view-component="true" className="progress-page-loader width-full js-pjax-loader-bar Progress position-fixed">
		<span style={{
			backgroundColor: '#79b8ff', 
			width: props.isLoading 
				? '200%' 
				: '0%',
			opacity: props.isLoading ? 1 : 0}} className='progress-page-line' data-view-component="true"></span>
	</span>
});
