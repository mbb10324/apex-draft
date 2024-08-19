import Decorations from "../components/common/Decorations.tsx";
import Header from "../components/header/Header.tsx";
import Footer from "../components/footer/Footer.tsx";
import { useState } from "react";
import "./Layout.css";

type LayoutProps = {
	children: React.ReactNode;
};

export default function Layout(props: LayoutProps) {
	const { children } = props;
	const [footerHeight, setFooterHeight] = useState(0);

	return (
		<div className="layout" style={{ paddingBottom: `${footerHeight}px` }}>
			<Header />
			{children}
			<Footer setFooterHeight={setFooterHeight} />
			<Decorations />
		</div>
	);
}
