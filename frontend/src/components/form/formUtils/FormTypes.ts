export type FormState = {
	[key: string]: FormField;
};

export type Validate = {
	required?: boolean;
	minLength?: number;
	maxLength?: number;
	min?: number;
	max?: number;
	pattern?: RegExp;
	patternMessage?: string;
};

export type FormField = {
	value: string | number | boolean;
	type: FormType;
	errors: string[];
	validation: Validate;
};

type UpdateForm = {
	field: string | number | symbol;
	value: string | number | boolean;
};

type InitializeFormField = {
	value: string | number | boolean;
	type: FormType;
	validation: Validate;
};

export type InitializeForm = {
	[key: string]: InitializeFormField;
};

export type FormAction =
	| { type: "VALIDATE"; data: FormState }
	| { type: "INITIALIZE"; data: InitializeForm }
	| { type: "UPDATE"; data: UpdateForm }
	| { type: "RESET" };

export type FormType =
	| "text"
	| "email"
	| "password"
	| "tel"
	| "time"
	| "number"
	| "date"
	| "datetime-local"
	| "week"
	| "month"
	| "file"
	| "url"
	| "range"
	| "radio"
	| "checkbox"
	| "color"
	| "hidden"
	| "select"
	| "buttongroup"
	| "textarea";
