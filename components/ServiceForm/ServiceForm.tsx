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
import useServiceFormController from './ServiceFormPage/useServiceFormPageController';
import ClientField from './Client/ClientField';
import { FormControlLabel, Grid, Switch, TextField } from '@mui/material';
import VehicleField from './Vehicle/VehicleField';
import { DatePicker } from '@mui/x-date-pickers';
import VehicleSelect from './VehicleSelect/VehicleSelect';


const steps = [
    {
        label: 'Identificar cliente',
        description: `Identificar el cliente que va a ser atendido`,
        component: <ClientStep />
    },
    {
        label: 'Datos del servicio',
        description: `Datos del servicio que va a ser atendido`,
        component: <ServiceStep />
    }
];

function ServiceStep() {
    return (
        <Grid container spacing={2}>
            {/* Fecha de servicio con DatePicker*/}
            <Grid size={12}>
                <DatePicker label="Fecha de servicio" />
            </Grid>
        </Grid>
    );
}

function ClientStep() {
    return (
        <Grid container spacing={2}>
            <Grid size={12}>
                <FormControlLabel
                    label="Buscar por placa de vehículo"
                    control={<Switch />}
                >
                </FormControlLabel>
            </Grid>
            <Grid size={12}>
                <VehicleSelect />
            </Grid>
            <Grid size={6}>
                <ClientField onChange={() => { }} />
            </Grid>
            <Grid size={6}>
                <TextField label="Telefono" />
            </Grid>
        </Grid>
    );
}

export default function ServiceFormPage() {
    const controller = useServiceFormController();

    return (
        <Box sx={{ maxWidth: 400 }}>
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
                            {step.component}
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
        </Box>
    );
}
