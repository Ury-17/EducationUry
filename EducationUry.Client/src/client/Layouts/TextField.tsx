import {observer} from "mobx-react-lite";
import * as React from "react";

export const TextField = observer((props: {
	disabled?: boolean;
	mb?: number;
	value?: string;
	onChange?: (value: string) => void;
	placeholder?: string;
	labelStyle?: React.CSSProperties;
	style?: React.CSSProperties;
	label?: React.ReactNode;
}) => {
	return <div style={{
		display: 'flex',
		marginBottom: props.mb === undefined ? 'inherit' : `${props.mb}px`,
		...props.style
	}}>
		{props.label !== undefined && <div style={{
			border: '1px solid #eaeaea',
			borderRight: 'none',
			borderTopLeftRadius: '5px',
			borderBottomLeftRadius: '5px',
			color: '#a7b2c1',
			fontWeight: 300,
			padding: '5px 10px',
			fontSize: '16px',
			lineHeight: '26px',
			...props.labelStyle
		}}>{props.label}</div>}
		<input
			value={props.value}
			onChange={(e) => {
				if (props.onChange) {
					props.onChange(e.target.value);
				}
			}}
			type='text'
			placeholder={props.placeholder}
			style={{
				width: '100%',
				outline: 'none',
				border: '1px solid #eaeaea',
				color: props.disabled ? '#ccc' : '#6d6d6d',
				borderRadius: '5px',
				pointerEvents: props.disabled ? 'none' : 'inherit',
				borderTopLeftRadius: props.label === undefined ? 'inherit' : '0px',
				borderBottomLeftRadius: props.label === undefined ? 'inherit' : '0px',
				height: 'auto',
				padding: '0px 20px',
				fontSize: '16px'
			}}/>
	</div>
});
