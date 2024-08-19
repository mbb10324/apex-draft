import DynamicError from "./components/common/DynamicError.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout.tsx";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Error from "./pages/Error.tsx";
import "./App.css";
import SessionProvider from "./auth/SessionProvider.tsx";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

function App() {
	return (
		<div className="app">
			<BrowserRouter>
				<QueryClientProvider client={queryClient}>
					<SessionProvider>
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
										<DynamicError message="404 Page not found" />
									</Layout>
								}
							/>
						</Routes>
					</SessionProvider>
				</QueryClientProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
