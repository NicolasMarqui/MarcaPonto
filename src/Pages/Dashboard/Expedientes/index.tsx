import React, { useState, useEffect, useContext } from "react";
import "./styles.scss";
import Lottie from "react-lottie";
import "react-datepicker/dist/react-datepicker.css";
import DataTable from "react-data-table-component";
import ModalCrud from "../../../Components/ModalCrud";
import { ColumsTableExpediente } from "../../../Services/TableColumns";
import { GetAllExpediente } from "../../../Services/ApiCalls";
import MainContext from "../../../Contexts/MainContext";
import AddSelectedExpediente from "../../../Components/RenderSelectedRow/Expediente/AddSelectedExpediente";
import SelectedExpediente from "../../../Components/RenderSelectedRow/Expediente/SelectedExpediente";
import { AiFillCheckCircle } from "react-icons/ai";
import { FaTimesCircle } from "react-icons/fa";
import HeaderInside from "../../../Components/HeaderInside";
import { Link } from "react-router-dom";
import { BsDownload } from "react-icons/bs";
import EmptyData from "../../../Components/EmptyData";

const LOADING = require("../../../Assets/animations/loading.json");

const Expedientes: React.FC = () => {
    const {
        token,
        openMoreInfo,
        setOpenMoreInfo,
        hasCloseEditModal,
        addModalOpen,
        setaddModalOpen,
    } = useContext(MainContext);

    const [selectedExpediente, setSelectedExpediente] = useState({});
    const { dataAllExpedientes, statusCodeAllExpedientes } = GetAllExpediente(
        token,
        hasCloseEditModal
    );

    useEffect(() => {
        document.title = "Marca Ponto - Expedientes";
        setOpenMoreInfo(false);
    }, []);

    const closeModal = () => {
        setaddModalOpen(false);
        return true;
    };

    const closeModalMoreInfo = () => {
        setOpenMoreInfo(false);
        return true;
    };

    const showMoreInfo = async (dataFromRow: any) => {
        setOpenMoreInfo(true);
        setSelectedExpediente(dataFromRow);
    };

    return (
        <>
            <div className="usuarios__wrapper">
                <div className="usuarios__header">
                    <HeaderInside isHome={false} nome={"Expedientes"} />
                </div>
                <div className="page__title-info">
                    <div className="tinf__name">
                        <h2 className="tt-title title-blue title-bold">
                            Expedientes
                        </h2>
                        <p>
                            Você possui
                            <span> {dataAllExpedientes.length}</span>{" "}
                            expediente(s) cadastrado(s)
                        </p>
                    </div>
                    <div className="page__toReport">
                        <Link
                            to="/dashboard/relatorios?id=1"
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <BsDownload size={20} />
                        </Link>
                    </div>
                    <a
                        href="#new"
                        className="bt"
                        onClick={() => setaddModalOpen(true)}
                    >
                        + Novo Expediente
                    </a>
                </div>
                {statusCodeAllExpedientes === 200 ? (
                    <div className="table__wrapper">
                        <DataTable
                            noHeader={true}
                            data={dataAllExpedientes.map((c: any) =>
                                c.ativo
                                    ? {
                                          ...c,
                                          ativo: (
                                              <AiFillCheckCircle
                                                  color="green"
                                                  size={20}
                                                  values="true"
                                              />
                                          ),
                                      }
                                    : {
                                          ...c,
                                          ativo: (
                                              <FaTimesCircle
                                                  color="red"
                                                  size={20}
                                              />
                                          ),
                                      }
                            )}
                            columns={ColumsTableExpediente}
                            noDataComponent={<EmptyData hasMargin={true} />}
                            striped={true}
                            pagination={true}
                            onRowClicked={showMoreInfo}
                            pointerOnHover={true}
                            highlightOnHover={true}
                        />
                    </div>
                ) : (
                    <div className="animation__wrapper">
                        <Lottie
                            options={{
                                loop: true,
                                animationData: LOADING,
                            }}
                            height={150}
                            width={150}
                        />
                        <h2>
                            Estamos carregando seus dados
                            <span role="img" aria-label="Whoops">
                                🧐
                            </span>{" "}
                        </h2>
                    </div>
                )}
            </div>

            {addModalOpen && (
                <ModalCrud onClose={closeModal}>
                    <AddSelectedExpediente />
                </ModalCrud>
            )}

            {openMoreInfo && (
                <ModalCrud onClose={closeModalMoreInfo}>
                    {selectedExpediente ? (
                        <SelectedExpediente data={selectedExpediente} />
                    ) : (
                        ""
                    )}
                </ModalCrud>
            )}
        </>
    );
};
export default Expedientes;
