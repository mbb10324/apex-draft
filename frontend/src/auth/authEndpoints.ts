const apiURL = "http://localhost:5000";

type AuthParams = {
	email?: string;
	username?: string;
	firstName?: string;
	lastName?: string;
	password?: string;
};

export function postSignUp({ email, username, firstName, lastName, password }: AuthParams) {
	return fetch(`${apiURL}/auth/signup`, {
		headers: {
			"Content-Type": "application/json",
		},
		method: "POST",
		mode: "cors",
		credentials: "include",
		body: JSON.stringify({ email, username, firstName, lastName, password }),
	})
		.then((response) => response.json())
		.catch((error) => console.error("Error:", error));
}

export function postLogin({ email, password }: AuthParams) {
	return fetch(`${apiURL}/auth/login`, {
		headers: {
			"Content-Type": "application/json",
		},
		method: "POST",
		mode: "cors",
		credentials: "include",
		body: JSON.stringify({ email, password }),
	})
		.then((response) => response.json())
		.catch((error) => console.error("Error:", error));
}

export function getSession() {
	return fetch(`${apiURL}/auth/session`, {
		method: "GET",
		mode: "cors",
		credentials: "include",
	})
		.then((response) => response.json())
		.catch((error) => console.error("Error:", error));
}

export function getLogout() {
	return fetch(`${apiURL}/auth/logout`, {
		method: "GET",
		mode: "cors",
		credentials: "include",
	})
		.then((response) => response.json())
		.catch((error) => console.error("Error:", error));
}

export function postVerify({ email, code }: { email: string; code: string }) {
	console.log("FROM POST", email, code);
	return fetch(`${apiURL}/auth/verify`, {
		headers: {
			"Content-Type": "application/json",
		},
		method: "POST",
		mode: "cors",
		credentials: "include",
		body: JSON.stringify({ email, code }),
	})
		.then((response) => response.json())
		.catch((error) => console.error("Error:", error));
}
