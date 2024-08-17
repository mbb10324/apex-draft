import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import "./Home.css";
import Input from "../components/common/Input";

export default function Home() {
	const navigate = useNavigate();

	return (
		<div className="home">
			<div className="home-card">
				<h2>Create</h2>
				<p>Start a new draft for your league! You must have an account.</p>
				<Button onClick={() => navigate("/error")}>Get Started!</Button>
			</div>
			<div className="home-card">
				<h2>Join</h2>
				<p>Join a draft that has already been created! You must have an account.</p>
				<Input type="url" placeholder="Enter Link" />
			</div>
			<div className="home-card">
				<h2>Spectate</h2>
				<p>Watch a draft that is open to the public!</p>
				<Input type="url" placeholder="Enter Link" />
			</div>
		</div>
	);
}
