import React, { useContext, useEffect, useState } from "react";
import "./styles.scss";
import Card from "../Card";
import { Link } from "react-router-dom";
import MarcarPonto from "../MarcarPonto";
import MainContext from "../../Contexts/MainContext";
import AdminInfo from "../AdminInfo";
import DataTable from "react-data-table-component";
import { ColumsTableUser } from "../../Services/TableColumns";
import { showToast } from "../../Functions";
import api from "../../Services/api";
import {
    ALL_COLABORADORES,
    ALL_EXPEDIENTE,
    ALL_FUNCAO,
    ALL_HORARIOS,
    ALL_SETOR,
} from "../../Services/Endpoints";
import Lottie from "react-lottie";
import {
    FaClipboardCheck,
    FaUserAlt,
    FaUserClock,
    FaHammer,
} from "react-icons/fa";
import { MdWork } from "react-icons/md";

const LOADING = require("../../Assets/animations/loading.json");

interface GestorRenderProps {}

const GestorRender: React.FC<GestorRenderProps> = () => {
    const { currentLoggedUserId, token } = useContext(MainContext);

    const [isLoadingAllUsuarios, setIsLoadingAllUsuarios] = useState(false);

    // Gestor total de Cadastros
    const [allUsuarios, setAllUsuarios] = useState<any[]>([]);
    const [allExpedientes, setAllExpedientes] = useState<any[]>([]);
    const [allFuncoes, setAllFuncoes] = useState<any[]>([]);
    const [allSetores, setAllSetores] = useState<any[]>([]);
    const [allHorarios, setAllHorarios] = useState<any[]>([]);

    useEffect(() => {
        getTodosUsuarios();
        getTodosExpedientes();
        getTodasFuncoes();
        getTodosSetores();
        getTodosHorarios();
    }, []);

    const getTodosUsuarios = async () => {
        setIsLoadingAllUsuarios(true);
        await api
            .get(ALL_COLABORADORES, { headers: { Authorization: token } })
            .then((resp) => {
                const { status, data } = resp;
                if (status === 200) {
                    setAllUsuarios(data);
                    setIsLoadingAllUsuarios(false);
                }
            })
            .catch((err) => {
                showToast("ERROR", err.message, {});
            });
    };

    const getTodosExpedientes = async () => {
        await api
            .get(ALL_EXPEDIENTE, { headers: { Authorization: token } })
            .then((resp) => {
                const { status, data } = resp;
                if (status === 200) {
                    setAllExpedientes(data);
                }
            })
            .catch((err) => {
                showToast("ERROR", err.message, {});
            });
    };

    const getTodasFuncoes = async () => {
        await api
            .get(ALL_FUNCAO, { headers: { Authorization: token } })
            .then((resp) => {
                const { status, data } = resp;
                if (status === 200) {
                    setAllFuncoes(data);
                }
            })
            .catch((err) => {
                showToast("ERROR", err.message, {});
            });
    };

    const getTodosSetores = async () => {
        await api
            .get(ALL_SETOR, { headers: { Authorization: token } })
            .then((resp) => {
                const { status, data } = resp;
                if (status === 200) {
                    setAllSetores(data);
                }
            })
            .catch((err) => {
                showToast("ERROR", err.message, {});
            });
    };

    const getTodosHorarios = async () => {
        await api
            .get(ALL_HORARIOS, { headers: { Authorization: token } })
            .then((resp) => {
                const { status, data } = resp;
                if (status === 200) {
                    setAllHorarios(data);
                }
            })
            .catch((err) => {
                showToast("ERROR", err.message, {});
            });
    };

    return (
        <div className="admnntad__rr">
            <div className="adm__info-wrapper">
                <AdminInfo
                    Icon={FaUserAlt}
                    text="Usuários"
                    number={allUsuarios.length}
                    linkTo="/dashboard/usuarios"
                />
                <AdminInfo
                    Icon={FaClipboardCheck}
                    text="Expedientes"
                    number={allExpedientes.length} 
                    linkTo="/dashboard/expedientes"
                />
                <AdminInfo
                    Icon={FaHammer}
                    text="Funções"
                    number={allFuncoes.length}
                    linkTo="/dashboard/funcoes"
                />
                <AdminInfo
                    Icon={MdWork}
                    text="Setores"
                    number={allSetores.length}
                    linkTo="/dashboard/setores"
                />
                <AdminInfo
                    Icon={FaUserClock}
                    text="Horários"
                    number={allHorarios.length}
                    linkTo="/dashboard/horarios"
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
                        <DataTable
                            striped={true}
                            title="Últimos usuários cadastrados"
                            data={allUsuarios
                                .slice(0, 4)
                                .map((c: any) =>
                                    c.ativo
                                        ? { ...c, ativo: "true" }
                                        : { ...c, ativo: "false" }
                                )}
                            progressPending={isLoadingAllUsuarios}
                            progressComponent={
                                <Lottie
                                    options={{
                                        loop: true,
                                        animationData: LOADING,
                                    }}
                                    height={125}
                                    width={125}
                                />
                            }
                            columns={ColumsTableUser}
                            responsive={true}
                        />

                        <Link to="/dashboard/usuarios" className="bt">
                            Ver todos usuários
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default GestorRender;
