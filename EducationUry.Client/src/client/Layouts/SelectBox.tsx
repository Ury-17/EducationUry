import * as React from "react";
import {observer} from "mobx-react-lite";

export const SelectBox = observer((props: {
	mb?: number;
	value?: string;
	placeholder?: string;
	children?: string[];
	onSelect?: (e: string) => void;
	showList?: boolean;
	onToggleList?: () => void;
	style?: React.CSSProperties;
}) => {
	return <div style={{
		display: 'flex',
		marginBottom: props.mb === undefined ? 'inherit' : `${props.mb}px`,
		...props.style
	}}>
		<div data-v-0b3d647b="" data-ignore-outside-click="" className="select" style={{width: '100%'}}>
			<div data-v-0b3d647b="" className="select__current" onClick={() => props.onToggleList()}>
				<span data-v-0b3d647b="" className="select__label">
					{props.value === undefined || props.value === null ? props.placeholder : props.value || ''}
				</span>
				<svg data-v-0b3d647b="" height="16" width="11" className="icon icon--ui_arrow_down">
					<svg viewBox="0 0 18 11" id="ui_arrow_down"><path fill-rule="evenodd" d="M8.109 10.41L.369 2.265a1.377 1.377 0 010-1.876 1.217 1.217 0 011.783 0L9 7.594 15.848.39a1.217 1.217 0 011.783 0 1.377 1.377 0 010 1.876L9.89 10.41c-.246.26-.57.39-.891.39-.322 0-.645-.132-.89-.39h-.001z"></path></svg>
				</svg>
			</div>
			<div data-v-06ea7b0a="" data-v-19329d4a="" className="bubble" arrow-alignment="right" data-dropdown="" style={{display: props.showList ? 'block' : 'none'}}>
				<div data-v-06ea7b0a="" className="bubble__container">
					<div data-v-19329d4a="" data-v-06ea7b0a=""></div>
					<div data-v-3c29ab00="" data-v-19329d4a="" data-ignore-scroll-lock="" className="list" data-v-06ea7b0a="" style={{fontSize: '14px'}}>
						<div data-v-754c20ca="" data-v-3c29ab00="" className="dummy"></div>
						{props.children.map((item, idx) =>
							<div data-v-15682870="" data-v-3c29ab00="" className="list__item item" data-key="1_0" key={idx} onClick={() => props.onSelect(item)}>
								<span data-v-15682870="" className="item__text">{item}</span>
							</div>)}
					</div>
				</div>
			</div>
		</div>
	</div>
});


