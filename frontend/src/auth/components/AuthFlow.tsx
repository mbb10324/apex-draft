import useSession from "../useSession";
import { useEffect, useState } from "react";
import SignUp from "./SignUp";
import Verify from "./Verify";
import Login from "./Login";
import useAuth from "../useAuth";

export default function AuthFlow() {
	const [flowState, setFlowState] = useState<"login" | "signup" | "verify">("login");
	const session = useSession();
	const { verify, signup, authState } = useAuth();

	useEffect(() => {
		if (session.message && session.message === "not-verified") {
			setFlowState("verify");
		}
	}, [session]);

	return (
		<>
			{flowState === "signup" ? (
				<SignUp setFlowState={setFlowState} signup={signup} authState={authState} />
			) : flowState === "verify" ? (
				<Verify verify={verify} authState={authState} />
			) : (
				<Login setFlowState={setFlowState} />
			)}
		</>
	);
}
