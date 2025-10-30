'use client';

import React from "react";
import useFetch from "@/hooks/fetch/useFetch";
import { ModuleFormGridData } from "@/types/datagrid/datagrid";
import withUIDisplayControls from "@/HOC/withUIDisplayControls";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";

const tableData: ModuleFormGridData = {
    url: '/api/maintenance/tools',
    columns: {
        config: {
            gridSpacing: 2
        },
        data: [
            {
                field: 'picture',
                headerName: 'Imagen',
                inputConfig: {
                    id: 'picture',
                    size: 12,
                    picture: {
                        
                    }
                }
            },
            {
                field: 'name',
                headerName: 'Nombre',
                inputConfig: {
                    size: 12
                }
            },
            {
                field: 'brand',
                headerName: 'Marca',
                inputConfig: {
                    size: 12
                }
            },
            {
                field: 'state',
                headerName: 'Estado',
                inputConfig: {
                    size: 12
                }
            },
            {
                field: 'price',
                headerName: 'Precio',
                inputConfig: {
                    size: 12
                }
            },
            {
                field: 'entry_date',
                headerName: 'Fecha de Ingreso',
                inputConfig: {
                    size: 12
                }
            }
        ]
    }
}

const ModuleTable = () => {

    const { data, loading } = useFetch(tableData.url);

    const actionColumn: DatagridColumn = {
        field: 'actions',
        headerName: moduleSettings.actions?.config.headerName,
        width: moduleSettings.actions?.config.width,
        renderCell: (params: GridRenderCellParams) => (
            <ModuleActions
                params={params}
                moduleSettings={moduleSettings}
                modalSettings={modal}
                setModalSettings={setModal}
                setData={setData}
            />
        ),
        inputConfig: { dataGridHidden: false, size: 12 }
    };

    return (
        <DataGrid
            columns={tableData.columns.data}
            rows={data}
            loading={loading}
        />
    )
}

export default withUIDisplayControls(ModuleTable);