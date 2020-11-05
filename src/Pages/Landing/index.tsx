import React from "react";
import NavBar from "../../Components/NavBar";
import "./styles.scss";

const Landing: React.FC = () => {
    return (
        <div className="landing__wrapper">
            <NavBar />

            <div className="landing__hero">
                <h1>
                    Em breve{" "}
                    <span role="img" aria-label="Smilee">
                        😄
                    </span>
                </h1>
            </div>
        </div>
    );
};
export default Landing;
