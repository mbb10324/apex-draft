import React from "react";
import FormError from "./FormError";
import { FormField } from "../formUtils/FormTypes";

type SelectProps = {
	onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	onEvent: (value: string | number | boolean, name: string) => void;
	label: React.ReactNode;
	inputStyle?: string;
	errorStyle?: string;
	labelStyle?: string;
	wrapperStyle?: string;
	name: string;
	thisState: FormField;
	options: Array<{ value: string | number; title: string }>;
	disabled?: boolean;
};

function Select(props: SelectProps) {
	const { label, options, wrapperStyle, inputStyle, errorStyle, labelStyle, name, thisState, disabled, onChange, onEvent } = props;

	return (
		<div className={`${wrapperStyle ? wrapperStyle : "input-container"}`}>
			{label && (
				<label htmlFor={name} className={`${labelStyle ? labelStyle : "label-style"}`}>
					{label}
				</label>
			)}
			<select
				name={name}
				id={name}
				value={thisState?.value as string}
				disabled={disabled}
				className={`${inputStyle ? inputStyle : "input-style"} ${thisState?.errors.length > 0 ? "input-error" : ""}`}
				onChange={(e) => {
					onEvent(e.target.value, name);
					onChange && onChange(e);
				}}
			>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.title}
					</option>
				))}
			</select>
			<FormError errors={thisState?.errors ? thisState?.errors : []} errorStyle={errorStyle} />
		</div>
	);
}

export default React.memo(Select);
