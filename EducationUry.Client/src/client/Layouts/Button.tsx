import {observer} from "mobx-react-lite";
import * as React from "react";
import {MiniLoader} from "./MiniLoader";
import {NavLink} from "react-router-dom";

export const Button = observer((props?: {
	style?: React.CSSProperties;
	children?: React.ReactNode;
	onClick?: (e: any) => void;
	icon?: React.ReactNode;
	loader?: boolean;
	size?: number;
	show?: boolean;
	to?: string;
	disabled?: boolean;
	reference?: React.RefObject<HTMLAnchorElement>
	contentEditable?: boolean
	onInput?: () => void
}) => {
	if (props.to !== undefined) {
		return <NavLink ref={props.ref} onInput={props?.onInput} contentEditable={props?.contentEditable} to={props.to} className={`subsites_tune_widget__button ui-button ui-button--5 ui-button--small l-ml-auto select-text-none ${props.disabled ? 'ui-button-disabled' : ''}`} aria-disabled={"true"} onClick={props.onClick}
				  style={{
					  ...props.style,
					  opacity: props.disabled ? 0.7 : 1,
					  cursor: props.disabled ? 'default' : 'pointer'
				  }}>
			{props.loader
				? <MiniLoader size={16} show={props.loader}/>
				: props.icon}
			{props.children}
		</NavLink>
	}
	return <a ref={props?.reference} onInput={props?.onInput} contentEditable={props?.contentEditable} className={`subsites_tune_widget__button ui-button ui-button--5 ui-button--small l-ml-auto select-text-none ${props.disabled ? 'ui-button-disabled' : ''}`} aria-disabled={"true"} onClick={props.onClick}
			  style={{
			  	...props.style,
				opacity: props.disabled ? 0.7 : 1,
				cursor: props.disabled ? 'default' : 'pointer'
			  }}>
		{props.loader 
			? <MiniLoader size={16} show={props.loader}/>
			: props.icon}
		{props.children}
	</a>
});
