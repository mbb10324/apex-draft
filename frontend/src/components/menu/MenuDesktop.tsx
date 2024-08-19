import { useLocation, useNavigate } from "react-router-dom";
import { MenuOption } from "./Menu";
import "./MenuDesktop.css";
import Button from "../common/Button";

type MenuDesktopProps = {
	menuOptions: MenuOption[];
	setShowLogin: (showLogin: boolean) => void;
};

export default function MenuDesktop(props: MenuDesktopProps) {
	const { menuOptions, setShowLogin } = props;
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<div className="menu-desktop">
			{menuOptions.map((option) => (
				<h2
					key={option.path}
					onClick={() => navigate(option.path)}
					className={`${location.pathname === option.path ? "menu-desktop-selected" : ""}`}
				>
					{option.label}
				</h2>
			))}
			<Button onClick={() => setShowLogin(true)}>Log In</Button>
		</div>
	);
}
