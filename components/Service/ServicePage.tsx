'use client';

import { Chip, Grid } from "@mui/material";
import ModuleDataGrid from "../ModuleDataGrid";
import { ColumnData, ModuleFormGridData } from "@/types/datagrid/datagrid";
import {
    ClientSchema,
    OperatorSchema,
    ServiceSchema,
    ServiceVehicleSchemaStepFour,
    ServiceVehicleSchemaStepOne,
    ServiceVehicleSchemaStepTwo,
    VehicleWithBrandModelClientSchema
} from "@/lib/definitions";
import { Fragment } from "react";
import dayjs from "dayjs";
import getDollarRate from "@/lib/dollar";
import RecipeCartInput from "../Settings/RecipeCartInput";
import ModuleStats from "../ModuleStats/ModuleStats";
import { ModuleStatsData } from "@/types/stats/stats";
import { BarChart, Payment } from "@mui/icons-material";

const dollarRate = await getDollarRate();

// Fields used inside the vehicle creation form (nested in license_plate autocomplete)
const vehicleCreateFormColumns: ColumnData[] = [
    {
        field: 'license_plate',
        headerName: 'Placa de vehículo',
        inputConfig: { size: 12, id: 'license_plate' }
    },
    {
        field: 'vehicle_brand',
        headerName: 'Marca de vehículo',
        inputConfig: {
            size: 12,
            id: 'vehicle_brand',
            autocomplete: {
                url: '/api/service/vehicle/brand',
                labelField: 'name',
                label: 'Marca de vehículo',
                newItemLabel: 'Agregar marca de vehículo',
                loadingType: { loadingText: 'Cargando marcas de vehículo...' },
                confirm: {
                    title: 'Agregar marca de vehículo',
                    message: '¿Estás seguro de querer agregar esta marca de vehículo?',
                    successMessage: 'Marca de vehículo agregada correctamente',
                }
            },
        }
    },
    {
        field: 'vehicle_model',
        headerName: 'Modelo de vehículo',
        inputConfig: {
            size: 12,
            id: 'vehicle_model',
            autocomplete: {
                url: '/api/service/vehicle/model',
                labelField: 'name',
                label: 'Modelo de vehículo',
                newItemLabel: 'Agregar modelo de vehículo',
                loadingType: { loadingText: 'Cargando modelos de vehículo...' },
                confirm: {
                    title: 'Agregar modelo de vehículo',
                    message: '¿Estás seguro de querer agregar este modelo de vehículo?',
                    successMessage: 'Modelo de vehículo agregado correctamente',
                }
            },
        }
    },
    {
        field: 'client',
        headerName: 'Cliente',
        inputConfig: {
            size: 12,
            id: 'client',
            autocomplete: {
                url: '/api/service/client',
                labelField: 'name',
                label: 'Cliente',
                newItemLabel: 'Agregar cliente',
                loadingType: { loadingText: 'Cargando clientes...' },
                config: {
                    create: {
                        name: 'Agregar cliente',
                        description: 'Agregar cliente',
                    },
                    validation: ClientSchema
                },
                formData: {
                    createFillField: 'name',
                    columns: {
                        data: [
                            { field: 'name', headerName: 'Nombre', inputConfig: { size: 12, id: 'name' } },
                            { field: 'lastname', headerName: 'Apellido', inputConfig: { size: 12, id: 'lastname' } },
                            { field: 'phone', headerName: 'Teléfono', inputConfig: { size: 12, id: 'phone' } },
                        ]
                    }
                }
            }
        }
    }
];

// Fields used inside the operator creation form
const operatorCreateFormColumns: ColumnData[] = [
    { field: 'name', headerName: 'Nombre', inputConfig: { size: 12, id: 'name' } },
    { field: 'lastname', headerName: 'Apellido', inputConfig: { size: 12, id: 'lastname' } },
    { field: 'phone', headerName: 'Teléfono', inputConfig: { size: 12, id: 'phone' } },
    { field: 'address', headerName: 'Dirección', inputConfig: { size: 12, id: 'address' } },
];

