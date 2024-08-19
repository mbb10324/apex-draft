import Button from "../../components/common/Button";
import Form from "../../components/form/Form";
import "./Auth.css";

type SignUpParams = {
	email: string;
	username: string;
	firstName: string;
	lastName: string;
	password: string;
};

type SignUpProps = {
	setFlowState: (value: "login") => void;
	signup: (data: SignUpParams) => void;
	authState: string | undefined;
};

export default function SignUp(props: SignUpProps) {
	const { setFlowState, signup, authState } = props;

	console.log(authState);

	function handleSubmit(data: { [key: string]: string | number | boolean }) {
		const { email, username, firstName, lastName, password } = data as SignUpParams;
		signup({ email, username, firstName, lastName, password });
	}

	return (
		<Form onSubmit={handleSubmit}>
			<h2>Sign Up</h2>
			<Form.Input label="Email" name="email" type="email" placeholder="Email" />
			<Form.Input label="Username" name="username" type="text" placeholder="Username" />
			<Form.Input label="First Name" name="firstName" type="text" placeholder="First Name" />
			<Form.Input label="Last Name" name="lastName" type="text" placeholder="Last Name" />
			<Form.Input label="Password" name="password" type="password" placeholder="Password" />
			<div className="form-flex">
				<Button type="submit" style={{ flexGrow: 1 }}>
					Sign Up
				</Button>
				<p>or</p>
				<Button type="button" style={{ flexGrow: 1 }} onClick={() => setFlowState("login")}>
					Go Back
				</Button>
			</div>
			<p>
				Problem Creating Account? <span className="form-text-link">Contact Us</span>
			</p>
		</Form>
	);
}
