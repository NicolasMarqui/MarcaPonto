import React, { useState, useEffect, useContext } from "react";
import "./styles.scss";
import "react-datepicker/dist/react-datepicker.css";
import HeaderInside from "../../../Components/HeaderInside";
import { GetAllLogs } from "../../../Services/ApiCalls";
import MainContext from "../../../Contexts/MainContext";
import EmptyData from "../../../Components/EmptyData";
import { ColumsTableLogs } from "../../../Services/TableColumns";
import DataTable from "react-data-table-component";

const Logs: React.FC = () => {
    const { currentLoggedUserId } = useContext(MainContext);

    const { dataAllLogs, statusCodeAllLogs } = GetAllLogs(currentLoggedUserId);

    useEffect(() => {
        document.title = "Marca Ponto - Logs";
    }, []);

    return (
        <>
            <div className="usuarios__wrapper">
                <div className="usuarios__header">
                    <HeaderInside isHome={false} nome={"Logs"} />
                </div>
                <div className="page__title-info">
                    <div className="tinf__name">
                        <h2 className="tt-title title-blue title-bold">
                            Logs de Atividades
                        </h2>
                        <p>
                            Você possui <span>{dataAllLogs.length}</span>{" "}
                            logs(s).
                        </p>
                    </div>
                </div>
                <div className="page__search--logs">
                    <input type="text" placeholder="Pesquisar logs..." />
                    {/* <AiOutlineSearch size={10} color="#fff" /> */}
                </div>
                <div className="table__wrapper">
                    {statusCodeAllLogs === 200 ? (
                        <DataTable
                            noHeader={true}
                            data={dataAllLogs.reverse()}
                            columns={ColumsTableLogs}
                            noDataComponent={<EmptyData hasMargin={true} />}
                            striped={true}
                            pagination={true}
                            highlightOnHover={true}
                        />
                    ) : (
                        <p>Loading</p>
                    )}
                </div>
            </div>
        </>
    );
};
export default Logs;
