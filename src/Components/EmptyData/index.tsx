import React from "react";
import Lottie from "react-lottie";

const ANIMATION__EMPTY = require("../../Assets/animations/empty.json");

interface EmptyDataProps {
    hasMargin?: boolean;
}

const EmptyData: React.FC<EmptyDataProps> = ({ hasMargin = false }) => {
    return (
        <div
            className="empty__animation"
            style={{ margin: `${hasMargin ? "30px" : "0"}` }}
        >
            <Lottie
                options={{
                    loop: true,
                    animationData: ANIMATION__EMPTY,
                }}
                height={200}
                width={200}
            />

            <h3>Nada por enquanto :(</h3>
        </div>
    );
};
export default EmptyData;
