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
import { Card, CardContent, FormControl, FormControlLabel, Grid, Switch, TextField, Stack, Divider, Select, InputLabel, MenuItem } from '@mui/material';
import VehicleField from '../Vehicle/VehicleField';
import { DatePicker } from '@mui/x-date-pickers';
import RecipeField from '@/components/Recipe/RecipeField/RecipeField';
import PaymentMethod from '@/components/ServiceForm/PaymentMethod/PaymentMethod';
import ExtraField from '../Extra/ExtraField';
import VehicleSelect from '../VehicleSelect/VehicleSelect';
import api from '@/lib/axios';
import useFetchDollarRate from '@/hooks/fetch/useFetchDollarRate';
import OperadoresField from '../Operator/OperatorCart';


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

function PaymentStep({ formData, setFormData }: { formData: ServiceFormData, setFormData: React.Dispatch<React.SetStateAction<ServiceFormData>> }) {
    
    const { dollarRate, loading } = useFetchDollarRate();
    const currentAutoRate = dollarRate?.[0]?.promedio ?? null;

    React.useEffect(() => {
        if (formData.switchChange && currentAutoRate != null) {
            setFormData(prev => {
                const next = { ...prev, dollarRate: currentAutoRate };
                if (next.amountUSD != null) {
                    return { ...next, amountVES: Number((next.amountUSD * currentAutoRate).toFixed(2)) };
                }
                if (next.amountVES != null) {
                    return { ...next, amountUSD: Number((next.amountVES / currentAutoRate).toFixed(2)) };
                }
                return next;
            });
        }
    }, [formData.switchChange, currentAutoRate, setFormData]);

    const handleToggleAutoRate = (checked: boolean) => {
        if (!checked) {
            setFormData(prev => ({ ...prev, switchChange: false, dollarRate: null, amountUSD: null, amountVES: null }));
        } else {
            setFormData(prev => ({ ...prev, switchChange: true, dollarRate: currentAutoRate ?? null }));
        }
    };

    const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/,/g, '.');
        const rate = raw === '' ? null : Number(raw);
        setFormData(prev => {
            const next = { ...prev, dollarRate: rate } as ServiceFormData;
            if (rate && prev.amountUSD != null) {
                return { ...next, amountVES: Number((prev.amountUSD * rate).toFixed(2)) };
            }
            if (rate && prev.amountVES != null) {
                return { ...next, amountUSD: Number((prev.amountVES / rate).toFixed(2)) };
            }
            return next;
        });
    };

    const handleUSDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/,/g, '.');
        const usd = raw === '' ? null : Number(raw);
        setFormData(prev => {
            const next = { ...prev, amountUSD: usd } as ServiceFormData;
            if (usd != null && prev.dollarRate) {
                return { ...next, amountVES: Number((usd * prev.dollarRate).toFixed(2)) };
            }
            return { ...next, amountVES: prev.dollarRate ? next.amountVES : null };
        });
    };

    const handleVESChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/,/g, '.');
        const ves = raw === '' ? null : Number(raw);
        setFormData(prev => {
            const next = { ...prev, amountVES: ves } as ServiceFormData;
            if (ves != null && prev.dollarRate) {
                return { ...next, amountUSD: Number((ves / prev.dollarRate).toFixed(2)) };
            }
            return { ...next, amountUSD: prev.dollarRate ? next.amountUSD : null };
        });
    };
    
    return (
        <Grid container spacing={2}>


            {/* Metodo de pago */}
            <Grid size={12}>
                <PaymentMethod />
            </Grid>

            <Grid size={12}>
                <FormControlLabel
                    label="Obtener tasa de cambio automaticamente"
                    control={<Switch 
                        onChange={(e) => handleToggleAutoRate(e.target.checked)} 
                        checked={formData.switchChange}
                    />}
                />
            </Grid>

            {/* Tasa de cambio */}
            <Grid size={12}>
                <TextField
                    fullWidth
                    label="Tasa de cambio BCV"
                    disabled={formData.switchChange}
                    value={formData.dollarRate ?? ''}
                    onChange={handleRateChange}
                    placeholder={formData.switchChange ? (loading ? 'Cargando...' : (currentAutoRate != null ? String(currentAutoRate) : '')) : ''}
                />
            </Grid>

            {/* Cobro */}
            <Grid size={6}>
                <TextField 
                    fullWidth 
                    label="Cobro en dolares" 
                    value={formData.amountUSD ?? ''}
                    onChange={handleUSDChange}
                />
            </Grid>
            <Grid size={6}>
                <TextField 
                    fullWidth 
                    label="Cobro en bolivares" 
                    value={formData.amountVES ?? ''}
                    onChange={handleVESChange}
                />
            </Grid>

            {/* Select de estado de pago */}
            <Grid size={12}>
                <FormControl fullWidth>
                    <InputLabel id="status-label">Estado de pago</InputLabel>
                    <Select labelId="status-label" label="Estado de pago" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                        <MenuItem value="pending">Pendiente</MenuItem>
                        <MenuItem value="complete">Completado</MenuItem>
                    </Select>
                </FormControl>
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
                    control={<Switch onChange={(e) => setFormData({ ...formData, switchExtras: e.target.checked })} value={formData.switchExtras} />}
                />
            </Grid>

            {/* Extras */}
            {formData.switchExtras && (
                <Grid size={12}>
                    <ExtraField onChange={() => { }} />
                </Grid>
            )}

            {/* Operadores */}
            <Grid size={12}>
                <OperadoresField onChange={() => { }} />
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
                    <VehicleSelect onChange={async (vehicle) => {
                        setFormData(prev => ({ ...prev, vehicle }));
                        if (vehicle?.id) {
                            try {
                                const { data: client } = await api.get(`/api/service/vehicle/${vehicle.id}/client`);
                                setFormData(prev => ({ ...prev, client: client || null }));
                            } catch (_) {
                                setFormData(prev => ({ ...prev, client: null }));
                            }
                        } else {
                            setFormData(prev => ({ ...prev, client: null }));
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
                                <Typography variant="body2">Tasa de cambio: {controller.formData.dollarRate ?? '-'}</Typography>
                                <Typography variant="body2">Cobro en dolares: {controller.formData.amountUSD ?? '-'}</Typography>
                                <Typography variant="body2">Cobro en bolivares: {controller.formData.amountVES ?? '-'}</Typography>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
