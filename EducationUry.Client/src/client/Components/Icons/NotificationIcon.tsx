import {observer} from "mobx-react-lite";
import * as React from "react";

export const NotificationIcon = observer(() => {
	return <svg className="icon icon--bell" width="18" height="18"
		 xmlns="http://www.w3.org/2000/svg">
		<svg viewBox="0 0 16 17" id="bell">
			<path fillRule="evenodd"
				  d="M15.49 13.802l.055.047v.066c0 .745-.581 1.078-1.3 1.078H9.468c0 .943-.786 2.007-1.695 2.007-.91 0-1.739-1.064-1.739-2.007H1.336C.618 14.993 0 14.66 0 13.915v-.066l.055-.047C2.009 12.179 3 9.585 3 6.085c0-1.783 1.318-3.887 3.782-4.359a.667.667 0 01-.055-.264c0-.528.491-.99 1.046-.99.554 0 1.045.462 1.045.99a.667.667 0 01-.054.264c2.463.472 3.781 2.576 3.781 4.359 0 3.5.991 6.094 2.946 7.717zM7.774 3.113c-2.41 0-3.41 1.88-3.41 2.888 0 3.236-.718 5.683-2.2 7.47h11.219c-1.482-1.787-2.2-4.234-2.2-7.47 0-1.009-1-2.888-3.41-2.888"></path>
		</svg>
	</svg>
});
