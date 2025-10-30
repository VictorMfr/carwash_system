import { Dialog, IconButton, Tooltip } from "@mui/material";
import { Fragment, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { UIDisplayControlsContextType, useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import api from "@/lib/axios";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { handleApiError } from "@/lib/error";
import { DataGridContextType, useModuleDataGridContext } from "./context";

interface ActionModal {
    open: boolean;
    action: any;
}

const deleteHandler = (
    uiContext: UIDisplayControlsContextType,
    datagridCtx: DataGridContextType,
    params: GridRenderCellParams
) => {
    uiContext.setAlert({
        open: true,
        title: 'Borrar',
        message: '¿Estás seguro de querer borrar este item?',
        severity: 'warning',
        actions: [
            {
                label: 'Cancelar',
                onClick: () => uiContext.setAlert(prev => ({ ...prev, open: false }))
            },
            {
                label: 'Borrar',
                onClick: async () => {
                    try {
                        uiContext.setLoading(true);
                        await api.delete(`${datagridCtx.moduleSettings?.url}/${params.row.id}`);
                        datagridCtx.setFetchData((prev: any) => prev.filter((item: any) => item.id !== params.row.id));
                        uiContext.setAlert(prev => ({ ...prev, open: false }))
                        uiContext.setSnackbar({ open: true, message: 'Item borrado correctamente', severity: 'success' })

                    } catch (error) {
                        handleApiError(error, uiContext);
                    } finally {
                        uiContext.setLoading(false);
                    }
                }
            }
        ]
    });
}

const initialActionModal: ActionModal = {
    open: false,
    action: null
}

const RenderActions = ({ datagridCtx, params, setActionModal }: { datagridCtx: DataGridContextType, params: GridRenderCellParams, setActionModal: (actionModal: ActionModal) => void }) => {
    const actions = datagridCtx.moduleSettings?.actions?.data;
    if (!actions) return null;

    return (
        <Fragment>
            {actions.map((action) => {
                if (action.dispatchMode === 'link') {
                    return (
                        <Fragment key={action.name}>
                            <action.icon params={params} />
                        </Fragment>
                    )
                }

                return (
                    <Tooltip key={action.name} title={action.name}>
                        <IconButton onClick={() => setActionModal({ open: true, action: action })}>
                            <action.icon />
                        </IconButton>
                    </Tooltip>
                )
            })}
        </Fragment>
    )
}

export default function ModuleActions({
    params
}: {
    params: GridRenderCellParams
}) {
    const datagridCtx = useModuleDataGridContext();
    const uiContext = useUIDisplayControls();
    const [actionModal, setActionModal] = useState<ActionModal>(initialActionModal);


    const showEditModal = () => {
        datagridCtx.setModal({ open: true, type: 'edit', data: params.row });
    }

    const handleDelete = () => {
        deleteHandler(uiContext, datagridCtx, params);
    }


    const shouldShowEdit = datagridCtx.moduleSettings?.config?.edit;
    const shouldShowDelete = datagridCtx.moduleSettings?.config?.delete;

    return (
        <Fragment>
            {shouldShowEdit && (
                <Tooltip title="Editar">
                    <IconButton onClick={showEditModal}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            )}

            {shouldShowDelete && (
                <Tooltip title="Borrar">
                    <IconButton onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            )}

            <RenderActions
                datagridCtx={datagridCtx}
                params={params}
                setActionModal={setActionModal} 
            />

            <Dialog open={actionModal.open} onClose={() => setActionModal({ open: false, action: null })}>
                {actionModal.action?.dispatch && (
                    <actionModal.action.dispatch
                        setActionModal={setActionModal}
                        actionModal={actionModal}
                        params={params}
                    />
                )}
            </Dialog>
        </Fragment>
    )
}