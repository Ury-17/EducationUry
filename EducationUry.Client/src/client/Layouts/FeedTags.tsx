import {observer} from "mobx-react-lite";
import * as React from "react";

export const FeedTags = observer((props: {
	tags: string[],
	onClick: (tag: string) => void,
	style?: React.CSSProperties,
}) => {

	return <div className="feed_header ui-border--bottom layout--a layout--bg" style={{
		padding: '0px',
		border: 'none',
		marginBottom: '5px',
		...props.style
	}}>
		<div className="ui-tabs ui-tabs--small ui-tabs--no-padding hashtags_list" air-module="module.ui_tabs">
			<div className="ui-tabs__scroll">
				<div className="ui-tabs__content ">
					{props.tags.map((tag, idx) =>
						<a key={idx} onClick={() => props.onClick(tag)} className="ui-tab">
							<span className="ui-tab__label">#{tag}</span>
						</a>
					)}
				</div>
			</div>
		</div>
	</div>
});
