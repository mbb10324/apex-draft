import "./Home.css";

export default function Home() {
	return (
		<div className="home">
			<div className="home-card">
				<h2>Create</h2>
				<p>Start a new draft for your league! You must have an account.</p>
				<button>Get Started!</button>
			</div>
			<div className="home-card">
				<h2>Join</h2>
				<p>Join a draft that has already been created! You must have an account.</p>
				<input type="url" placeholder="Enter Link" />
			</div>
			<div className="home-card">
				<h2>Spectate</h2>
				<p>Watch a draft that is open to the public!</p>
				<input type="url" placeholder="Enter Link" />
			</div>
		</div>
	);
}
