import React, { useContext } from "react";
import "./styles.scss";
import Card from "../Card";
import { Link } from "react-router-dom";
import MarcarPonto from "../MarcarPonto";
import { FaCog } from "react-icons/fa";
import { ImBook } from "react-icons/im";
import MainContext from "../../Contexts/MainContext";

interface UserRenderProps {}

const UserRender: React.FC<UserRenderProps> = () => {
    const { currentLoggedUserId } = useContext(MainContext);

    return (
        <div className="usrntad__rr">
            <div className="rr__top-row">
                <div className="tr__ponto">
                    <Card size={2} height="full">
                        <MarcarPonto colaboradorId={currentLoggedUserId} />
                    </Card>
                </div>
                <div className="tp__afins">
                    <div className="afins__espelho">
                        <Link to="/dashboard/espelho">
                            <Card height="100p">
                                <div className="esp__icon">
                                    <ImBook color="#222" />
                                </div>

                                <div className="esp__text">
                                    <h3>Espelho do ponto</h3>
                                </div>
                            </Card>
                        </Link>
                    </div>
                    <div className="afins__config">
                        <Link to="/dashboard/settings">
                            <Card height="100p">
                                <div className="esp__icon">
                                    <FaCog color="#222" />
                                </div>

                                <div className="esp__text">
                                    <h3>Configurações</h3>
                                </div>
                            </Card>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default UserRender;
