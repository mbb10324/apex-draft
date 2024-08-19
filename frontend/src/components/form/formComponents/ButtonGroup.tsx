import React, { useEffect, useState } from "react";
import { FormField } from "../formUtils/FormTypes";
import FormError from "./FormError";

type ButtonGroupProps = {
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onEvent: (value: string | number | boolean, name: string) => void;
	label: React.ReactNode;
	inputStyle?: string;
	errorStyle?: string;
	labelStyle?: string;
	wrapperStyle?: string;
	name: string;
	thisState: FormField;
	options: Array<{ value: string | number; title: string }>;
};

function ButtonGroup(props: ButtonGroupProps) {
	const { wrapperStyle, errorStyle, name, label, inputStyle, labelStyle, onEvent, onChange, thisState, options } = props;
	const [selected, setSelected] = useState<string | number>(thisState?.value as string | number);

	useEffect(() => {
		const stateValue = thisState?.value;
		if (typeof stateValue === "string" || typeof stateValue === "number") {
			setSelected(stateValue);
		}
	}, [thisState?.value]);

	return (
		<div id={name} className={`${wrapperStyle ? wrapperStyle : "input-container"}`}>
			{label && <p className={`${labelStyle ? labelStyle : "label-style"}`}>{label}</p>}
			{options.map((option) => (
				<input
					type="button"
					key={option.value}
					value={option.value}
					onClick={(e) => {
						e.preventDefault();
						setSelected(option.value);
						onEvent(option.value, name);
					}}
					onChange={(e) => {
						onChange && onChange(e);
					}}
					className={`
                    ${inputStyle ? inputStyle : "input-style button-group"}
                    ${selected === option.value ? "button-group-selected" : ""}
                    `}
				/>
			))}
			<FormError errors={thisState?.errors ? thisState?.errors : []} errorStyle={errorStyle} />
		</div>
	);
}

export default React.memo(ButtonGroup);
