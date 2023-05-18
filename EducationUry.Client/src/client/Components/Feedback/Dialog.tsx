import {observer} from "mobx-react-lite";
import * as React from "react";
import {CloseIcon} from "../Icons/CloseIcon";
import {Box} from "../Layouts/Box";
import {CSSProperties} from "react";

type DialogProps = {
	key?: number;
	children?: React.ReactNode | React.ReactNode[];
	open?: boolean;
	maxWidth?: number;
}

export const Dialog = observer((props?: DialogProps) => {
	return <div className="v-popup-fp-container" style={{transitionDuration:'140ms', display: props.open ? 'block' : 'none'}}>
		<div className="v-popup-fp-overlay">
			<div className="v-popup-fp-window" style={{maxWidth: props.maxWidth ? `${props.maxWidth}px` : undefined}}>
				{props.children}
			</div>
		</div>
	</div>;
});

type DialogToolbarProps = {
	key?: number;
	children?: React.ReactNode | React.ReactNode[];
	onClose?: () => void;
	style?: CSSProperties;
};

export const DialogToolbar = observer((props?: DialogToolbarProps) => {
	return <div className="v-popup-window__cover" style={{background: '#fff', ...props.style}}>
		{props.children}
		<div className="v-popup-fp-window__controls">
			<div className="v-popup-fp-window__control" onClick={props.onClose}>
				<CloseIcon/>
			</div>
		</div>
	</div>
});

type DialogContentProps = {
	key?: number;
	children?: React.ReactNode | React.ReactNode[];
	scroll?: boolean;
};

export const DialogContent = observer((props?: DialogContentProps) => {
	return <div className="v-popup-fp-window__body" style={{overflowY: props.scroll ? 'auto' : 'initial'}}>
		<Box pl={30} pr={30} pb={30} style={{display: 'contents'}}>
			{props.children}
		</Box>
	</div>
});