// Step 1: Cliente y vehículo
const stepOneData: ColumnData[] = [
    {
        field: 'date',
        headerName: 'Fecha',
        inputConfig: { size: 12, id: 'date', date: {} },
        renderCell: (params: any) => (
            <Fragment>
                {params.row.date !== null && params.row.date !== undefined
                    ? dayjs(params.row.date).format('DD/MM/YYYY')
                    : ''}
            </Fragment>
        )
    },
    {
        field: 'vehicleLicensePlate',
        headerName: 'Placa de vehículo',
        inputConfig: {
            size: 12,
            id: 'vehicleLicensePlate',
            autocomplete: {
                url: '/api/service/vehicle',
                labelField: 'license_plate',
                label: 'Placa de vehículo',
                newItemLabel: 'Agregar placa de vehículo',
                loadingType: { loadingText: 'Cargando placas de vehículo...' },
                config: { create: { name: 'Agregar placa de vehículo', description: 'Agregar placa de vehículo' }, validation: VehicleWithBrandModelClientSchema },
                formData: { createFillField: 'license_plate', columns: { data: vehicleCreateFormColumns } }
            },
        }
    }
];

// Step 2: Servicio y operadores
const stepTwoData: ColumnData[] = [
    {
        field: 'client',
        headerName: 'Cliente',
        inputConfig: {
            size: 12,
            id: 'client',
            TextFieldProps: {
                sx: { display: 'none', position: 'absolute' }
            }
        }
    },
    {
        field: 'recipeName',
        headerName: 'Receta',
        inputConfig: {
            size: 12,
            id: 'recipeName',
            custom: RecipeCartInput
        }
    },
    {
        field: 'operators',
        headerName: 'Operadores',
        inputConfig: {
            size: 12,
            id: 'operators',
            autocomplete: {
                url: '/api/service/operator',
                labelField: 'name',
                label: 'Operadores',
                newItemLabel: 'Agregar operador',
                loadingType: { loadingText: 'Cargando operadores...' },
                multiple: true,
                config: { create: { name: 'Agregar operador', description: 'Agregar operador' }, validation: OperatorSchema },
                formData: { createFillField: 'name', columns: { data: operatorCreateFormColumns } }
            }
        },
        renderCell: (params: any) => (
            <Fragment>
                {params.row.operators.map((operator: any) => (
                    <Chip key={operator.id} label={`${operator.name} ${operator.lastname}`} />
                ))}
            </Fragment>
        )
    }
];

// Step 3: Cobros y tasa
const stepThreeData: ColumnData[] = [
    {
        field: 'charge_switch',
        headerName: 'Cobro en dolares',
        inputConfig: {
            size: 12,
            id: 'charge_switch',
            switch: {
                label: 'Cobro en dolares',
                swapIds: [
                    {
                        id: 'bol_charge',
                        value: {
                            field: 'dollar_charge',
                            headerName: 'Cobro en dolares',
                            inputConfig: {
                                size: 12,
                                id: 'dollar_charge',
                                number: { adornment: () => <>$</>, adornmentPosition: 'start' }
                            },
                        }
                    }
                ]
            }
        },
        renderCell: (params: any) => (
            <Fragment>
                {params.row.dollar_charge !== null && params.row.dollar_charge !== undefined
                    ? Number(params.row.dollar_charge).toFixed(2)
                    : ''}
            </Fragment>
        )
    },
    {
        field: 'bol_charge',
        headerName: 'Cobro bolívares',
        inputConfig: { size: 12, id: 'bol_charge', number: { adornment: () => <>Bs</>, adornmentPosition: 'start' } }
    },
    {
        field: 'rate_switch',
        headerName: 'Tasa de cambio BCV',
        inputConfig: {
            dataGridHidden: true,
            size: 12,
            id: 'rate_switch',
            switch: { label: 'Tasa de cambio BCV', disableIds: [{ id: 'dollar_rate', value: dollarRate[0].promedio }] }
        }
    },
    {
        field: 'dollar_rate',
        headerName: 'Tasa de cambio',
        inputConfig: { size: 12, id: 'dollar_rate', number: { adornment: () => <>Bs/$</>, adornmentPosition: 'start' } }
    },
    {
        field: 'status',
        headerName: 'Estado',
        inputConfig: { size: 12, id: 'status', select: { label: 'Estado', options: ['Pendiente', 'Completado'] } }
    }
];

