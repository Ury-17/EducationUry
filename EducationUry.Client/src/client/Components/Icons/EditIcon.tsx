import {observer} from "mobx-react-lite";
import * as React from "react";

export const EditIcon = observer(() => {
	return <svg style={{fill: '#adadad', marginRight: '10px'}}  className="icon icon--ui_pencil_2" width="15" height="15" xmlns="http://www.w3.org/2000/svg"><svg viewBox="0 0 12 12" id="ui_pencil_2"><path fillRule="evenodd" clipRule="evenodd" d="M8.318 1.325a1.111 1.111 0 011.57 0l.787.786a1.111 1.111 0 010 1.571l-.002.002-1.141 1.134-2.35-2.35 1.134-1.141.002-.002zM6.1 3.536L8.464 5.9l-4.469 4.461c-.16.16-.363.267-.585.308l-1.754.322a.556.556 0 01-.647-.647l.322-1.754c.04-.222.148-.426.307-.585L6.1 3.536z"></path></svg></svg>
});
