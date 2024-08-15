import useBreakpoints from "../../utils/hooks/useBreakpoint";
import MenuDesktop from "./MenuDesktop";
import MenuMobile from "./MenuMobile";

export type MenuOption = {
	label: string;
	path: string;
};

export default function Menu() {
	const mobile = useBreakpoints(1024);

	const menuOptions: MenuOption[] = [
		{ label: "Home", path: "/" },
		{ label: "About", path: "/about" },
		{ label: "Services", path: "/services" },
		{ label: "Portfolio", path: "/portfolio" },
		{ label: "Contact", path: "/contact" },
	];

	return mobile ? <MenuMobile menuOptions={menuOptions} /> : <MenuDesktop menuOptions={menuOptions} />;
}
