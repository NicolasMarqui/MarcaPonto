import React, { useContext } from "react";
import "./styles.scss";
import Card from "../Card";
import { Link } from "react-router-dom";
import MarcarPonto from "../MarcarPonto";
import { FaCog } from "react-icons/fa";
import { ImBook } from "react-icons/im";
import MainContext from "../../Contexts/MainContext";
import AdminInfo from "../AdminInfo";

interface AdminRenderProps {}

const AdminRender: React.FC<AdminRenderProps> = () => {
    const { currentLoggedUserId } = useContext(MainContext);

    return (
        <div className="admnntad__rr">
            <div className="adm__info-wrapper">
                <AdminInfo
                    Icon={ImBook}
                    text="Usuários"
                    number={200}
                    linkTo="/dashboard/usuarios"
                />
                <AdminInfo
                    Icon={ImBook}
                    text="Usuários"
                    number={200}
                    linkTo="/dashboard/usuarios"
                />
                <AdminInfo
                    Icon={ImBook}
                    text="Usuários"
                    number={200}
                    linkTo="/dashboard/usuarios"
                />
                <AdminInfo
                    Icon={ImBook}
                    text="Usuários"
                    number={200}
                    linkTo="/dashboard/usuarios"
                />
                <AdminInfo
                    Icon={ImBook}
                    text="Usuários"
                    number={200}
                    linkTo="/dashboard/usuarios"
                />
                <AdminInfo
                    Icon={ImBook}
                    text="Usuários"
                    number={200}
                    linkTo="/dashboard/usuarios"
                />
            </div>
            <div className="adm__firstRow">
                <div className="adm__gd-ponto">
                    <Card>
                        <MarcarPonto colaboradorId={currentLoggedUserId} />
                    </Card>
                </div>

                <div className="adm__ls-row">
                    <div className="adm__gg-users">
                        <Card>
                            <h3>Últimos Usuários</h3>
                            <p>Table Aqui</p>

                            <Link to="/dashboard/usuarios" className="bt">
                                + Cadastrar
                            </Link>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AdminRender;
