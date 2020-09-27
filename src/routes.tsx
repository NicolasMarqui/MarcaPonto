import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";

const Routes = () => (
    <BrowserRouter>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
        />
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/dashboard" component={Dashboard} />
        </Switch>
    </BrowserRouter>
);

export default Routes;
