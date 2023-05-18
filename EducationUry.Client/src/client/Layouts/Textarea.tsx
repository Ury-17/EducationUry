import {GroupForm} from "./GroupForm";
import * as React from "react";
import {observer} from "mobx-react-lite";

export const Textarea = observer((props: {
	mb?: number;
	value?: string;
	onChange?: (value: string) => void;
	placeholder?: string;
	labelStyle?: React.CSSProperties;
	label?: React.ReactNode;
}) => {
	return <div style={{
		display: 'flex',
		marginBottom: props.mb === undefined ? 'inherit' : `${props.mb}px`
	}}>
		{props.label !== undefined && <div style={{
			border: '1px solid rgb(234 234 234)',
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
		<textarea
			placeholder={props.placeholder}
			value={props.value}
			onChange={e => {
				if (props.onChange) {
					props.onChange(e.target.value);
				}
			}}
			style={{
				resize: 'none',
				outline: 'none',
				border: '1px solid rgb(234 234 234)',
				width: '100%',
				height: '60px',
				padding: '4px 7px'
			}}/>
	</div>
});

