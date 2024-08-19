import { FormType, Validate } from "./FormTypes";

export default function checkValidation(validation: Validate, type: FormType) {
	switch (type) {
		case "number":
		case "range":
			if (validation.maxLength || validation.minLength) {
				throw new Error(`Validation prop error at an Input component. "${type}" type cannot have maxLength or minLength`);
			}
			break;
		case "text":
		case "email":
		case "password":
		case "tel":
		case "url":
		case "textarea":
			if (validation.min || validation.max) {
				throw new Error(`Validation prop error at an Input component. "${type}" type cannot have min or max`);
			}
			break;
		case "time":
		case "date":
		case "datetime-local":
		case "week":
		case "month":
		case "color":
		case "hidden":
		case "select":
		case "buttongroup":
		case "file":
		case "radio":
		case "checkbox":
			if (
				validation.min ||
				validation.max ||
				validation.maxLength ||
				validation.minLength ||
				validation.pattern ||
				validation.patternMessage
			) {
				throw new Error(
					`Validation prop error at an Input component. "${type}" type cannot have min, max, maxLength, or minLength`
				);
			}
			break;
	}
}
