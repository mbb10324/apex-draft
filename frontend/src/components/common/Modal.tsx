import { TfiClose } from "react-icons/tfi";
import "./Modal.css";

type ModalProps = {
	children: React.ReactNode;
	showModal: boolean;
	setShowModal: (menuOpen: boolean) => void;
};

export default function Modal(props: ModalProps) {
	const { children, showModal, setShowModal } = props;

	return (
		<div className={`modal ${showModal ? "modal-open" : ""}`}>
			<TfiClose className="modal-icon" onClick={() => setShowModal(false)} />
			{children}
		</div>
	);
}
