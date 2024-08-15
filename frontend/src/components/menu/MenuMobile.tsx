import ClickableBackdrop from "../common/ClickableBackdrop";
import { useLocation, useNavigate } from "react-router-dom";
import { TfiClose, TfiMenu } from "react-icons/tfi";
import { MenuOption } from "./Menu";
import { useState } from "react";
import "./MenuMobile.css";

type MenuMobileProps = {
	menuOptions: MenuOption[];
};

export default function MenuMobile(props: MenuMobileProps) {
	const { menuOptions } = props;
	const navigate = useNavigate();
	const location = useLocation();
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<>
			<TfiMenu className="menu-icon" onClick={() => setMenuOpen(true)} />

			<div className={`menu-mobile ${menuOpen ? "menu-mobile-open" : ""}`}>
				<TfiClose className="menu-icon" onClick={() => setMenuOpen(false)} />

				<div className="menu-mobile-content">
					{menuOptions.map((option) => (
						<h2
							key={option.path}
							onClick={() => {
								navigate(option.path);
								setMenuOpen(false);
							}}
							className={`${location.pathname === option.path ? "menu-mobile-selected" : ""}`}
						>
							{option.label}
						</h2>
					))}
				</div>
			</div>
			<ClickableBackdrop show={menuOpen} onClick={() => setMenuOpen(false)} zIndex={99} />
		</>
	);
}
