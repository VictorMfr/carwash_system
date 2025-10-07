import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { Alert, AlertColor, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Portal, Snackbar } from "@mui/material";

export default function UIControls() {

    const uiContext = useUIDisplayControls();

    return (
        <>
            <Portal>
                {/* Snackbar */}
                <Snackbar
                    open={uiContext.snackbar.open}
                    autoHideDuration={3000}
                    onClose={() => uiContext.setSnackbar({ open: false, message: '', severity: 'success' })}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                >
                    <Alert severity={uiContext.snackbar.severity as AlertColor}>{uiContext.snackbar.message}</Alert>
                </Snackbar>

                {/* Alert Modal */}
                <Dialog
                    open={uiContext.alert.open}
                    aria-labelledby="responsive-dialog-title"
                    
                >
                    <DialogTitle id="responsive-dialog-title">
                        {uiContext.alert.title}
                    </DialogTitle>
                    <DialogContent>
                        {uiContext.alert.message}
                    </DialogContent>
                    <DialogActions>
                        {uiContext.alert.actions.map((action) => (
                            <div key={action.label}>
                                {action.label === 'Cancel' ? <Button disabled={uiContext.loading} key={action.label} onClick={action.onClick.bind(null, uiContext.setLoading)}>
                                    {action.label}
                                </Button> : <Button loading={uiContext.loading} key={action.label} onClick={action.onClick.bind(null, uiContext.setLoading)}>
                                    {action.label}
                                </Button>}
                            </div>
                        ))}
                    </DialogActions>
                </Dialog>

                {/* Loading Modal */}
                <Dialog
                    open={uiContext.screenLoading}
                    PaperProps={{
                        style: { background: "transparent", boxShadow: "none", overflow: "hidden" }
                    }}
                    BackdropProps={{
                        style: { backgroundColor: "rgba(0,0,0,0.5)", overflow: "hidden" }
                    }}
                >
                    <CircularProgress />
                </Dialog>
            </Portal>
        </>
    );
}