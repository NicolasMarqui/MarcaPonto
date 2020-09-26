import React from "react";
import "./styles.scss";

interface CardProps {
    children: React.FC;
    size: Number;
}

const Card: React.FC<CardProps> = ({ children }) => {
    return <div className="card__wrapper">{children}</div>;
};
export default Card;
