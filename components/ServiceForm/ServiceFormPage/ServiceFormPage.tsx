'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import useServiceFormController, { ServiceFormData } from './useServiceFormPageController';
import ClientField from '../Client/ClientField';
import { Card, CardContent, FormControl, FormControlLabel, Grid, Switch, TableRow, TableBody, Table, TextField, TableHead, TableCell, Stack, Divider } from '@mui/material';
import VehicleField from '../Vehicle/VehicleField';
import { DatePicker } from '@mui/x-date-pickers';
import RecipeField from '@/components/Recipe/RecipeField/RecipeField';
import PaymentMethod from '@/components/ServiceForm/PaymentMethod/PaymentMethod';

type StepComponentProps = {
    label: string;
    description: string;
    component: React.ComponentType<{
        formData: ServiceFormData,
        setFormData: React.Dispatch<React.SetStateAction<ServiceFormData>>
    }>;
}

const steps: StepComponentProps[] = [
    {
        label: 'Identificar cliente',
        description: `Identificar el cliente que va a ser atendido`,
        component: ClientStep
    },
    {
        label: 'Datos del servicio',
        description: `Datos del servicio del cliente que va a ser atendido`,
        component: ServiceStep
    },
    {
        label: 'Datos del pago',
        description: `Datos del pago del cliente que va a ser atendido`,
        component: PaymentStep
    }
];

function PaymentStep() {
    return (
        <Grid container spacing={2}>


            {/* Metodo de pago */}
            <Grid size={12}>
                <PaymentMethod />
            </Grid>

            {/* Tasa de cambio */}
            <Grid size={12}>
                <TextField fullWidth label="Tasa de cambio" />
            </Grid>

            {/* Cobro */}
            <Grid size={6}>
                <TextField fullWidth label="Cobro en dolares" />
            </Grid>
            <Grid size={6}>
                <TextField fullWidth label="Cobro en bolivares" />
            </Grid>
        </Grid>
    );
}

function ServiceStep({ formData, setFormData }: { formData: ServiceFormData, setFormData: React.Dispatch<React.SetStateAction<ServiceFormData>> }) {
    return (
        <Grid container spacing={2}>
            {/* Fecha de servicio con DatePicker*/}
            {formData.client && (
                <Grid size={12}>
                    <VehicleField
                        clientId={formData.client.id}
                        onChange={(vehicle) => setFormData({ ...formData, vehicle })}
                    />
                </Grid>
            )}
            <Grid size={12}>
                <FormControl fullWidth>
                    <DatePicker label="Fecha de servicio" />
                </FormControl>
            </Grid>
            {/* Receta */}
            <Grid size={12}>
                <RecipeField onChange={() => { }} />
            </Grid>

            {/* Extras Switch */}
            <Grid size={12}>
                <FormControlLabel
                    label="La receta incluye extras"
                    control={<Switch />}
                />
            </Grid>

            {/* Extras */}
            <Grid size={12}>
                <TextField fullWidth label="Extras" />
            </Grid>
        </Grid>
    );
}

function ClientStep({
    formData,
    setFormData
}: {
    formData: ServiceFormData,
    setFormData: React.Dispatch<React.SetStateAction<ServiceFormData>>
}) {

    const switchChangeHandler = (checked: boolean) => {
        if (checked) {
            setFormData({ ...formData, switchVehicle: true, client: null });
        } else {
            setFormData({ ...formData, switchVehicle: false, vehicle: null });
        }
    }


    return (
        <Grid container spacing={2}>
            <Grid size={12}>
                <FormControlLabel
                    label="Buscar por placa de vehículo"
                    control={<Switch
                        onChange={(e) => switchChangeHandler(e.target.checked)}
                        value={formData.switchVehicle}
                    />}
                >
                </FormControlLabel>
            </Grid>
            {formData.switchVehicle && (
                <Grid size={12}>
                    <VehicleField onChange={async (vehicle) => {
                        setFormData({ ...formData, vehicle });
                        try {
                            const res = await fetch(`/api/service/vehicle/${vehicle.id}/client`);
                            const client = await res.json();
                            if (client && !client.error) {
                                setFormData(prev => ({ ...prev, client }));
                            }
                        } catch (e) {
                            // ignore
                        }
                    }} />
                </Grid>
            ) || (
                    <Grid size={12}>
                        <ClientField onChange={(client) => setFormData({ ...formData, client })} />
                    </Grid>
                )}
        </Grid>
    );
}

export default function ServiceFormPage() {
    const controller = useServiceFormController();

    return (
        <Grid container spacing={2} sx={{ height: '100%' }}>
            <Grid size={{ xs: 12, md: 6 }}>
                <Stepper activeStep={controller.activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel
                                optional={
                                    index === steps.length - 1 ? (
                                        <Typography variant="caption">Ultimo paso</Typography>
                                    ) : null
                                }
                            >
                                {step.label}
                            </StepLabel>
                            <StepContent>
                                <step.component
                                    formData={controller.formData}
                                    setFormData={controller.setFormData}
                                />
                                <Box sx={{ mb: 2 }}>
                                    <Button
                                        variant="contained"
                                        onClick={controller.handleNext}
                                        disabled={!controller.formData.client && !controller.formData.vehicle}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                    </Button>
                                    <Button
                                        disabled={index === 0}
                                        onClick={controller.handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                </Box>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {controller.activeStep === steps.length && (
                    <Paper square elevation={0} sx={{ p: 3 }}>
                        <Typography>All steps completed - you&apos;re finished</Typography>
                        <Button onClick={controller.handleReset} sx={{ mt: 1, mr: 1 }}>
                            Reset
                        </Button>
                    </Paper>
                )}
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} sx={{ overflowY: 'auto', height: '100%' }}>
                <Card variant='outlined'>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>Resumen</Typography>
                        <Stack spacing={2}>
                            {controller.formData.vehicle && (
                                <>
                                    <Typography variant="subtitle2" color="text.secondary">Datos del servicio</Typography>
                                    <Stack spacing={0.5}>
                                        <Typography variant="body2">Fecha: 2021-01-01</Typography>
                                        <Typography variant="body2">Vehículo: {controller.formData.vehicle.license_plate}</Typography>
                                        <Typography variant="body2">Modelo: {controller.formData.vehicle.Model?.name}</Typography>
                                        <Typography variant="body2">Marca: {controller.formData.vehicle.Brand?.name}</Typography>
                                    </Stack>
                                    <Divider />
                                </>
                            )}

                            <Typography variant="body2">Operadores: asd</Typography>

                            {controller.formData.client && (
                                <>
                                    <Typography variant="subtitle2" color="text.secondary">Datos del cliente</Typography>
                                    <Stack spacing={0.5}>
                                        <Typography variant="body2">Cliente: {controller.formData.client.name} {controller.formData.client.lastname}</Typography>
                                        <Typography variant="body2">Telefono: {controller.formData.client.phone}</Typography>
                                    </Stack>
                                    <Divider />
                                </>
                            )}

                            <Typography variant="subtitle2" color="text.secondary">Datos del pago</Typography>
                            <Stack spacing={0.5}>
                                <Typography variant="body2">Metodo de pago: Efectivo</Typography>
                                <Typography variant="body2">Tasa de cambio: 1000</Typography>
                                <Typography variant="body2">Cobro en dolares: 100</Typography>
                                <Typography variant="body2">Cobro en bolivares: 100000</Typography>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
