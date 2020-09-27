import React from "react";

interface IconLinkProps {
    text: string;
}

const IconLink: React.FC<IconLinkProps> = ({ text }) => {
    return (
        <div className="icon-link__wrapper">
            <div className="icon-link__text">
                <h3>{text}</h3>
            </div>
        </div>
    );
};
export default IconLink;
