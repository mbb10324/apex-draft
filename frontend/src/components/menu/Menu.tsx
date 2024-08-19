import { useState } from "react";
import useBreakpoints from "../../utils/hooks/useBreakpoint.ts";
import MenuDesktop from "./MenuDesktop.tsx";
import MenuMobile from "./MenuMobile.tsx";
import Modal from "../common/Modal.tsx";
import ClickableBackdrop from "../common/ClickableBackdrop.tsx";
import AuthFlow from "../../auth/components/AuthFlow.tsx";

export type MenuOption = {
	label: string;
	path: string;
};

export default function Menu() {
	const mobile = useBreakpoints(1024);
	const [showLogin, setShowLogin] = useState(false);

	const menuOptions: MenuOption[] = [
		{ label: "Home", path: "/" },
		{ label: "About", path: "/about" },
		{ label: "Services", path: "/services" },
		{ label: "Portfolio", path: "/portfolio" },
		{ label: "Contact", path: "/contact" },
	];

	return (
		<>
			{mobile ? (
				<MenuMobile menuOptions={menuOptions} setShowLogin={setShowLogin} />
			) : (
				<MenuDesktop menuOptions={menuOptions} setShowLogin={setShowLogin} />
			)}
			<Modal showModal={showLogin} setShowModal={setShowLogin}>
				<AuthFlow />
			</Modal>
			<ClickableBackdrop show={showLogin} onClick={() => setShowLogin(false)} zIndex={99} />
		</>
	);
}
