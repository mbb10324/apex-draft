import Button from "../../components/common/Button";
import Form from "../../components/form/Form";
import "./Auth.css";

type LoginProps = {
	setFlowState: (value: "signup") => void;
};

export default function Login(props: LoginProps) {
	const { setFlowState } = props;

	return (
		<Form>
			<h2>Login</h2>
			<Form.Input label="Email" name="email" type="email" placeholder="Email" />
			<Form.Input label="Password" name="password" type="password" placeholder="Password" />
			<div className="form-flex">
				<Button type="submit" style={{ flexGrow: 1 }}>
					Log In
				</Button>
				<p>or</p>
				<Button type="button" style={{ flexGrow: 1 }} onClick={() => setFlowState("signup")}>
					Sign Up
				</Button>
			</div>
			<div>
				<p>
					Forgot Password? <span className="form-text-link">Click Here</span>
				</p>
				<p>
					Forgot Email? <span className="form-text-link">Contact Us</span>
				</p>
			</div>
		</Form>
	);
}
