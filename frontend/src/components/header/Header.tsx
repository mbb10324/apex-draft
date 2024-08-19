import Menu from "../menu/Menu.tsx";
import "./Header.css";

export default function Header() {
	return (
		<div className="header">
			<h1>The Draft</h1>
			<Menu />
		</div>
	);
}
