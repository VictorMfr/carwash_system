import { DataGrid as MuiDataGrid, GridColDef, GridRenderCellParams, GridRowSelectionModel, GridSlotsComponent } from "@mui/x-data-grid";
import { Stack, Typography } from "@mui/material";
import ModuleToolbar from "./Toolbar";
import ModuleActions from "./Actions";
import { useState } from "react";
import ModuleDataGridModal from "./Modal/Modal";
import withUIDisplayControls from "@/HOC/withUIDisplayControls";
import { ColumnData, ModuleFormGridData } from "../../types/datagrid/datagrid";
import { useModuleDataGridContext } from "./context";

const shouldDisplayActions = (moduleSettings: ModuleFormGridData) => {
    return (
        moduleSettings.actions ||
        moduleSettings.config?.edit ||
        moduleSettings.config?.delete
    )
}

const filterColumns = (columns: ColumnData[], moduleSettings: ModuleFormGridData) => {
    return columns.filter(column => column && !column.inputConfig?.dataGridHidden);
}

const getColumns = (moduleSettings: ModuleFormGridData, actionColumn: ColumnData) => {
    if (!moduleSettings.columns) return [];
    if (moduleSettings.columns.stepper) {
        const columns: ColumnData[] = [...(moduleSettings.columns.stepper.steps.map(step => step.data).flat() as ColumnData[])];
        const filteredColumns = filterColumns(columns, moduleSettings);
        if (shouldDisplayActions(moduleSettings)) {
            filteredColumns.push(actionColumn);
        }
        return filteredColumns;
    }

    const columns: ColumnData[] = [...(moduleSettings.columns.data || []) as ColumnData[]];
    const filteredColumns = filterColumns(columns, moduleSettings);

    if (shouldDisplayActions(moduleSettings)) {
        filteredColumns.push(actionColumn);
    }

    return filteredColumns;
}

const DataGrid = () => {
    const datagridCtx = useModuleDataGridContext();
    const [rowSelected, setRowSelected] = useState<GridRowSelectionModel>();

    const actionHeaderName = datagridCtx.moduleSettings.actions?.config.headerName ?? '';
    const actionWidth = datagridCtx.moduleSettings.actions?.config.width ?? 150;
    const actionInputConfig = { dataGridHidden: false, size: 12 };
    const Icon = datagridCtx.moduleSettings.icon;
    const label = datagridCtx.moduleSettings.label;
    const description = datagridCtx.moduleSettings.description;
    const rowHeight = datagridCtx.moduleSettings.config?.rowHeight ?? 50;
    
    const styles = { height: '100%' };

    const slots: Partial<GridSlotsComponent> | undefined = {
        toolbar: () => <ModuleToolbar rowSelected={rowSelected} />,
    };

    const localeText = {
        noRowsLabel: 'No hay datos',
        paginationRowsPerPage: 'Filas por página',
    };

    const checkboxSelection = (
        !datagridCtx.moduleSettings.config?.inputConfig || 
        datagridCtx.moduleSettings.config?.inputConfig?.allowCheckboxSelection
    );

    const renderActionCell = (params: GridRenderCellParams) => (
        <ModuleActions params={params} />
    );

    const actionColumn: ColumnData = {
        field: 'actions',
        headerName: actionHeaderName,
        width: actionWidth,
        renderCell: renderActionCell,
        inputConfig: {
            id: 'actions',
            ...actionInputConfig
        }
    };

    const dataGridColumns: GridColDef[] = getColumns(datagridCtx.moduleSettings, actionColumn)
    
    const changeRowHandler = (newSelectionModel: GridRowSelectionModel) => {
        setRowSelected(newSelectionModel);
    }

    return (
        <Stack sx={{ height: '100%' }} spacing={2}>
            <Stack direction="row" alignItems="center" spacing={2}>
                {Icon && <Icon color="action" />}
                <Stack>
                    {label && <Typography variant="h5">{label}</Typography>}
                    {description && <Typography variant="body1">{description}</Typography>}
                </Stack>
            </Stack>
            <MuiDataGrid
                sx={styles}
                loading={datagridCtx.fetchLoading}
                columns={dataGridColumns}
                rows={datagridCtx.fetchData}
                rowHeight={rowHeight}
                slots={slots}
                localeText={localeText}
                showToolbar
                checkboxSelection={checkboxSelection}
                rowSelectionModel={rowSelected}
                onRowSelectionModelChange={changeRowHandler}
                disableRowSelectionOnClick
                {...(datagridCtx.moduleSettings.config?.append || {})}
            />
            <ModuleDataGridModal />
        </Stack>
    )
}

export default withUIDisplayControls(DataGrid);