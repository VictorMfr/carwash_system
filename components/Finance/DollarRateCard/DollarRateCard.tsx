import { Card, CardContent, Divider, Grid, Icon, Stack, Typography } from "@mui/material";
import useDollarRateCardController from "./useDollarRateCardController";
import DollarIcon from '@mui/icons-material/AttachMoney';
import dayjs from 'dayjs';

export default function DolarRateCard() {

    const controller = useDollarRateCardController();

    return (
        <Grid size={6}>
            <Card>
                <CardContent>
                    <Stack spacing={2}>
                        <Stack direction="row" alignItems="center">
                            <DollarIcon />
                            <Typography variant="h6">Tasas Dolar</Typography>
                        </Stack>
                        <Divider />
                        <Stack spacing={1} direction="row" justifyContent="space-between">
                            {controller.loading ? (
                                <Typography variant="body2">Loading...</Typography>
                            ) : (
                                controller.dollarRate.map((rate) => (
                                    <Stack>
                                        <Typography variant="body2">{rate.nombre}: {rate.promedio}bs </Typography>
                                        <Typography variant="body2">{dayjs(rate.fechaActualizacion).format('DD/MM/YYYY')}</Typography>
                                    </Stack>

                                ))
                            )}
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </Grid>
    );
}