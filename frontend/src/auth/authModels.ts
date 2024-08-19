export type SessionMessage = "authorized" | "no-user" | "no-record" | "not-verified" | "not-active" | "server-error";

export type User = {
	email: string;
	first_name: string;
	last_name: string;
	profile_picture_url: string;
	username: string;
};

export type Session = {
	user: User | undefined;
	status: "idle" | "error" | "loading" | "success";
	refetch: () => void;
	message: SessionMessage | undefined;
};
