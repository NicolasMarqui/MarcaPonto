import React, { useEffect } from "react";
import MaterialTable from "material-table";

interface CustomTableProps {
    tableTitle: string;
    tableData: any;
    tableColumns: any;
    exportData?: boolean;
    filter?: boolean;
    searchData?: boolean;
}

const CustomTable: React.FC<CustomTableProps> = ({
    tableTitle,
    tableData,
    tableColumns,
    exportData = false,
    filter = false,
    searchData = false,
}) => {
    return (
        <MaterialTable
            title={tableTitle}
            data={tableData}
            columns={tableColumns}
            options={{
                exportButton: exportData,
                filtering: filter,
                search: searchData,
            }}
        />
    );
};

export default CustomTable;
