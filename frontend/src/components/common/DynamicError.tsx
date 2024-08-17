import "./DynamicError.css";

type DynamicErrorProps = {
	message?: string;
};

export default function Error(props: DynamicErrorProps) {
	const { message = "Something went wrong. Please try again later." } = props;

	return (
		<div className="error">
			<h1>Error</h1>
			<p>{message}</p>
		</div>
	);
}
