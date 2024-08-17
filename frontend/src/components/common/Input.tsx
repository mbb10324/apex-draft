import React from "react";
import "./Input.css";

export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
	return <input className={`draft-input ${props.className ? props.className : ""}`} {...props} />;
}
