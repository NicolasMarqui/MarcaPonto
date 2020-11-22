import React, { useState, useEffect, useContext } from "react";
import "./styles.scss";
import HeaderInside from "../../../Components/HeaderInside";
import MainContext from "../../../Contexts/MainContext";
import S from "query-string";

interface SearchProps {}

const Search: React.FC<SearchProps> = () => {
    const {
        token,
        setNotificationCount,
        notificationCount,
        currentLoggedUserId,
    } = useContext(MainContext);

    const [currentSearch, setCurrentSearch] = useState("");

    useEffect(() => {
        const search = S.parse(window.location.search as any);

        if (search) {
            setCurrentSearch(search.q as any);
        }
        document.title = "Marca Ponto - Pesquisa";
    }, [S.parse(window.location.search as any)]);

    return (
        <div className="pontos__wrapper">
            <div className="pontos__header">
                <HeaderInside isHome={false} nome={"Pesquisa"} />

                <div className="page__title-info info__espelho">
                    <div className="tinf__wrapper">
                        <div className="tinf__name">
                            <h2 className="tt-title title-blue title-bold">
                                Pesquisando por <span>{currentSearch}</span>
                            </h2>

                            <p>Nada encontrado ...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Search;
