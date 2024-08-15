import { useLocation, useNavigate } from "react-router-dom";
import { MenuOption } from "./Menu";
import "./MenuDesktop.css";

type MenuDesktopProps = {
	menuOptions: MenuOption[];
};

export default function MenuDesktop(props: MenuDesktopProps) {
	const { menuOptions } = props;
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
		</div>
	);
}
