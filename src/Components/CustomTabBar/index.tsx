import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { TabContent } from "../../Services/TabContent";

interface CustomTabBarProps {
    children: any;
}

const CustomTabBar: React.FC<CustomTabBarProps> = ({ children }) => {
    return (
        <Tabs>
            <TabList>
                {TabContent.map((tab) => (
                    <Tab key={tab}>{tab}</Tab>
                ))}
            </TabList>

            {children}
        </Tabs>
    );
};

export default CustomTabBar;
