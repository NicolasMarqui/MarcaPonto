import { createContext } from "react";

const MainContext = createContext({
    token: null,
    setToken: (token) => {},
    removeToken: (token) => {},
    currentLoggedUserId: null,
    setCurrentLoggedUserId: (id) => {},
    removeCurrentLoggedUserId: (id) => {},
});

export default MainContext;