// --- Final module built from pieces above ---
const serviceModule: ModuleFormGridData = {
    url: '/api/service',
    columns: {
        config: {
            gridSpacing: 2
        },
        stepper: {
            orientation: 'vertical',
            steps: [
                {
                    label: 'Cliente y vehículo',
                    validation: ServiceVehicleSchemaStepOne,
                    config: {
                        gridSpacing: 2
                    },
                    data: stepOneData
                },
                {
                    label: 'Servicio y operadores',
                    validation: ServiceVehicleSchemaStepTwo,
                    config: {
                        gridSpacing: 2
                    },
                    data: stepTwoData
                },
                {
                    label: 'Cobros y tasa',
                    config: {
                        gridSpacing: 2
                    },
                    validation: ServiceVehicleSchemaStepFour,
                    data: stepThreeData
                }
            ]
        }
    },
    config: {
        toolbar: {
            show: ['quickFilter', 'columns', 'export', 'export', 'filter', 'density', 'add', 'delete']
        },
        create: {
            name: 'Agregar servicio',
            description: 'Agregar servicio',
            validation: ServiceSchema
        }
    }
}


const serviceStats: ModuleStatsData = {
    url: '/api/service/statistics',
    loadingType: 'spinner',
    size: 'small',
    label: 'Estadísticas',
    description: 'Aquí puedes ver las estadísticas de tus servicios.',
    icon: BarChart,
    tabs: [
        {
            label: 'Servicios',
            description: 'Servicios',
            useMenu: true,
			graphs: [
				{
					id: 1,
					label: 'Servicios por receta',
					type: 'pie',
					expectsFillArray: 'servicesByRecipe'
				},
				{
					id: 2,
					label: 'Servicios por vehículo',
					type: 'pie',
					expectsFillArray: 'servicesByVehicle'
				},
				{
					id: 3,
					label: 'Servicios por operador',
					type: 'pie',
					expectsFillArray: 'servicesByOperator'
				},
				{
					id: 4,
					label: 'Servicios por mes (últimos 6 meses)',
					type: 'line',
					expectsFillArray: 'servicesByMonth',
					axis: { x: 'month', y: 'count' }
				}
			]
        }
    ]
}

const paymentModule: ModuleFormGridData = {
    url: '/api/service/payments',
    columns: {
        config: {
            gridSpacing: 2
        },
        data: [
            {
                field: 'operator',
                headerName: 'Operador',
                inputConfig: { size: 12, id: 'operator', date: {} },
                flex: 1
            },
            {
                field: 'payment',
                headerName: 'Pago',
                inputConfig: { size: 12, id: 'payment', number: { adornment: () => <>Bs</>, adornmentPosition: 'start' } },
                flex: 1
            }
        ],
    },
    actions: {
        config: {
            field: 'actions',
            headerName: 'Acciones',
            width: 150
        },
        data: [{
            name: 'Pagar',
            icon: Payment,
        }]
    },
    config: {
        toolbar: {
            data: [
                {
                    name: 'Pagar a todos',
                    icon: Payment,
                }
            ]
        }
    },
}


export default function ServicePage() {
    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
                <ModuleStats moduleStats={serviceStats} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <ModuleDataGrid moduleSettings={paymentModule} />
            </Grid>
            <Grid size={12}>
                <ModuleDataGrid moduleSettings={serviceModule} />
            </Grid>
        </Grid>
    )
}