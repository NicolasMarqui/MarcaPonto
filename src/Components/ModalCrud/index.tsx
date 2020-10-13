import React, { useContext, useEffect, useState } from "react";
import "./styles.scss";
import { IoMdCloseCircle } from "react-icons/io";
import MainContext from "../../Contexts/MainContext";
import useWindowDimensions from "../../Hooks/useWindowDimensions";

interface ModalCrudProps {
    children: any;
    onClose: () => {};
}

const ModalCrud: React.FC<ModalCrudProps> = ({ children, onClose }) => {
    const { setOpenMoreInfo, setaddModalOpen } = useContext(MainContext);
    const [modalContentSize, setModalContentSize] = useState<
        number | undefined
    >(0);
    const { height } = useWindowDimensions();

    const handleClose = (event: any) => {
        if (event.target === event.currentTarget) {
            setOpenMoreInfo(false);
            setaddModalOpen(false);
        }
    };

    useEffect(() => {
        const modalHeight = document.querySelector(".modal__content")
            ?.clientHeight;
        setModalContentSize(modalHeight);
    }, []);

    return (
        <div className="modal__crud--wrapper" onClick={handleClose}>
            <div className="modal__close" onClick={onClose}>
                <IoMdCloseCircle color="#fff" size={54} />
            </div>

            <div
                className={`modal__content ${
                    modalContentSize
                        ? modalContentSize > height
                            ? "content__scroll"
                            : ""
                        : ""
                }`}
            >
                {children}
            </div>
        </div>
    );
};
export default ModalCrud;
