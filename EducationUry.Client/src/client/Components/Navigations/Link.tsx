import {observer} from "mobx-react-lite";
import * as React from "react";
import {NavLink} from "react-router-dom";
import {CSSProperties} from "react";

type LinkProps = {
	href?: string;
	style?: CSSProperties;
	children?: React.ReactNode | React.ReactNode[];
	className?: string;
	onClick?: () => void;
};

export const Link = observer((props: LinkProps) => {
	return props.href == undefined 
		? <a
			onClick={props.onClick}
			style={{
				cursor: 'pointer',
				...props.style
			}}
			className={`js-selected-navigation-item Header-link mt-md-n3 mb-md-n3 py-2 py-md-3 mr-0 mr-md-3 border-top border-md-top-0 border-white-fade ${props.className}`}
		>{props.children}</a>
		: <NavLink
		onClick={props.onClick}
		style={{
			cursor: 'pointer',
			...props.style
		}}
		className={`js-selected-navigation-item Header-link mt-md-n3 mb-md-n3 py-2 py-md-3 mr-0 mr-md-3 border-top border-md-top-0 border-white-fade ${props.className}`}
		to={props.href}>
		{props.children}
	</NavLink>
});
