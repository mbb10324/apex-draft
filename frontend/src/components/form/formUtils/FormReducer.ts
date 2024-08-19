import { type FormAction, type FormState, type InitializeForm } from "./FormTypes";
import { defaultFormValidation } from "./DefaultFormValidation";
import { validateFormField } from "./FormValidation";
import defaultFormValues from "./DefaultFormValues";
import { useReducer } from "react";

const formReducer = (state: FormState, action: FormAction): FormState => {
	switch (action.type) {
		case "VALIDATE":
			return {
				...action.data,
			};
		case "UPDATE":
			if (typeof action.data.field === "symbol") {
				throw new Error("Field cannot be a symbol");
			}
			//  eslint-disable-next-line
			const thisField = state[action.data.field];
			if (!thisField) {
				throw new Error("Field does not exist");
			}
			//  eslint-disable-next-line
			const validationResult = validateFormField(action.data.value, thisField.validation);
			return {
				...state,
				[action.data.field]: {
					value: action.data.value,
					type: thisField.type,
					errors: validationResult,
					validation: thisField.validation,
				},
			};
		case "INITIALIZE":
			return {
				...state,
				...Object.keys(action.data).reduce((acc, key) => {
					const field = action.data[key];
					if (!field) {
						return state;
					}
					const defaultValidation = defaultFormValidation(field.type);
					const defaultValues = defaultFormValues(field.type);
					acc[key] = {
						value: field?.value || defaultValues,
						type: field?.type,
						errors: [],
						validation: Object.keys(field?.validation).length > 0 ? field.validation : defaultValidation,
					};
					return acc;
				}, {} as FormState),
			};
		case "RESET":
			return Object.keys(state).reduce((acc, key) => {
				const field = state[key as keyof typeof state];
				if (!field) {
					return state;
				}
				const defaultValues = defaultFormValues(field.type);
				acc[key] = {
					value: defaultValues,
					type: field.type,
					errors: [],
					validation: field.validation,
				};
				return acc;
			}, {} as FormState);
	}
};

export function useForm<T extends InitializeForm>() {
	const [formState, dispatch] = useReducer(formReducer, {});
	type FormKeys = keyof T;

	function initializeFields(fields: InitializeForm) {
		dispatch({ type: "INITIALIZE", data: fields });
	}

	function updateField(field: FormKeys, value: string | number | boolean) {
		dispatch({ type: "UPDATE", data: { field, value } });
	}

	function resetForm() {
		dispatch({ type: "RESET" });
	}

	function updateAllFields(validatedState: FormState) {
		dispatch({ type: "VALIDATE", data: validatedState });
	}

	function submitForm(submitWithErrors: boolean) {
		let validatedState = {};
		let hasErrors = false;
		const result = Object.keys(formState).reduce((acc, key) => {
			const formField = formState[key as keyof typeof formState];
			const validationResult = validateFormField(formField.value, formField.validation);
			validatedState = { ...validatedState, [key]: { ...formField, errors: validationResult } };
			dispatch({ type: "UPDATE", data: { field: key, value: formField?.value ?? "" } });
			if (!submitWithErrors && validationResult.length > 0) {
				hasErrors = true;
			} else {
				acc[key] = formField.value;
			}
			return acc;
		}, {} as { [key: string]: string | number | boolean });
		updateAllFields(validatedState);
		return hasErrors ? {} : result;
	}

	return { initializeFields, updateField, resetForm, submitForm, formState };
}
