import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

interface HeaderInsideProps {
    isHome: boolean;
    nome: string;
}

const HeaderInside: React.FC<HeaderInsideProps> = ({ isHome, nome }) => {
    return (
        <div className="hins__wrap">
            <div className="hins__header">
                <ul>
                    {!isHome && (
                        <>
                            <li>
                                <Link to="/dashboard">Home</Link>
                            </li>
                            <li className="hins__not-round">
                                <p>{">"}</p>
                            </li>
                        </>
                    )}
                    <li>
                        <p>{nome}</p>
                    </li>
                </ul>
            </div>
        </div>
    );
};
export default HeaderInside;
