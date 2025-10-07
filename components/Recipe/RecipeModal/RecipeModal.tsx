// Recipe Modal
import { TextField, Button, Dialog, DialogContent, DialogActions, Grid, DialogTitle, DialogContentText } from "@mui/material";
import { useRecipeContext } from "../ContextProvider";
import useRecipeModalController from "./useRecipeModalController";

export default function RecipeModal() {
    const recipeContext = useRecipeContext();
    const controller = useRecipeModalController();

    return (
        <>
            <Dialog
                open={recipeContext.modal.open}
                onClose={controller.handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>{recipeContext.modal.type === 'add' ? 'Add Recipe' : 'Update Recipe'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{recipeContext.modal.type === 'add' ? 'Add a new recipe to the system' : 'Update the recipe information'}</DialogContentText>
                    <Grid container rowSpacing={0} columnSpacing={2} >
                        <Grid size={12}>
                            <TextField
                                required
                                margin="dense"
                                label="Recipe Name"
                                fullWidth
                                value={controller.formData.name}
                                onChange={(e) => controller.setFormData({ ...controller.formData, name: e.target.value })}
                            />
                        </Grid>
                    </Grid>
                    <DialogActions>
                        <Button
                            disabled={controller.loading}
                            onClick={controller.handleClose}
                        >
                            Cancel
                        </Button>
                        <Button loading={controller.loading} onClick={controller.handleSubmit}>
                            {recipeContext.modal.type === 'add' ? 'Add' : 'Update'}
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    )
}
