import {observer} from "mobx-react-lite";
import * as React from "react";

export const CheckBox = observer((props: {
	key?: number
	label?: string;
	value: boolean;
	onToggle: () => void;
}) => {
	return <div style={{
		display: 'flex',
	}}>
		<input type="checkbox" id={`check-box`} checked={props.value} onChange={() => props.onToggle()} style={{
			width: '16px',
			height: '16px'
		}}/>
		{props.label &&  <label htmlFor={`check-box`}>{props.label}</label>}
	</div>
});
