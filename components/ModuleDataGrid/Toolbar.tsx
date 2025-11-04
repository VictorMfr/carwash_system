import { Tooltip } from "@mui/material";
import QuickFilterSearch from "../Toolbar/Search";
import { ColumnsPanelTrigger, ToolbarButton, ExportCsv, ExportPrint, FilterPanelTrigger, GridViewColumnIcon, Toolbar, GridRowSelectionModel, ToolbarProps } from "@mui/x-data-grid";
import { FileDownload, Print, FilterList, DensityMedium, Add, Delete } from "@mui/icons-material";
import { UIDisplayControlsContextType, useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import api from "@/lib/axios";
import { ModuleFormGridData, ToolbarItem } from "../../types/datagrid/datagrid";
import { useModuleDataGridContext } from "./context";

const shouldShowToolbarItem = (item: ToolbarItem, moduleSettings: ModuleFormGridData) => {
    const settings = moduleSettings;
    if (!settings.config) return false;
    if (!settings.config.toolbar?.show) return false;
    return !settings.config.toolbar || settings.config.toolbar.show.includes(item);
};

const shouldDeleteDisabled = (rowSelected: GridRowSelectionModel | undefined, data: any[]) => {
    return (
        !rowSelected ||
        rowSelected.type == 'include' && rowSelected.ids.size === 0 ||
        rowSelected.type == 'exclude' && rowSelected.ids.size === data.length
    );
};

const bulkDelete = (
    uiContext: UIDisplayControlsContextType,
    moduleSettings: ModuleFormGridData,
    rowSelected: GridRowSelectionModel | undefined,
    setData: (data: any) => void
) => {
    if (!rowSelected) return;
    uiContext.setAlert({
        open: true,
        title: 'Delete Many Items',
        message: 'Are you sure you want to delete these items?',
        severity: 'warning',
        actions: [
            {
                label: 'Cancel',
                onClick: () => uiContext.setAlert(prev => ({ ...prev, open: false }))
            },
            {
                label: 'Delete',
                onClick: async () => {
                    try {
                        uiContext.setLoading(true);
                        const response = await api.delete(moduleSettings.url, {
                            data: {
                                ids: Array.from(rowSelected?.ids ?? [])
                            }
                        });

                        uiContext.setAlert(prev => ({ ...prev, open: false }));
                        uiContext.setSnackbar(prev => ({ ...prev, open: true, message: response.data.message }));
                        setData((prev: any) => prev.filter((item: any) => !rowSelected?.ids.has(item.id)));
                    } catch (error) {
                        console.log(error);
                    } finally {
                        uiContext.setLoading(false);
                    }
                }
            }
        ]
    });
}

export default function ModuleToolbar({
    rowSelected,
}: {
    rowSelected?: GridRowSelectionModel,
}) {
    const uiContext = useUIDisplayControls();
    const datagridCtx = useModuleDataGridContext();

    const showAddModal = () => {
        datagridCtx.setModal({ open: true, type: 'add', data: null });
    }

    const handleBulkDelete = () => {
        bulkDelete(
            uiContext,
            datagridCtx.moduleSettings,
            rowSelected,
            datagridCtx.setFetchData
        );
    }

    return (
        <Toolbar>
            {shouldShowToolbarItem('quickFilter', datagridCtx.moduleSettings) && (
                <Tooltip title="Quick Filter">
                    <QuickFilterSearch />
                </Tooltip>
            )}
            {shouldShowToolbarItem('columns', datagridCtx.moduleSettings) && (
                <Tooltip title="Columnas">
                    <ColumnsPanelTrigger render={<ToolbarButton />}>
                        <GridViewColumnIcon fontSize="small" />
                    </ColumnsPanelTrigger>
                </Tooltip>
            )}
            {shouldShowToolbarItem('export', datagridCtx.moduleSettings) && (
                <Tooltip title="Descargar como CSV">
                    <ExportCsv 
                    options={{
                        fileName: datagridCtx.moduleSettings.label ?? 'Reporte',
                    }}
                    render={<ToolbarButton />}
                    >
                        <FileDownload fontSize="small" />
                    </ExportCsv>
                </Tooltip>
            )}
            {shouldShowToolbarItem('export', datagridCtx.moduleSettings) && (
                <Tooltip title="Imprimir">
                    <ExportPrint
                        options={{
                            hideFooter: true,
                            hideToolbar: true,
                            fields: datagridCtx.moduleSettings.columns.data?.map((col: any) => col.field) || [],
                            fileName: datagridCtx.moduleSettings.label ?? 'Reporte',
                            includeCheckboxes: false,
                            pageStyle: 'A4',
                        }}
                        render={<ToolbarButton />}
                    >
                        <Print fontSize="small" />
                    </ExportPrint>
                </Tooltip>
            )}
            {shouldShowToolbarItem('filter', datagridCtx.moduleSettings) && (
                <Tooltip title="Filtrar">
                    <FilterPanelTrigger render={<ToolbarButton />}>
                        <FilterList fontSize="small" />
                    </FilterPanelTrigger>
                </Tooltip>
            )}
            {shouldShowToolbarItem('density', datagridCtx.moduleSettings) && (
                <Tooltip title="Densidad">
                    <ToolbarButton>
                        <DensityMedium sx={{ fontSize: 20 }} />
                    </ToolbarButton>
                </Tooltip>
            )}
            {shouldShowToolbarItem('add', datagridCtx.moduleSettings) && (
                <Tooltip title="Agregar">
                    <ToolbarButton onClick={showAddModal}>
                        <Add fontSize="small" />
                    </ToolbarButton>
                </Tooltip>
            )}
            {shouldShowToolbarItem('delete', datagridCtx.moduleSettings) && (
                <Tooltip title="Eliminar">
                    <span>
                        <ToolbarButton
                            disabled={shouldDeleteDisabled(rowSelected, datagridCtx.fetchData)}
                            onClick={handleBulkDelete}
                        >
                            <Delete fontSize="small" />
                        </ToolbarButton>
                    </span>
                </Tooltip>
            )}
            {datagridCtx.moduleSettings.config?.toolbar?.data?.map((item) => (
                <Tooltip title={item.name} key={item.name}>
                    <ToolbarButton>
                        <item.icon fontSize="small" />
                    </ToolbarButton>
                </Tooltip>
            ))}
        </Toolbar>
    )
}