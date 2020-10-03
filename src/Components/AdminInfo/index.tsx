import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

interface AdminInfoProps {
    Icon?: any;
    number: number;
    text: string;
    linkTo: string;
}

const AdminInfo: React.FC<AdminInfoProps> = ({
    linkTo,
    Icon,
    text,
    number,
}) => {
    return (
        <div className="adm__info">
            <Link to={linkTo}>
                <div className="info__icon">
                    <Icon color="#222" size={22} />
                </div>

                <div className="info__amount">
                    <h4>{number}</h4>
                    <p>{text}</p>
                </div>
            </Link>
        </div>
    );
};
export default AdminInfo;
