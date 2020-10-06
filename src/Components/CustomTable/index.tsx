import React from "react";
import "./styles.scss";

interface CustomTableProps {
    tableData: any;
    tableColumns: any;
    tableLayout?: string;
}

const CustomTable: React.FC<CustomTableProps> = ({
    tableData,
    tableColumns,
}) => {
    return (
        <table>
            <thead>
                <tr>
                    {tableColumns.map((col: any) => (
                        <td>{col.title}</td>
                    ))}
                </tr>
            </thead>
            <tbody>
                {tableData.map((row: any) => (
                    <tr>
                        <td>{row.nome}</td>
                        <td>{row.entrada}</td>
                        <td>{row.inicio_intervalo}</td>
                        <td>{row.retorno_intervalo}</td>
                        <td>{row.saida}</td>
                        <td>{row.data}</td>
                        <td>{row.observacoes}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CustomTable;
