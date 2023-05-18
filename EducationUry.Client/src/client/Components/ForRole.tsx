import {observer} from "mobx-react-lite";
import * as React from "react";
import {CommonStore} from "../Layouts/CommonStore";

export const ForRole = observer((props?: {
	role: string;
	children?: React.ReactNode | React.ReactNode[];
}) => {
	return <>
		{CommonStore.instance.user?.role === props.role && props.children}
	</>
});
