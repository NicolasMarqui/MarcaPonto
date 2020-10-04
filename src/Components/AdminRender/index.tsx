import React, { useContext } from "react";
import "./styles.scss";
import Card from "../Card";
import { Link } from "react-router-dom";
import MarcarPonto from "../MarcarPonto";
import { ImBook } from "react-icons/im";
import MainContext from "../../Contexts/MainContext";
import AdminInfo from "../AdminInfo";
import CustomTable from "../CustomTable";
import { LatestPointsColums, LatestPointsData } from "../../Services/MockData";

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
                    <Card height="height-100p">
                        <MarcarPonto colaboradorId={currentLoggedUserId} />
                    </Card>
                </div>

                <div className="adm__ls-row">
                    <div className="adm__gg-users">
                        <Card height="height-100p">
                            <p>Usuários</p>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AdminRender;
