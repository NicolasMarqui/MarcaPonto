import React from "react";
import "./styles.scss";

interface CardProps {
    children: any;
    size?: Number;
    height?: String;
}

const Card: React.FC<CardProps> = ({ children, size = 1, height = "auto" }) => {
    return (
        <div className={`card__wrapper size${size} height-${height}`}>
            {children}
        </div>
    );
};
export default Card;
