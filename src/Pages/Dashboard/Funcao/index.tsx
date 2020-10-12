import React, { useState, useEffect, useContext } from "react";
import "./styles.scss";
import Lottie from "react-lottie";
import "react-datepicker/dist/react-datepicker.css";
import DataTable from "react-data-table-component";
import ModalCrud from "../../../Components/ModalCrud";
import { ColumsTableFuncoes } from "../../../Services/TableColumns";
import { getAllFuncoes } from "../../../Services/ApiCalls";
import MainContext from "../../../Contexts/MainContext";
import AddSelectedExpediente from "../../../Components/RenderSelectedRow/Expediente/AddSelectedExpediente";
import SelectedExpediente from "../../../Components/RenderSelectedRow/Expediente/SelectedExpediente";
import AddSelectedFuncao from "../../../Components/RenderSelectedRow/Funcoes/AddSelectedFuncao";
import SelectedFuncao from "../../../Components/RenderSelectedRow/Funcoes/SelectedFuncao";

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

    const [isLoading, setIsLoading] = useState(false);
    const [allFuncoes, setallFuncoes] = useState([]);
    const [selectedFuncao, setSelectedFuncao] = useState({});

    useEffect(() => {
        document.title = "Marca Ponto - Funções";
        setOpenMoreInfo(false);
        getAllE();
    }, []);

    useEffect(() => {
        getAllE();
    }, [hasCloseEditModal]);

    const getAllE = async () => {
        setIsLoading(true);

        const response = await getAllFuncoes(token);

        if (response) {
            const { status, data } = response;

            if (status === 200 && data.length > 0) {
                setallFuncoes(data);
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
        setSelectedFuncao(dataFromRow);
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
                                + Nova Função
                            </a>
                        </div>
                        <DataTable
                            title="Todas as Funcões"
                            data={allFuncoes.map((c: any) =>
                                c.responsavel
                                    ? { ...c, responsavel: "true" }
                                    : { ...c, responsavel: "false" }
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
