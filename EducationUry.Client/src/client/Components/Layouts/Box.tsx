import {observer} from "mobx-react-lite";
import * as React from "react";
import {CSSProperties} from "react";

type BoxProps = {
	key?: number;
	p?: number;
	pl?: number;
	pr?: number;
	pt?: number;
	pb?: number;
	children?: React.ReactNode | React.ReactNode[];
	style?: CSSProperties;
};

export const Box = observer((props?: BoxProps) => {
	const paddingStyle = ({
		paddingLeft: props.pl !== undefined ? `${props.pl}px` : props.p !== undefined ? `${props.p}px` : undefined,
		paddingRight: props.pr !== undefined ? `${props.pr}px` : props.p !== undefined ? `${props.p}px` : undefined,
		paddingTop: props.pt !== undefined ? `${props.pt}px` : props.p !== undefined ? `${props.p}px` : undefined,
		paddingBottom: props.pb !== undefined ? `${props.pb}px` : props.p !== undefined ? `${props.p}px` : undefined,
	});
	
	return <div key={props.key} style={{
		...paddingStyle,
		...props.style
	}}>
		{props.children}
	</div>
});
