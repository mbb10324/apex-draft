import Header from "../components/header/Header";

type LayoutProps = {
	children: React.ReactNode;
};

export default function Layout(props: LayoutProps) {
	const { children } = props;

	return (
		<>
			<Header />
			{children}
		</>
	);
}
