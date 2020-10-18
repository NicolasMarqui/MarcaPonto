import React, { useState, useEffect, useContext } from "react";
import "./styles.scss";
import Lottie from "react-lottie";
import "react-datepicker/dist/react-datepicker.css";
import DataTable from "react-data-table-component";
import ModalCrud from "../../../Components/ModalCrud";
import { ColumsTableExpediente } from "../../../Services/TableColumns";
import { getAllExpediente } from "../../../Services/ApiCalls";
import MainContext from "../../../Contexts/MainContext";
import AddSelectedExpediente from "../../../Components/RenderSelectedRow/Expediente/AddSelectedExpediente";
import SelectedExpediente from "../../../Components/RenderSelectedRow/Expediente/SelectedExpediente";
import { AiFillCheckCircle } from "react-icons/ai";
import { FaTimesCircle } from "react-icons/fa";

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

    const [isLoading, setIsLoading] = useState(false);
    const [allExpedientes, setAllExpedientes] = useState([]);
    const [selectedExpediente, setSelectedExpediente] = useState({});

    useEffect(() => {
        document.title = "Marca Ponto - Expedientes";
        setOpenMoreInfo(false);
        getAllE();
    }, []);

    useEffect(() => {
        getAllE();
    }, [hasCloseEditModal]);

    const getAllE = async () => {
        setIsLoading(true);
        const response = await getAllExpediente(token);

        if (response) {
            const { status, data } = response;

            if (status === 200 && data.length > 0) {
                setAllExpedientes(data);
                setIsLoading(false);
            }
        }
    };

    const closeModal = () => {
        setaddModalOpen(false);
        return true;
    };

    const closeModalMoreInfo = () => {
        setOpenMoreInfo(false);
        return true;
    };

    // const handleRowChange = (state: any) => {
    //     console.log("Selected Rows: ", state.selectedRows);
    // };

    const showMoreInfo = async (dataFromRow: any) => {
        setOpenMoreInfo(true);
        setSelectedExpediente(dataFromRow);
    };

    return (
        <>
            <div className="usuarios__wrapper">
                {!isLoading ? (
                    <div className="table__wrapper">
                        <div className="usuarios__header">
                            <a
                                href="#new"
                                className="bt"
                                onClick={() => setaddModalOpen(true)}
                            >
                                + Novo Expediente
                            </a>
                        </div>
                        <DataTable
                            title="Todos os Expedientes"
                            data={allExpedientes.map((c: any) =>
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
