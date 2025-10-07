import {
    Typography,
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    Box,
    CircularProgress,
    Avatar,
    Button,
    Tooltip,
    IconButton,
    TableContainer,
    TablePagination,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent
} from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import StateField from "../StockForm/Details/State/StateField";
import useMaintenanceCardController from "./useMaintenanceCardController";
import { Fragment } from "react";

export default function MaintenanceCard() {
    const controller = useMaintenanceCardController();

    return (
        <Fragment>
            <Card sx={{ height: '100%', overflow: 'auto', p: 1 }} variant="outlined">
                {controller.loading ? (
                    <Box sx={{ height: '100%' }} display="flex" justifyContent="center" alignItems="center">
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                            <Typography variant="subtitle1">Herramientas</Typography>
                            <TextField
                                size="small"
                                placeholder="Filtrar..."
                                value={controller.filter}
                                onChange={controller.handleFilterChange}
                            />
                        </Box>
                        <TableContainer>
                            <Table stickyHeader size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Imagen</TableCell>
                                        <TableCell onClick={() => controller.handleRequestSort('product')} sx={{ cursor: 'pointer' }}>Producto</TableCell>
                                        <TableCell onClick={() => controller.handleRequestSort('brand')} sx={{ cursor: 'pointer' }}>Marca</TableCell>
                                        <TableCell onClick={() => controller.handleRequestSort('state')} sx={{ cursor: 'pointer' }}>Estado</TableCell>
                                        <TableCell>Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {controller.visibleRows.map((record, index) => (
                                        <TableRow key={index} hover>
                                            <TableCell>
                                                <Box display="flex" alignItems="center" gap={1}>
                                                    <Tooltip title="ver imagen">
                                                        <Avatar
                                                            src={record.StockDetails.picture || undefined}
                                                            alt={record.Product.name}
                                                            sx={{ width: 32, height: 32, cursor: record.StockDetails.picture ? 'pointer' : 'default' }}
                                                            onClick={() => controller.openPreview(record.StockDetails.picture)}
                                                        />
                                                    </Tooltip>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                        variant="body2"
                                                        fontWeight="medium"
                                                        noWrap
                                                        sx={{ maxWidth: 150 }}
                                                        title={record.Product.name}
                                                    >
                                                        {record.Product.name}
                                                    </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" color="text.secondary">
                                                    {record.Brand.name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={record.State.name}
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Tooltip title="Modificar estado">
                                                    <IconButton color="primary" onClick={() => controller.onModifyState(record)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={controller.rowCount}
                            rowsPerPage={controller.rowsPerPage}
                            page={controller.page}
                            onPageChange={controller.handleChangePage}
                            onRowsPerPageChange={controller.handleChangeRowsPerPage}
                        />
                    </>
                )}
            </Card>
            <Dialog open={controller.previewOpen} onClose={controller.closePreview} maxWidth="sm" fullWidth>
                <DialogTitle>Imagen</DialogTitle>
                <DialogContent>
                    <Box display="flex" alignItems="center" justifyContent="center">
                        {controller.previewSrc ? (
                            <Box component="img" src={controller.previewSrc} alt="Preview" sx={{ maxWidth: '100%', maxHeight: 500, objectFit: 'contain' }} />
                        ) : (
                            <Typography color="text.secondary">Sin imagen</Typography>
                        )}
                    </Box>
                </DialogContent>
            </Dialog>

            <Dialog open={controller.stateDialogOpen} onClose={controller.closeStateDialog} maxWidth="xs" fullWidth>
                <DialogTitle>Modificar estado</DialogTitle>
                <DialogContent>
                    <Box mt={1}>
                        <StateField onChange={controller.setSelectedState} />
                        <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
                            <Button onClick={controller.closeStateDialog}>Cancelar</Button>
                            <Button onClick={controller.submitStateChange} disabled={controller.saving || !controller.selectedState}>Guardar</Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}
