import { UserContextType } from "../ContextProvider";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import api from "@/lib/axios";
import { handleApiError } from "@/lib/error";

export default function useUserActionsController(context: UserContextType, params: GridRenderCellParams) {
    const uiContext = useUIDisplayControls();

    const updateHandler = () => {
        context.setModal({ open: true, type: 'edit', user: params.row });
    }

    const deleteHandler = () => {
        uiContext.setAlert({
            open: true,
            title: 'Delete User',
            message: 'Are you sure you want to delete this user?',
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

                            await api.delete(`/api/user/${params.row.id}`);
                            
                            context.setUsers(context.users.filter((user: any) => user.id !== params.row.id));
                            uiContext.setAlert(prev => ({ ...prev, open: false }))
                            uiContext.setSnackbar({ open: true, message: 'User deleted successfully', severity: 'success' })
                        } catch (error) {
                            handleApiError(error, uiContext);
                        } finally {
                            uiContext.setLoading(false);
                        }
                    }
                }
            ]
        })
    }

    const assignRoleHandler = () => {
        context.setModal({ open: true, type: 'assignRole', user: params.row });
    }

    return {
        updateHandler,
        deleteHandler,
        assignRoleHandler
    }
}