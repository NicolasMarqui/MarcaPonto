import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

interface MenuLinkProps {
    icon?: any;
    text: String;
    link: String;
    from: String;
}

const MenuLink: React.FC<MenuLinkProps> = ({ icon, text, link, from }) => {
    return (
        <Link to={`/${from}${link}`}>
            <div className="link__wrapper">
                <div className="link__icon">{icon}</div>

                <div className="link__text">
                    <p>{text}</p>
                </div>
            </div>
        </Link>
    );
};
export default MenuLink;
