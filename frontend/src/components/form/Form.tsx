import React, { NamedExoticComponent, useCallback, useEffect } from "react";
import { FormType, InitializeForm, Validate } from "./formUtils/FormTypes";
import { useForm } from "./formUtils/FormReducer";
import Input from "./formComponents/Input";
import "./Form.css";

type FormProps = {
	children: React.ReactNode;
	formStyle?: string;
	showGeneralError?: boolean;
	submitWithErrors?: boolean;
	onSubmit?: (data: { [key: string]: string | number | boolean }) => void;
};

type ChildInputProps = {
	name: string;
	type: FormType;
	defaultValue?: string | number | boolean;
	validation?: Validate;
	children?: React.ReactNode;
};

function Form(props: FormProps) {
	const { children, formStyle, showGeneralError = true, submitWithErrors = false, onSubmit } = props;

	const { initializeFields, updateField, resetForm, submitForm, formState } = useForm();

	const onEvent = useCallback((value: string | number | boolean, name: string) => {
		updateField(name, value);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (children) {
			const fields: InitializeForm = {};
			const findInputsAndAddToFields = (children: React.ReactNode) => {
				React.Children.forEach(children, (child: React.ReactNode) => {
					if (React.isValidElement(child)) {
						const childType = child.type as NamedExoticComponent;
						const childProps = child.props as ChildInputProps;
						if (childType.displayName === "Input") {
							fields[childProps.name] = {
								value: childProps.defaultValue || "",
								type: childProps.type,
								validation: childProps.validation || {},
							};
						}
						findInputsAndAddToFields(childProps.children);
					}
				});
			};
			findInputsAndAddToFields(children);
			initializeFields(fields);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [children]);

	function enhanceChildren(children: React.ReactNode) {
		function enhance(child: React.ReactNode): React.ReactNode {
			if (!React.isValidElement(child)) {
				return child;
			}
			const childType = child.type as NamedExoticComponent;
			const childProps = child.props as ChildInputProps;
			if (childType.displayName === "Input") {
				return React.cloneElement(child as React.ReactElement, {
					onEvent: onEvent,
					thisState: formState[childProps.name] || {},
				});
			}
			if (childProps?.children) {
				const enhancedChildren = React.Children.map(childProps.children, enhance);
				return React.cloneElement(child as React.ReactElement, {
					children: enhancedChildren,
				});
			}
			return child;
		}
		return React.Children.map(children, enhance);
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = submitForm(submitWithErrors);
		if (onSubmit && formData) {
			onSubmit(formData);
		}
	}

	return (
		<form noValidate className={`${formStyle ? formStyle : "form-style"}`} onSubmit={handleSubmit} onReset={() => resetForm()}>
			{enhanceChildren(children)}
			{showGeneralError &&
				Object.keys(formState).some((key) => {
					const formField = formState[key as keyof typeof formState];
					return formField && "errors" in formField && formField.errors.length > 0;
				}) && <p className="error-style">Please check the highlighted fields for errors</p>}
		</form>
	);
}

Form.Input = Input;

export default Form;
