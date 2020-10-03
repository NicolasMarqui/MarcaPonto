import { createContext } from "react";

const MainContext = createContext({
    token: null,
    setToken: (token) => {},
    removeToken: (token) => {},
    currentLoggedUserId: null,
    setCurrentLoggedUserId: (id) => {},
    removeCurrentLoggedUserId: (id) => {},
    sideNavOpen: true,
    setSideNavOpen: (status) => {},
});

export default MainContext;
