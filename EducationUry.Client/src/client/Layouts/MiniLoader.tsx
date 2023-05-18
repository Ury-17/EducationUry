import {observer} from "mobx-react-lite";
import * as React from "react";

export const MiniLoader = observer((props?: {
	size?: number;
	show?: boolean;
	style?: React.CSSProperties
}) => {

	if (!props.show) {
		return;
	}
	
	return <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" stroke="#fff" 
				style={{
					stroke: 'rgb(181 181 181)',
					width: props.size || 20,
					margin: 'auto',
					...props.style,
				}}>
		<g fill="none" fillRule="evenodd" strokeWidth="2">
			<circle cx="22" cy="22" r="1">
				<animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"/>
				<animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"/>
			</circle>
			<circle cx="22" cy="22" r="1">
				<animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"/>
				<animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"/>
			</circle>
		</g>
	</svg>;
	
	return <svg style={{
		...props.style,
		width: props.size || 20, 
	}} version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
				viewBox="0 0 50 50" enable-background="new 0 0 0 0" xmlSpace="preserve">
    <path fill="#eaa54f" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
      <animateTransform
		  attributeName="transform"
		  attributeType="XML"
		  type="rotate"
		  dur="0.8s"
		  from="0 25 25"
		  to="360 25 25"
		  repeatCount="indefinite" />
  </path>
</svg>
});
