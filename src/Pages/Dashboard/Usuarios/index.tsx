import React, { useState, useEffect, useContext } from "react";
import "./styles.scss";
import Lottie from "react-lottie";
import "react-datepicker/dist/react-datepicker.css";
import DataTable from "react-data-table-component";
import ModalCrud from "../../../Components/ModalCrud";
import { ColumsTableUser } from "../../../Services/TableColumns";
import { GetAllColaboradores } from "../../../Services/ApiCalls";
import MainContext from "../../../Contexts/MainContext";
import SelectedColaborador from "../../../Components/RenderSelectedRow/SelectedColaborador";
import AddSelectedColaborador from "../../../Components/RenderSelectedRow/AddSelectedColaborador";
import { AiFillCheckCircle } from "react-icons/ai";
import { FaTimesCircle } from "react-icons/fa";
import HeaderInside from "../../../Components/HeaderInside";
import EmptyData from "../../../Components/EmptyData";

const LOADING = require("../../../Assets/animations/loading.json");

const Usuarios: React.FC = () => {
    const {
        token,
        openMoreInfo,
        setOpenMoreInfo,
        hasCloseEditModal,
        addModalOpen,
        setaddModalOpen,
    } = useContext(MainContext);

    const [isLoading, setIsLoading] = useState(false);
    const [allColaboradores, setAllColaboradores] = useState([]);
    const [selectedColaborador, setSelectedColaborador] = useState({});
    const {
        dataAllColaboradores,
        statusCodeAllColaboradores,
    } = GetAllColaboradores(token, hasCloseEditModal);

    useEffect(() => {
        document.title = "Marca Ponto - Usuários";
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

    // const handleRowChange = (state: any) => {
    //     console.log("Selected Rows: ", state.selectedRows);
    // };

    const showMoreInfo = async (dataFromRow: any) => {
        setOpenMoreInfo(true);
        setSelectedColaborador(dataFromRow);
    };

    return (
        <>
            <div className="usuarios__wrapper">
                <div className="usuarios__header">
                    <HeaderInside isHome={false} nome={"Usuários"} />
                </div>
                <div className="page__title-info">
                    <div className="tinf__name">
                        <h2 className="tt-title title-blue title-bold">
                            Usuários
                        </h2>
                        <p>
                            Você possui{" "}
                            <span>{dataAllColaboradores.length}</span>{" "}
                            usuário(s) cadastrados
                        </p>
                    </div>
                    <a
                        href="#new"
                        className="bt"
                        onClick={() => setaddModalOpen(true)}
                    >
                        + Novo Usuário
                    </a>
                </div>
                {!isLoading ? (
                    <div className="table__wrapper">
                        <DataTable
                            noHeader={true}
                            data={dataAllColaboradores.map((c: any) =>
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
                            columns={ColumsTableUser}
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
                    <AddSelectedColaborador />
                </ModalCrud>
            )}

            {openMoreInfo && (
                <ModalCrud onClose={closeModalMoreInfo}>
                    {selectedColaborador ? (
                        <SelectedColaborador data={selectedColaborador} />
                    ) : (
                        ""
                    )}
                </ModalCrud>
            )}
        </>
    );
};
export default Usuarios;
