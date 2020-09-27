import React, { useEffect } from "react";
import UserRender from "../../../Components/UserRender";
import "./styles.scss";

interface HomeProps {
    match: any;
}

const role = "USER";

const Home: React.FC<HomeProps> = () => {
    useEffect(() => {
        document.title = "Marca Ponto - Dashboard";
    }, []);

    return (
        <div className="home__wrapper">
            {role === "USER" ? <UserRender /> : ""}
        </div>
    );
};
export default Home;
