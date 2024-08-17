import React from "react";
import "./Button.css";

export default function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button className={`draft-button ${props.className ? props.className : ""}`} {...props}>
			{props.children}
		</button>
	);
}
