import Button from "../../components/common/Button";
import Form from "../../components/form/Form";
import "./Auth.css";

type VerifyProps = {
	verify: (data: { email: string; code: string }) => void;
	authState: string | undefined;
};

export default function Verify(props: VerifyProps) {
	const { verify, authState } = props;

	console.log(authState);

	function handleSubmit(data: { [key: string]: string | number | boolean }) {
		const { email, code } = data as { email: string; code: string };
		verify({ email, code });
	}
	return (
		<Form onSubmit={handleSubmit}>
			<h2>Verification</h2>
			<p>We sent a verification code to your email. Please enter the code below to verify your account.</p>
			<Form.Input label="Email" name="email" type="email" placeholder="Email" />
			<Form.Input label="Code" name="code" type="number" placeholder="12345" />
			<div className="form-flex">
				<Button type="submit" style={{ flexGrow: 1 }}>
					Verify
				</Button>
			</div>
			<p>
				Didn't receive the code? <span className="form-text-link">Click Here</span>
			</p>
		</Form>
	);
}
