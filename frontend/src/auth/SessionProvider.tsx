import { createContext, useEffect, useState } from "react";
import { Session, SessionMessage, User } from "./authModels";
import { useQuery } from "react-query";
import { getSession } from "./authEndpoints";

export const SessionContext = createContext<Session | null>(null);

export default function SessionProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User>();
	const [message, setMessage] = useState<SessionMessage>();

	const { status, refetch } = useQuery("useSession", () => getSession(), {
		onSuccess: (data) => {
			setUser(data.user);
			setMessage(data.message);
		},
	});

	useEffect(() => {
		const timer = setTimeout(() => {
			refetch();
		}, 600000);

		return () => clearTimeout(timer);
		// eslint-disable-next-line
	}, [user]);

	return <SessionContext.Provider value={{ user, message, status, refetch }}>{children}</SessionContext.Provider>;
}
