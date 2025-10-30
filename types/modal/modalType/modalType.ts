import { Modal } from "../modal";

export interface ModalType<ModalTypes> extends Modal {
	type: ModalTypes;
}