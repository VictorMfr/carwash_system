import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import ModuleAutoComplete from "../ModuleAutocomplete/ModuleAutoComplete";
import { AutocompleteModule } from "@/types/autocomplete/autocomplete";
import withUIDisplayControls from "@/HOC/withUIDisplayControls";
import { useEffect, useState } from "react";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { handleApiError } from "@/lib/error";
import api from "@/lib/axios";
import { GridRenderCellParams } from "@mui/x-data-grid";

const moduleSettings: AutocompleteModule = {
    url: '/api/stock/state',
    confirm: {
        title: 'Agregar estado',
        message: '¿Estás seguro de querer agregar este estado?',
        successMessage: 'Estado agregado correctamente',
    },
    label: 'Estado',
    labelField: 'name',
    newItemLabel: 'Agregar estado',
    loadingType: 'screen',
}

const StateModal = ({
    setActionModal,
    actionModal,
    params,
    setData
}: {
    setActionModal: (actionModal: { open: boolean, action: any, data: any }) => void,
    actionModal: { open: boolean, action: any, data: any }
    params: GridRenderCellParams
    setData: (data: any) => void
}) => {

    const [value, setValue] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const uiContext = useUIDisplayControls();

    const handleClose = () => {
        setActionModal({ open: false, action: null, data: null });
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('state_id', value.id);
            await api.put(`/api/stock/${params.row.stockId}/details/${params.row.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            uiContext.setSnackbar({ open: true, message: 'Estado del producto cambiado correctamente', severity: 'success' });
            setData((prev: any) => prev.map((item: any) => item.id === params.row.id ? {
                ...item,
                stateId: value.id,
                state: value.name
            } : item));
            handleClose();
        } catch (error) {
            handleApiError(error, uiContext);
        } finally {
            setLoading(false);
        }
        setActionModal({ open: false, action: 'add', data: value });
    }

    return (
        <Dialog
            open={actionModal.open}
            onClose={handleClose}
        >
            <DialogTitle>Estado del producto</DialogTitle>
            <DialogContent>
                <Stack spacing={2} paddingTop={1} paddingBottom={1}>
                    <ModuleAutoComplete autoCompleteSettings={moduleSettings} onChange={setValue} />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                >
                    Cancelar
                </Button>
                <Button
                    onClick={handleSubmit}
                    loading={loading}
                    disabled={loading || !value}
                >
                    Cambiar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default withUIDisplayControls(StateModal);