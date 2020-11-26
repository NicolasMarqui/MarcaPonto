import React, { useState, useContext } from "react";
import "./styles.scss";
import { FaLightbulb } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { showToast } from "../../Functions";
import MainContext from "../../Contexts/MainContext";

interface TipProps {
    content: String;
}

const Tip: React.FC<TipProps> = ({ content }) => {
    const { showTips, setShowTips } = useContext(MainContext);
    const [isClosed, setIsClosed] = useState(false);

    const handleNotMore = () => {
        showToast("SUCCESS", "Dicas desabilitadas 😊", {});
        setShowTips(false);
    };

    return (
        showTips && (
            <div className={`tip__container ${isClosed ? "not__showing" : ""}`}>
                <div className="tip__icon">
                    <FaLightbulb
                        size={28}
                        className="bulb__svg"
                        color="orange"
                    />
                </div>
                <div className="tip__content">
                    {content}
                    <span onClick={handleNotMore}>Não quero ver dicas</span>
                </div>
                <div className="tip__close">
                    <AiOutlineCloseCircle
                        size={18}
                        className="close__svg"
                        onClick={() => setIsClosed(!isClosed)}
                    />
                </div>
            </div>
        )
    );
};
export default Tip;
