import {observer} from "mobx-react-lite";
import {IconProps} from "./IconProps";
import * as React from "react";

export const ElementMenuIcon = observer((props?: IconProps) => {
	return <svg className="icon icon--ui_etc" width="18" height="8" xmlns="http://www.w3.org/2000/svg">
		<svg viewBox="0 0 18 4" id="ui_etc"><path d="M2 4a2 2 0 110-4 2 2 0 010 4zm7 0a2 2 0 110-4 2 2 0 010 4zm7 0a2 2 0 110-4 2 2 0 010 4z"></path></svg>
	</svg>
});
