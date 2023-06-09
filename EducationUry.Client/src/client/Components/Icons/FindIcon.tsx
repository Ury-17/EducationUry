import {observer} from "mobx-react-lite";
import * as React from "react";
import {IconProps} from "./IconProps";

export const FindIcon = observer((props?: IconProps) => {
	return <svg style={{fill: '#fff', ...props.style}} width="14" height="15"
		 xmlns="http://www.w3.org/2000/svg">
		<svg viewBox="0 0 16 18" id="search"><path fillRule="evenodd" d="M15.757 15.545l-3.945-4.225a6.993 6.993 0 001.57-4.43c0-3.799-3.001-6.89-6.69-6.89C3.001 0 0 3.091 0 6.89c0 3.8 3.002 6.891 6.691 6.891 1.385 0 2.705-.43 3.834-1.247l3.974 4.257a.854.854 0 001.234.025.919.919 0 00.024-1.271zM6.69 1.798c2.727 0 4.946 2.284 4.946 5.093 0 2.808-2.219 5.093-4.946 5.093S1.746 9.699 1.746 6.89c0-2.809 2.218-5.093 4.945-5.093z"></path></svg>
	</svg>
});
