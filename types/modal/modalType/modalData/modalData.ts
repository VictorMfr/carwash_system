import { ModalType } from "../modalType";

export interface ModalTypedData<TypeData> extends ModalType<TypeData> {
	data: any;
}