import React, { useContext } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import MainContext from "../../Contexts/MainContext";
import { BiChevronRight } from "react-icons/bi";

interface MenuLinkProps {
    icon?: any;
    text: string;
    link?: string;
    from: string;
    hasArrow?: boolean;
    hasKids?: boolean;
}

const MenuLink: React.FC<MenuLinkProps> = ({
    icon,
    text,
    link,
    from,
    hasArrow = true,
    hasKids = false,
}) => {
    const { sideNavOpen, setShowNavBarXs } = useContext(MainContext);
    // const [isHovering, setIsHovering] = useState(false);

    const linkClicked = () => {
        setShowNavBarXs(false);
        // setIsHovering(true);
    };

    return (
        <Link to={`${link ? `/${from}${link}` : "#"}`} onClick={linkClicked}>
            <div
                className={`link__wrapper ${
                    !sideNavOpen ? "link__reduced" : ""
                }`}
            >
                <div className="link__icon">{icon}</div>

                <div className="link__text">
                    <p>{text}</p>
                </div>

                {hasArrow && (
                    <div className="link__arrow">
                        <BiChevronRight color="#222222a1" size={18} />
                    </div>
                )}
            </div>
        </Link>
    );
};
export default MenuLink;
