import {observer} from "mobx-react-lite";
import * as React from "react";

export const GroupForm = observer((props: {
	label?: React.ReactNode;
	children?: React.ReactNode[] | React.ReactNode;
	style?: React.CSSProperties;
}) => {
	return <div style={{
		display: 'block',
		...props.style
	}}>
		{props.label !== undefined && <div style={{
			borderBottom: '1px solid rgb(244 244 244)',
			color: 'rgb(167, 178, 193)',
			padding: '5px 10px',
			fontSize: '16px',
			marginBottom: '20px',
		}}>{props.label}</div>}
		<div>
			{props.children}
		</div>
	</div>
});
