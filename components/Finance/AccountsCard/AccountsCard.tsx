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
    TableContainer,
    TablePagination,
    TextField,
    IconButton,
    Tooltip,
    Grid
} from "@mui/material"
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import useAccountsCardController from "./useAccountsCardController";
import { Fragment } from "react";

export default function AccountsCard() {
    const controller = useAccountsCardController();

    const getBalanceColor = (balance: number) => {
        if (balance > 0) return 'success';
        if (balance < 0) return 'error';
        return 'default';
    };

    const getBalanceIcon = (balance: number) => {
        if (balance > 0) return <TrendingUpIcon fontSize="small" />;
        if (balance < 0) return <TrendingDownIcon fontSize="small" />;
        return <AccountBalanceIcon fontSize="small" />;
    };

    return (
        <Grid size={12}>
            <Card sx={{ height: '100%', overflow: 'auto', p: 1 }} variant="elevation">
                {controller.loading ? (
                    <Box sx={{ height: '100%' }} display="flex" justifyContent="center" alignItems="center">
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                            <Typography variant="subtitle1">Cuentas</Typography>
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
                                        <TableCell onClick={() => controller.handleRequestSort('name')} sx={{ cursor: 'pointer' }}>
                                            Nombre
                                        </TableCell>
                                        <TableCell onClick={() => controller.handleRequestSort('description')} sx={{ cursor: 'pointer' }}>
                                            Descripción
                                        </TableCell>
                                        <TableCell onClick={() => controller.handleRequestSort('balance')} sx={{ cursor: 'pointer' }}>
                                            Balance
                                        </TableCell>
                                        <TableCell>Estado</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {controller.visibleRows.map((account, index) => (
                                        <TableRow key={account.id} hover>
                                            <TableCell>
                                                <Box display="flex" alignItems="center" gap={1}>
                                                    <Tooltip title="Cuenta">
                                                        <IconButton size="small" color="primary">
                                                            <AccountBalanceIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Typography
                                                        variant="body2"
                                                        fontWeight="medium"
                                                        noWrap
                                                        sx={{ maxWidth: 150 }}
                                                        title={account.name}
                                                    >
                                                        {account.name}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Typography 
                                                    variant="body2" 
                                                    color="text.secondary"
                                                    sx={{ maxWidth: 200 }}
                                                    noWrap
                                                    title={account.description}
                                                >
                                                    {account.description}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Box display="flex" alignItems="center" gap={1}>
                                                    {getBalanceIcon(account.balance)}
                                                    <Typography
                                                        variant="body2"
                                                        fontWeight="bold"
                                                        color={`${getBalanceColor(account.balance)}.main`}
                                                    >
                                                        {controller.formatCurrency(account.balance)}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={account.balance > 0 ? "Positivo" : account.balance < 0 ? "Negativo" : "Neutro"}
                                                    size="small"
                                                    color={getBalanceColor(account.balance) as any}
                                                    variant="outlined"
                                                />
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
        </Grid>
    );
}