import {observer} from "mobx-react-lite";
import * as React from "react";

export const CloseIcon = observer(() => {
	return <svg height="24" width="24" className="icon icon--v_close">
		<svg viewBox="0 0 24 24" id="v_close"><path fillRule="evenodd" clipRule="evenodd" d="M5.293 5.293a1 1 0 011.414 0L12 10.586l5.293-5.293a1 1 0 111.414 1.414L13.414 12l5.293 5.293a1 1 0 01-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 01-1.414-1.414L10.586 12 5.293 6.707a1 1 0 010-1.414z"></path></svg>
	</svg>
});
