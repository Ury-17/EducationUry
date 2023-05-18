import {observer} from "mobx-react-lite";
import * as React from "react";
import {CommonStore} from "./CommonStore";

export const Toasts = observer((_?: any) => {
	return (
		<div className="toast-container position-fixed bottom-0 end-0 p-3" style={{zIndex: 5}}>
			{CommonStore.instance.toasts.map((toast, idx) =>
			<div key={idx} className={`toast align-items-center text-white bg-primary border-0 show`} role="alert" aria-live="assertive" aria-atomic="true">
				<div className="d-flex">
					<div className="toast-body">
						{toast.value}
					</div>
					<button onClick={() => toast.onClose(idx)} type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
				</div>
			</div>)}
			
			{/*<div className="toast" role="alert" aria-live="assertive" aria-atomic="true">*/}
			{/*	<div className="toast-header">*/}
			{/*		<img src="..." className="rounded me-2" alt="..."/>*/}
			{/*			<strong className="me-auto">Bootstrap</strong>*/}
			{/*			<small className="text-muted">just now</small>*/}
			{/*			<button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>*/}
			{/*	</div>*/}
			{/*	<div className="toast-body">*/}
			{/*		See? Just like this.*/}
			{/*	</div>*/}
			{/*</div>*/}
			
			{/*<div className="toast" role="alert" aria-live="assertive" aria-atomic="true">*/}
			{/*	<div className="toast-header">*/}
			{/*		<img src="..." className="rounded me-2" alt="..."/>*/}
			{/*			<strong className="me-auto">Bootstrap</strong>*/}
			{/*			<small className="text-muted">2 seconds ago</small>*/}
			{/*			<button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>*/}
			{/*	</div>*/}
			{/*	<div className="toast-body">*/}
			{/*		Heads up, toasts will stack automatically*/}
			{/*	</div>*/}
			{/*</div>*/}
		</div>
	);
});
