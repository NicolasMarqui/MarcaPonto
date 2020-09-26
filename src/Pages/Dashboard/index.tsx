import React from "react";
import "./styles.scss";
import NavBarInterna from "../../Components/NavBarInterna";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = ({}) => {
    return (
        <div className="dashboard__wrapper">
            <div className="dashboard__content">
                <div className="content__sidebar">Sidebar</div>

                <div className="content__main">
                    <NavBarInterna />
                </div>
            </div>
        </div>
    );
};
export default Dashboard;
