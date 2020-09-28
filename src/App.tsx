import React from "react";
import "./Styles/main.scss";
import Routes from "./routes";
import MainProvider from "./Contexts/MainProvider";

function App() {
    return (
        <MainProvider>
            <Routes />
        </MainProvider>
    );
}

export default App;
