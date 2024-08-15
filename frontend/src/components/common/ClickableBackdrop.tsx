import "./ClickableBackdrop.css";

type ClickableBackdropProps = {
	show: boolean;
	onClick: () => void;
	zIndex: number;
};

export default function ClickableBackdrop(props: ClickableBackdropProps) {
	const { show, onClick, zIndex = 100 } = props;

	return <div className={`clickable-backdrop ${show ? "clickable-backdrop-show" : ""}`} onClick={onClick} style={{ zIndex: zIndex }} />;
}
