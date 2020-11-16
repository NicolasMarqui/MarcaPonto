import React from "react";
import "./styles.scss";

interface CardProps {
    children: any;
    size?: Number;
    height?: String;
    isFlex?: Boolean;
}

const Card: React.FC<CardProps> = ({
    children,
    size = 1,
    height = "auto",
    isFlex = "true",
}) => {
    return (
        <div
            className={`card__wrapper size${size} height-${height} ${
                !isFlex ? "not-flex" : ""
            }`}
        >
            {children}
        </div>
    );
};
export default Card;
