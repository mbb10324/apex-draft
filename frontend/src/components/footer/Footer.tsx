import { useEffect, useRef } from "react";
import "./Footer.css";

type FooterProps = {
	setFooterHeight: (height: number) => void;
};

export default function Footer(props: FooterProps) {
	const { setFooterHeight } = props;
	const footerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (footerRef.current) {
			setFooterHeight(footerRef.current.clientHeight + 40);
		}
	}, [setFooterHeight]);

	return (
		<div className="footer" ref={footerRef}>
			<div className="footer-content">
				<p>© 2024 The Draft</p>
				<h4>Support</h4>
				<h4>Terms & Conditions</h4>
				<h4>Privacy Policy</h4>
			</div>
		</div>
	);
}
