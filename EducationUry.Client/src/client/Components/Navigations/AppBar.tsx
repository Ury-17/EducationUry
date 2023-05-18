import {observer} from "mobx-react-lite";
import * as React from "react";
import {CSSProperties} from "react";

type AppBarProps = {
	key?: number;
	p?: number;
	pl?: number;
	pr?: number;
	pt?: number;
	pb?: number;
	children?: React.ReactNode | React.ReactNode[];
	style?: CSSProperties;
};


export const AppBar = observer((props?: AppBarProps) => {
	return <header className='Header js-details-container Details px-3 px-md-4 px-lg-5 flex-wrap flex-md-nowrap'>
		{props.children}
	</header>
});
