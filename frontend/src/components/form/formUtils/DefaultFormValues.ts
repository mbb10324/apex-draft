import { FormType } from "./FormTypes";

export default function defaultFormValues(type: FormType) {
	switch (type) {
		case "radio":
		case "checkbox":
			return false;
		case "color":
			return "#000000";
		default:
			return "";
	}
}
