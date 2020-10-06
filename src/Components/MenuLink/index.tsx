import React, { useContext } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import MainContext from "../../Contexts/MainContext";

interface MenuLinkProps {
    icon?: any;
    text: string;
    link: string;
    from: string;
}

const MenuLink: React.FC<MenuLinkProps> = ({ icon, text, link, from }) => {
    const { sideNavOpen, setShowNavBarXs } = useContext(MainContext);

    return (
        <Link to={`/${from}${link}`} onClick={() => setShowNavBarXs(false)}>
            <div
                className={`link__wrapper ${
                    !sideNavOpen ? "link__reduced" : ""
                }`}
            >
                <div
                    className={`link__popover ${
                        !sideNavOpen ? "popover__show" : ""
                    }`}
                >
                    <p>{text}</p>
                </div>
                <div className="link__icon">{icon}</div>

                <div className="link__text">
                    <p>{text}</p>
                </div>
            </div>
        </Link>
    );
};
export default MenuLink;
