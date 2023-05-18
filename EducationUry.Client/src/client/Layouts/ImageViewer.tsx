import {observer} from "mobx-react-lite";
import * as React from "react";
import {CommonStore} from "./CommonStore";

export const ImageViewer = observer((props: {
	isOpen: boolean;
	file: string | null;
	text: string;
	onClose: () => void;
}) => {
	if (props.file === null) {
		return;
	}
	return <div className={`pswp ${props.isOpen ? 'pswp--supports-fs pswp--open pswp--notouch pswp--css_animation pswp--svg pswp--animated-in pswp--visible pswp--has_mouse' : ''}`} tabIndex={-1} role="dialog" aria-hidden="false" style={{position: 'fixed', opacity: 1}}>

		<div className="pswp__bg" style={{opacity: 1}}></div>

		<div className="pswp__scroll-wrap">

			<div className="pswp__container" style={{transform: 'translate3d(0px, 0px, 0px)'}}>
				<div className="pswp__item" style={{transform: 'translate3d(0px, 0px, 0px)'}}>
					<div className="pswp__zoom-wrap" style={{transform: 'translate3d(0px, 0px, 0px) scale(1)'}}>
					<div className="gl" onClick={() => props.onClose()}>
						<div className="gl__container">
							<div className="gl__image">
								<img src={CommonStore.instance.api.files.getPhotoOriginal(props.file)} style={{maxWidth: `${window.screen.width}px`, maxHeight: `${window.screen.height}px`}}/>
							</div>
							<div className="gl__footer l-clear">
								<div className="gl__counter" style={{color: '#060709'}}>
									{props.text}
								</div>
								<div className="gl__title">

								</div>
								<div className="gl__author">

								</div>
							</div>

						</div>
					</div>
				</div></div>
			</div>
			<div className="pswp__ui pswp__ui--idle">
				<div className="pswp__close_area">
					<svg className="icon icon--ui_close" width="24" height="24">
						<svg viewBox="0 0 10 10" id="ui_close"><path fill-rule="evenodd" d="M9.096 0L5 4.097.903 0 0 .904 4.096 5 0 9.097.903 10 5 5.904 9.096 10 10 9.097 5.903 5 10 .904z"></path></svg>
					</svg>
				</div>
				<a href="#" className="pswp__download">
					<svg className="icon icon--ui_download" width="27" height="27">
						<svg viewBox="0 0 28 28" id="ui_download"><path d="M3.5 19.379a1.5 1.5 0 00-3 0v6.62A1.5 1.5 0 002 27.5h24a1.5 1.5 0 001.5-1.5v-6.62a1.5 1.5 0 00-3 0v5.12h-21v-5.12zm12-17.387a1.5 1.5 0 10-3 .013l.06 14.524-6.527-6.208a1.5 1.5 0 00-2.067 2.174l9.076 8.632a1.5 1.5 0 002.075-.008l8.924-8.616a1.5 1.5 0 10-2.084-2.158l-6.396 6.176L15.5 1.992z"></path></svg>
					</svg>
				</a>
			</div>
		</div>

	</div>
});
