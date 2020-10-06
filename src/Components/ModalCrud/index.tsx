import React from "react";
import "./styles.scss";
import { IoMdCloseCircle } from "react-icons/io";

interface ModalCrudProps {
    children: any;
    onClose: () => {};
}

const ModalCrud: React.FC<ModalCrudProps> = ({ children, onClose }) => {
    return (
        <div className="modal__crud--wrapper">
            <div className="modal__close" onClick={onClose}>
                <IoMdCloseCircle color="#fff" size={54} />
            </div>

            <div className="modal__content">{children}</div>
        </div>
    );
};
export default ModalCrud;
