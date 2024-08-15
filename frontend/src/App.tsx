import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import "./App.css";

function App() {
	return (
		<div className="app">
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<Layout>
								<Home />
							</Layout>
						}
					/>
					<Route
						path="/about"
						element={
							<Layout>
								<About />
							</Layout>
						}
					/>
					<Route
						path="*"
						element={
							<Layout>
								<div className="four-oh-four">404 Not Found :&#40;</div>
							</Layout>
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
