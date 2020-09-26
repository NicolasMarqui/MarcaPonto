import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

interface HomeProps {
    match: any;
}

const Home: React.FC<HomeProps> = () => {
    return <Link to={`/dashboard/settings`}>Go to Settings</Link>;
};
export default Home;
