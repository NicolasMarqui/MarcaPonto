import React, { useState, useEffect, useContext } from "react";
import "./styles.scss";
import "react-datepicker/dist/react-datepicker.css";
import HeaderInside from "../../../Components/HeaderInside";
import { GetAllLogs } from "../../../Services/ApiCalls";
import MainContext from "../../../Contexts/MainContext";
import EmptyData from "../../../Components/EmptyData";
import { ColumsTableLogs } from "../../../Services/TableColumns";
import DataTable from "react-data-table-component";
import Lottie from "react-lottie";

const Logs: React.FC = () => {
    const { currentLoggedUserId } = useContext(MainContext);
    const LOADING = require("../../../Assets/animations/loading.json");

    const [searchValue, setSearchValue] = useState("");
    const { dataAllLogs, statusCodeAllLogs } = GetAllLogs(currentLoggedUserId);

    useEffect(() => {
        document.title = "Marca Ponto - Logs";
    }, []);

    const handleChange = (e: any) => {
        setSearchValue(e.target.value);
        dataAllLogs.filter((l: any) => l.content.includes(e.target.value));
    };

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
                    <input
                        type="text"
                        placeholder="Pesquisar logs..."
                        onChange={(e) => handleChange(e)}
                    />
                    {/* <AiOutlineSearch size={10} color="#fff" /> */}
                </div>
                <div className="table__wrapper">
                    {statusCodeAllLogs === 200 ? (
                        <DataTable
                            noHeader={true}
                            data={
                                searchValue
                                    ? dataAllLogs.filter((l: any) =>
                                          l.content.includes(searchValue)
                                      )
                                    : dataAllLogs
                            }
                            columns={ColumsTableLogs}
                            noDataComponent={<EmptyData hasMargin={true} />}
                            striped={true}
                            pagination={true}
                            highlightOnHover={true}
                            paginationPerPage={30}
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
                </div>
            </div>
        </>
    );
};
export default Logs;
