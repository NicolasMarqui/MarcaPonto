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
import { getTodayDateConsulta, getTodayInfo } from "../../Functions";
import {
    GetAllColaboradores,
    GetAllExpediente,
    GetAllFuncoes,
    GetAllLogs,
    GetAllPontos,
    GetAllPontosAprovar,
    GetAllSetores,
} from "../../Services/ApiCalls";
import EmptyData from "../EmptyData";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";
import { PieChart, Pie, Sector, Cell } from "recharts";

const LOADING = require("../../Assets/animations/loading.json");

interface GestorRenderProps {
    info: any;
}

const GestorRender: React.FC<GestorRenderProps> = ({ info }) => {
    const { currentLoggedUserId, token } = useContext(MainContext);
    const { dataAllPontos, statusCodeAllPontos } = GetAllPontos(token);
    const { dataAllLogs, statusCodeAllLogs } = GetAllLogs(info.colaboradorId);
    const {
        dataAllPontosAprovar,
        statusCodeAllPontosAprovar,
    } = GetAllPontosAprovar(token, currentLoggedUserId, 0);

    // Data for chart
    const {
        statusCodeAllColaboradores,
        dataAllColaboradores,
    } = GetAllColaboradores(token);
    const { statusCodeAllExpedientes, dataAllExpedientes } = GetAllExpediente(
        token
    );
    const { statusCodeAllFuncoes, dataAllFuncoes } = GetAllFuncoes(token);
    const { statusCodeAllSetores, dataAllSetores } = GetAllSetores(token);

    const chartData = [
        { name: "Usuários", value: dataAllColaboradores.length },
        { name: "Expedientes", value: dataAllExpedientes.length },
        { name: "Funções", value: dataAllFuncoes.length },
        { name: "Setores", value: dataAllSetores.length },
    ];

    const chartColors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index,
    }: any) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

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
                        <div className="header__title">
                            <h3 className="tt-sub title-blue title-bold">
                                Pontos batidos hoje
                            </h3>
                        </div>
                        {statusCodeAllPontos === 200 ? (
                            <DataTable
                                noHeader={true}
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
                        <div className="home__header">
                            <div className="header__title">
                                <h3 className="tt-sub title-blue title-bold">
                                    Logs
                                </h3>
                                <p>Seus logs de atividades</p>
                            </div>
                            <div className="header__more">
                                <Link to="/dashboard/logs">Todos os logs</Link>
                            </div>
                        </div>
                        {statusCodeAllLogs === 200 ? (
                            <DataTable
                                noHeader={true}
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
                    </Card>
                </div>
                <div className="pontos_aprovar">
                    <Card>
                        <div className="home__header">
                            <div className="header__title">
                                <h3 className="tt-sub title-blue title-bold">
                                    Pontos para aprovar
                                </h3>
                            </div>
                            <div className="header__more">
                                <Link to="/dashboard/pontos?id=1">Todos</Link>
                            </div>
                        </div>
                        {statusCodeAllPontosAprovar === 200 ? (
                            <DataTable
                                noHeader={true}
                                data={dataAllPontosAprovar}
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
                <div className="grafico_users">
                    <Card>
                        <div className="home__header">
                            <div className="header__title">
                                <h3 className="tt-sub title-blue title-bold">
                                    Gráfico
                                </h3>
                                <p>Gráfico de usuários</p>
                            </div>
                        </div>
                        <div className="graph__wrapper">
                            {statusCodeAllColaboradores === 200 &&
                            statusCodeAllExpedientes === 200 &&
                            statusCodeAllFuncoes === 200 &&
                            statusCodeAllSetores === 200 ? (
                                <PieChart width={300} height={300}>
                                    <Pie
                                        data={chartData}
                                        cx={200}
                                        cy={200}
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {chartData.map(
                                            (entry: any, index: any) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={
                                                        chartColors[
                                                            index %
                                                                chartColors.length
                                                        ]
                                                    }
                                                />
                                            )
                                        )}
                                    </Pie>
                                </PieChart>
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
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
export default GestorRender;
