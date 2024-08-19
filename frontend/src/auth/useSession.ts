import { SessionContext } from "./SessionProvider";
import { useContext } from "react";

export default function useSession() {
	const session = useContext(SessionContext);
	if (!session) {
		throw new Error("useSession must be used within a SessionProvider");
	}
	return session;
}
