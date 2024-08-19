import React from "react";

type ErrorsProps = {
	errors: string[];
	errorStyle?: string;
};

function FormError(props: ErrorsProps) {
	const { errors, errorStyle } = props;

	return (
		<>
			{errors &&
				errors.map((err: string, i: number) => (
					<p className={`${errorStyle ? errorStyle : "error-style"}`} key={i}>
						{err}
					</p>
				))}
		</>
	);
}

export default React.memo(FormError);
