import { useState } from "react";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import "./Layout.css";
import Decorations from "../components/common/Decorations";

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
