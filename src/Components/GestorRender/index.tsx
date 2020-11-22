import React, { useContext } from "react";
import "./styles.scss";
import Card from "../Card";
import MarcarPonto from "../MarcarPonto";
import MainContext from "../../Contexts/MainContext";
import DataTable from "react-data-table-component";
import {
    ColumsTableLogs,
    ColumsTablePontos,
} from "../../Services/TableColumns";
import {
    getLogDate,
    getTodayDateConsulta,
    getTodayInfo,
} from "../../Functions";
import { GetAllLogs, GetAllPontos } from "../../Services/ApiCalls";
import EmptyData from "../EmptyData";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";

const LOADING = require("../../Assets/animations/loading.json");

interface GestorRenderProps {
    info: any;
}

const GestorRender: React.FC<GestorRenderProps> = ({ info }) => {
    const { currentLoggedUserId, token } = useContext(MainContext);
    const { dataAllPontos, statusCodeAllPontos } = GetAllPontos(token);
    const { dataAllLogs, statusCodeAllLogs } = GetAllLogs(info.colaboradorId);

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
            <div className="adm__grid--container">
                <div className="ponto">
                    <Card height="height-100p">
                        <MarcarPonto colaboradorId={currentLoggedUserId} />
                    </Card>
                </div>
                <div className="pontos_hoje">
                    <Card isFlex={false}>
                        {statusCodeAllPontos === 200 ? (
                            <DataTable
                                title="Pontos batidos hoje"
                                data={dataAllPontos.filter(
                                    (p: any) =>
                                        p.data === getTodayDateConsulta()
                                )}
                                columns={ColumsTablePontos}
                                striped={true}
                                pagination={false}
                                highlightOnHover={true}
                                noDataComponent={<EmptyData />}
                            />
                        ) : (
                            <Lottie
                                options={{
                                    loop: true,
                                    animationData: LOADING,
                                }}
                                height={200}
                                width={200}
                            />
                        )}
                    </Card>
                </div>
                <div className="logs">
                    <Card isFlex={false}>
                        {statusCodeAllLogs === 200 ? (
                            <DataTable
                                title="Logs"
                                data={dataAllLogs.slice(0, 5)}
                                columns={ColumsTableLogs}
                                striped={true}
                                pagination={false}
                                highlightOnHover={true}
                                noDataComponent={<EmptyData />}
                            />
                        ) : (
                            <Lottie
                                options={{
                                    loop: true,
                                    animationData: LOADING,
                                }}
                                height={200}
                                width={200}
                            />
                        )}
                        <Link to="/dashboard/logs" className="bt">
                            Todos os logs
                        </Link>
                    </Card>
                </div>
                <div className="grafico_users">
                    <Card>
                        <h3>Gráfico aqui</h3>
                    </Card>
                </div>
            </div>
        </div>
    );
};
export default GestorRender;
