import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import useTotalsCardController from "./useTotalsCardController";

export default function TotalsCard() {

    const controller = useTotalsCardController();

    return (
        <Grid size={6}>
            <Card sx={{ height: '100%' }}>
                <CardContent>
                    <Typography variant="body2">Saldo Total</Typography>
                    <Stack direction="row" spacing={2}>
                        <Typography variant="h5">1235.32bs = 20$</Typography>
                    </Stack>
                </CardContent>
            </Card>
        </Grid>
    );
}