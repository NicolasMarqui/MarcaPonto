import React, { useState, useEffect, useContext } from "react";
import "./styles.scss";
import Lottie from "react-lottie";
import "react-datepicker/dist/react-datepicker.css";
import DataTable from "react-data-table-component";
import ModalCrud from "../../../Components/ModalCrud";
import { ColumsTableFuncoes } from "../../../Services/TableColumns";
import { GetAllFuncoes, getAllFuncoes } from "../../../Services/ApiCalls";
import MainContext from "../../../Contexts/MainContext";
import AddSelectedFuncao from "../../../Components/RenderSelectedRow/Funcoes/AddSelectedFuncao";
import SelectedFuncao from "../../../Components/RenderSelectedRow/Funcoes/SelectedFuncao";
import { AiFillCheckCircle } from "react-icons/ai";
import { FaTimesCircle } from "react-icons/fa";
import HeaderInside from "../../../Components/HeaderInside";
import { BsDownload } from "react-icons/bs";
import { Link } from "react-router-dom";

const LOADING = require("../../../Assets/animations/loading.json");

const Funcao: React.FC = () => {
    const {
        token,
        openMoreInfo,
        setOpenMoreInfo,
        hasCloseEditModal,
        addModalOpen,
        setaddModalOpen,
    } = useContext(MainContext);

    const [selectedFuncao, setSelectedFuncao] = useState({});
    const { dataAllFuncoes, statusCodeAllFuncoes } = GetAllFuncoes(
        token,
        hasCloseEditModal
    );

    useEffect(() => {
        document.title = "Marca Ponto - Funções";
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
        setSelectedFuncao(dataFromRow);
    };

    return (
        <>
            <div className="usuarios__wrapper">
                <div className="usuarios__header">
                    <HeaderInside isHome={false} nome={"Funções"} />
                </div>
                <div className="page__title-info">
                    <div className="tinf__name">
                        <h2 className="tt-title title-blue title-bold">
                            Funções
                        </h2>
                        <p>
                            Você possui
                            <span> {dataAllFuncoes.length}</span>{" "}
                            {dataAllFuncoes.length > 1 ? "Funções " : "Função "}
                            cadastrada(s)
                        </p>
                    </div>
                    <div className="page__toReport">
                        <Link
                            to="/dashboard/relatorios?id=3"
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
                        + Nova Função
                    </a>
                </div>
                {statusCodeAllFuncoes === 200 ? (
                    <div className="table__wrapper">
                        <DataTable
                            noHeader={true}
                            data={dataAllFuncoes.map((c: any) =>
                                c.responsavel
                                    ? {
                                          ...c,
                                          responsavel: (
                                              <AiFillCheckCircle
                                                  color="green"
                                                  size={20}
                                                  values="true"
                                              />
                                          ),
                                      }
                                    : {
                                          ...c,
                                          responsavel: (
                                              <FaTimesCircle
                                                  color="red"
                                                  size={20}
                                              />
                                          ),
                                      }
                            )}
                            columns={ColumsTableFuncoes}
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
                    <AddSelectedFuncao />
                </ModalCrud>
            )}

            {openMoreInfo && (
                <ModalCrud onClose={closeModalMoreInfo}>
                    {selectedFuncao ? (
                        <SelectedFuncao data={selectedFuncao} />
                    ) : (
                        ""
                    )}
                </ModalCrud>
            )}
        </>
    );
};
export default Funcao;
