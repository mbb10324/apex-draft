import { FormType } from "./FormTypes";

export function defaultFormValidation(type: FormType) {
	switch (type) {
		case "text":
			return { required: true, maxLength: 250 };
		case "textarea":
			return { required: true, maxLength: 1000 };
		case "email":
			return {
				required: true,
				pattern: new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"),
				patternMessage: "Invalid Email",
			};
		case "password":
			return {
				required: true,
				pattern: new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"),
				patternMessage:
					"Password must be at least 8 characters, contain at least one uppercase, one lowercase, one digit, and one special character",
			};
		case "tel":
			return {
				required: true,
				pattern: new RegExp("^[0-9]{10}$"),
				patternMessage: "Invalid Phone Number",
			};
		case "range":
			return {
				required: true,
				min: 0,
				max: 100,
			};
		case "number":
			return {
				required: true,
				min: 0,
				max: 1000000,
			};
		case "url":
			return {
				required: true,
				pattern: new RegExp("^(http(s)?:\\/\\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$"),
				patternMessage: "Invalid URL",
			};
		case "time":
		case "date":
		case "datetime-local":
		case "file":
		case "month":
		case "week":
		case "select":
		case "buttongroup":
			return {
				required: true,
			};
		default:
			return {};
	}
}
