import { getLogout, postLogin, postSignUp, postVerify } from "./authEndpoints.ts";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";

export default function useAuth() {
	const [authState, setAuthState] = useState<string | undefined>();

	useEffect(() => {
		if (authState === "authorized") {
			window.location.reload();
		}
	}, [authState]);

	// SIGNUP
	const signupMutation = useMutation(postSignUp, {
		onSuccess: (data) => {
			setAuthState(data);
		},
	});

	function signup({
		email,
		username,
		firstName,
		lastName,
		password,
	}: {
		email: string;
		username: string;
		firstName: string;
		lastName: string;
		password: string;
	}) {
		signupMutation.mutate({ email, username, firstName, lastName, password });
	}

	const loginMutation = useMutation(postLogin, {
		onSuccess: (data) => {
			setAuthState(data);
		},
	});

	// LOGIN
	function login({ email, password }: { email: string; password: string }) {
		loginMutation.mutate({ email, password });
	}

	const verifyCode = useMutation(postVerify, {
		onSuccess: (data) => {
			setAuthState(data);
		},
	});

	// VERIFY
	function verify({ email, code }: { email: string; code: string }) {
		verifyCode.mutate({ email, code });
	}

	// LOGOUT
	const initiateLogout = useMutation(getLogout, {
		onSuccess: (data) => {
			setAuthState(data);
			window.location.reload();
		},
	});

	function logout() {
		initiateLogout.mutate();
	}

	return { signup, login, logout, verify, authState };
}
