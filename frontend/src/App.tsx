import DynamicError from "./components/common/DynamicError";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Error from "./pages/Error";
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
						path="/error"
						element={
							<Layout>
								<Error />
							</Layout>
						}
					/>
					<Route
						path="*"
						element={
							<Layout>
								<DynamicError message="404: Page not found." />
							</Layout>
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
