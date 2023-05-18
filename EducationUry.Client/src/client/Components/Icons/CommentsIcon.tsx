import {observer} from "mobx-react-lite";
import * as React from "react";

export const CommentsIcon = observer(() => {
	return <svg className="icon icon--ui_comments" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
		<svg viewBox="0 0 20 20" id="ui_comments"><path d="M15.156 16.754a2.488 2.488 0 00-1.908.14 8.045 8.045 0 01-3.62.856 8.074 8.074 0 01-7.267-4.492A8.037 8.037 0 011.5 9.625l-.002-.51c.238-4.111 3.506-7.38 7.53-7.615h.622c1.244 0 2.49.296 3.604.86a8.076 8.076 0 014.496 7.27 8.022 8.022 0 01-.856 3.618 2.494 2.494 0 00-.136 1.919l.83 2.43-2.432-.843zM1.02 13.928a9.574 9.574 0 008.608 5.322 9.545 9.545 0 004.296-1.017.988.988 0 01.758-.056L20 20.02l-1.823-5.338a.988.988 0 01.056-.758 9.522 9.522 0 001.017-4.298 9.575 9.575 0 00-5.326-8.608A9.522 9.522 0 009.65 0h-.621A9.59 9.59 0 000 9.029v.596a9.526 9.526 0 001.02 4.303z"></path></svg>
	</svg>
});