import ReactMarkdown from "react-markdown";
import AboutMD from "./About.md";
import "./About.css";

export default function About() {
	return (
		<div className="about-wrapper">
			<div className="about">
				<ReactMarkdown>{AboutMD}</ReactMarkdown>
			</div>
		</div>
	);
}
