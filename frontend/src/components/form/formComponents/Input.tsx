import { FormField, FormType, Validate } from "../formUtils/FormTypes";
import checkValidation from "../formUtils/checkValidation";
import ButtonGroup from "./ButtonGroup";
import FormError from "./FormError";
import Select from "./Select";
import React from "react";

type InputProps = {
	onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
	onEvent?: (value: string | number | boolean, name: string) => void;
	placeholder?: string;
	inputStyle?: string;
	errorStyle?: string;
	labelStyle?: string;
	wrapperStyle?: string;
	name: string;
	type: FormType;
	validation?: Validate;
	validateOnChange?: boolean;
	label?: React.ReactNode;
	options?: Array<{ value: string | number; title: string }>;
	defaultValue?: string | number | boolean;
	thisState?: FormField;
	disabled?: boolean;
};

function Input(props: InputProps) {
	const {
		label,
		wrapperStyle,
		inputStyle,
		errorStyle,
		labelStyle,
		name,
		type,
		placeholder,
		validateOnChange,
		options,
		thisState,
		onEvent,
		disabled = false,
		onChange,
	} = props;
	if (!onEvent) throw new Error("The form did not render properly");
	if (!thisState || !Array.isArray(thisState.errors)) return null;
	checkValidation(thisState.validation, type);

	switch (type) {
		case "radio":
		case "checkbox":
			return (
				<>
					<div className={`${wrapperStyle ? wrapperStyle : "input-container-inline"}`}>
						<input
							name={name}
							id={name}
							type={type}
							placeholder={`${placeholder ? placeholder : ""}`}
							defaultChecked={thisState?.value as boolean}
							disabled={disabled}
							className={`${inputStyle ? inputStyle : "input-style"} ${thisState?.errors.length > 0 ? "input-error" : ""}`}
							onChange={(e) => {
								validateOnChange && onEvent(e.target.checked, name);
								onChange && onChange(e);
							}}
							onBlur={(e) => {
								onEvent(e.target.checked, name);
							}}
							autoComplete="off"
						/>
						{label && (
							<label htmlFor={name} className={`${labelStyle ? labelStyle : "label-style"}`}>
								{label}
							</label>
						)}
					</div>
					<FormError errors={thisState?.errors ? thisState?.errors : []} errorStyle={errorStyle} />
				</>
			);
		case "color":
			return (
				<>
					<div className={`${wrapperStyle ? wrapperStyle : "input-container-inline"}`}>
						<div className="color-picker-container">
							<input
								name={name}
								id={name}
								type={type}
								defaultValue={thisState?.value as string}
								disabled={disabled}
								className={`${inputStyle ? inputStyle : "color-picker-style"}`}
								onChange={(e) => {
									onEvent(e.target.value, name);
									onChange && onChange(e);
								}}
								autoComplete="off"
							/>
						</div>
						{label && (
							<label htmlFor={name} className={`${labelStyle ? labelStyle : "label-style"}`}>
								{label}
							</label>
						)}
					</div>
					<FormError errors={thisState?.errors ? thisState?.errors : []} errorStyle={errorStyle} />
				</>
			);
		case "hidden":
			return <input name={"hidden"} id={"hidden"} type="hidden" />;
		case "select":
			if (!options) throw new Error("type `select` must have options prop");
			return (
				<Select
					onEvent={onEvent}
					inputStyle={inputStyle}
					errorStyle={errorStyle}
					labelStyle={labelStyle}
					wrapperStyle={wrapperStyle}
					name={name}
					thisState={thisState}
					label={label}
					options={options}
					disabled={disabled}
					onChange={onChange}
				/>
			);
		case "buttongroup":
			if (!options) throw new Error("type `buttongroup` must have options prop");
			return (
				<ButtonGroup
					onEvent={onEvent}
					inputStyle={inputStyle}
					errorStyle={errorStyle}
					labelStyle={labelStyle}
					wrapperStyle={wrapperStyle}
					name={name}
					thisState={thisState}
					label={label}
					options={options}
					onChange={onChange}
				/>
			);
		case "textarea":
			return (
				<div className={`${wrapperStyle ? wrapperStyle : "input-container"}`}>
					{label && (
						<label htmlFor={name} className={`${labelStyle ? labelStyle : "label-style"}`}>
							{label}
						</label>
					)}
					<textarea
						name={name}
						id={name}
						defaultValue={thisState?.value as string}
						placeholder={`${placeholder ? placeholder : ""}`}
						disabled={disabled}
						className={`${inputStyle ? inputStyle : "input-style"} ${thisState?.errors.length > 0 ? "input-error" : ""}`}
						onChange={(e) => {
							validateOnChange && onEvent(e.target.value, name);
							onChange && onChange(e);
						}}
						onBlur={(e) => {
							onEvent(e.target.value, name);
						}}
					/>
					<FormError errors={thisState?.errors ? thisState?.errors : []} errorStyle={errorStyle} />
				</div>
			);
		default:
			return (
				<div className={`${wrapperStyle ? wrapperStyle : "input-container"}`}>
					{label && (
						<label htmlFor={name} className={`${labelStyle ? labelStyle : "label-style"}`}>
							{label}
						</label>
					)}
					<input
						name={name}
						id={name}
						type={type}
						defaultValue={thisState?.value as string}
						placeholder={`${placeholder ? placeholder : ""}`}
						disabled={disabled}
						className={`${inputStyle ? inputStyle : "input-style"} ${thisState?.errors.length > 0 ? "input-error" : ""}`}
						onChange={(e) => {
							validateOnChange && onEvent(e.target.value, name);
							onChange && onChange(e);
						}}
						onBlur={(e) => {
							onEvent(e.target.value, name);
						}}
						autoComplete="off"
					/>
					<FormError errors={thisState?.errors ? thisState?.errors : []} errorStyle={errorStyle} />
				</div>
			);
	}
}

const MemoizedInput = React.memo(Input);
MemoizedInput.displayName = "Input";
export default MemoizedInput;
