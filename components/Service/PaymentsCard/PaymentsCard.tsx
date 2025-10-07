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
    Button,
    Tooltip,
    IconButton,
    TableContainer,
    TablePagination,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import usePaymentsCardController from "./usePaymentsCardController";
import { Fragment } from "react";

export default function PaymentsCard() {
    const controller = usePaymentsCardController();

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'complete':
                return 'success';
            case 'pending':
                return 'warning';
            default:
                return 'default';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'complete':
                return 'Completado';
            case 'pending':
                return 'Pendiente';
            default:
                return status;
        }
    };

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
                            <Typography variant="subtitle1">Cobros</Typography>
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
                                        <TableCell onClick={() => controller.handleRequestSort('date')} sx={{ cursor: 'pointer' }}>
                                            Fecha
                                        </TableCell>
                                        <TableCell onClick={() => controller.handleRequestSort('vehicle')} sx={{ cursor: 'pointer' }}>
                                            Vehículo
                                        </TableCell>
                                        <TableCell onClick={() => controller.handleRequestSort('client')} sx={{ cursor: 'pointer' }}>
                                            Cliente
                                        </TableCell>
                                        <TableCell onClick={() => controller.handleRequestSort('status')} sx={{ cursor: 'pointer' }}>
                                            Estado
                                        </TableCell>
                                        <TableCell>Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {controller.visibleRows.map((record, index) => (
                                        <TableRow key={index} hover>
                                            <TableCell>
                                                <Typography variant="body2">
                                                    {controller.formatDate(record.date)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" fontWeight="medium">
                                                    {record.vehicle}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" color="text.secondary">
                                                    {record.client}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={getStatusLabel(record.status)}
                                                    size="small"
                                                    color={getStatusColor(record.status) as any}
                                                    variant="outlined"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Tooltip title="Modificar estado">
                                                    <IconButton color="primary" onClick={() => controller.onModifyStatus(record)}>
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

            <Dialog open={controller.statusDialogOpen} onClose={controller.closeStatusDialog} maxWidth="xs" fullWidth>
                <DialogTitle>Modificar estado de pago</DialogTitle>
                <DialogContent>
                    <Box mt={1}>
                        <FormControl fullWidth>
                            <InputLabel>Estado del Pago</InputLabel>
                            <Select
                                value={controller.selectedStatus || ''}
                                onChange={(e) => controller.setSelectedStatus(e.target.value as 'pending' | 'complete')}
                                label="Estado del Pago"
                            >
                                <MenuItem value="pending">Pendiente</MenuItem>
                                <MenuItem value="complete">Completado</MenuItem>
                            </Select>
                        </FormControl>
                        <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
                            <Button onClick={controller.closeStatusDialog}>Cancelar</Button>
                            <Button 
                                onClick={controller.submitStatusChange} 
                                disabled={controller.saving || !controller.selectedStatus}
                                variant="contained"
                            >
                                Guardar
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}
