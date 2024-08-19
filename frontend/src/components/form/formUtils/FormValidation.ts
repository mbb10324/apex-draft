import { Validate } from "./FormTypes";

export function validateFormField(value: string | number | boolean, validation: Validate): string[] {
	const { required, minLength, maxLength, min, max, pattern, patternMessage } = validation;
	const errors: string[] = [];

	if (typeof value === "string" && required && value.length === 0) {
		errors.push("Required");
	}

	if (typeof value === "number" && required && value === 0) {
		errors.push("Required");
	}

	if (typeof value === "boolean" && required && value === false) {
		errors.push("Required");
	}

	if (typeof value === "string" && minLength && value.length < minLength) {
		errors.push(`Must be at least ${minLength} characters`);
	}

	if (typeof value === "string" && maxLength && value.length > maxLength) {
		errors.push(`Must be at most ${maxLength} characters`);
	}

	if (min !== undefined && Number(value) < min) {
		console.log("errord");
		errors.push(`Must be at least ${min}`);
	}

	if (max !== undefined && Number(value) > max) {
		errors.push(`Must be at most ${max}`);
	}

	if (typeof value === "string" && pattern && !pattern.test(value)) {
		errors.push(patternMessage ?? "Invalid Input");
	}

	return errors;
}
