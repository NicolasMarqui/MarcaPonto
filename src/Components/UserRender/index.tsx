import React, { useContext } from "react";
import "./styles.scss";
import Card from "../Card";
import { Link } from "react-router-dom";
import MarcarPonto from "../MarcarPonto";
import { FaCog } from "react-icons/fa";
import { BsClockHistory } from "react-icons/bs";
import MainContext from "../../Contexts/MainContext";
import { getTodayInfo } from "../../Functions";

interface UserRenderProps {
    info: any;
}

const UserRender: React.FC<UserRenderProps> = ({ info }) => {
    const { currentLoggedUserId } = useContext(MainContext);

    return (
        <div className="admnntad__rr">
            <div className="adm__bemvindo">
                <div className="bem__vindo-info">
                    <h2 className="tt-title title-blue title-bold">
                        Bem Vindo
                    </h2>
                    <h3 className="tt-sub title-blue title-blue title-bold">
                        {info.username}
                    </h3>
                </div>

                <div className="bem__vindo-date">
                    <p>{getTodayInfo()}</p>
                </div>
            </div>
            <div className="user__grid--container">
                <div className="ponto">
                    <Card height="height-100p">
                        <MarcarPonto colaboradorId={currentLoggedUserId} />
                    </Card>
                </div>
                <div className="espelho">
                    <Card isFlex={false}>
                        <Link to="/dashboard/espelho">
                            <div className="header__title">
                                <h3 className="tt-sub title-blue title-bold title-center">
                                    Espelho
                                </h3>
                            </div>
                            <div className="grid__icon">
                                <BsClockHistory size={90} color="#222" />
                            </div>
                        </Link>
                    </Card>
                </div>
                <div className="config">
                    <Card isFlex={false}>
                        <Link to="/dashboard/settings">
                            <div className="home__header">
                                <div className="header__title">
                                    <h3 className="tt-sub title-blue title-bold title-center">
                                        Configurações
                                    </h3>
                                </div>
                            </div>
                            <div className="grid__icon">
                                <FaCog size={90} color="#222" />
                            </div>
                        </Link>
                    </Card>
                </div>
            </div>
        </div>
    );
};
export default UserRender;
