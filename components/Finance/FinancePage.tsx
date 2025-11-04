'use client';

import ModuleDataGrid from "../ModuleDataGrid";
import { ModuleFormGridData } from "@/types/datagrid/datagrid";
import { Grid } from "@mui/material";
import { ModuleStatsData } from "@/types/stats/stats";
import { AccountBalance, BarChart, Build, ChangeCircle, Money } from "@mui/icons-material";
import ModuleStats from "../ModuleStats/ModuleStats";
import StateModal from "../Stock/StateModal";
import { ModuleStackCardsData } from "@/types/stackcards/stackcards";
import ModuleStackCards from "../ModuleStackCards/ModuleStackCards";
import dayjs from "dayjs";
import { AccountSchema, FinanceSchema, MethodSchema } from "@/lib/definitions";
import getDollarRate from "@/lib/dollar";

const financeStatsModule: ModuleStatsData = {
    url: '/api/finance/statistics',
    loadingType: 'spinner',
    size: 'small',
    label: 'Estadísticas de Finanzas',
    description: 'Ingresos, costos y tasa de dólar por mes.',
    icon: BarChart,
    tabs: [
        {
            label: 'Finanzas',
            description: 'Series mensuales',
            useMenu: true,
            graphs: [
                {
                    id: 1,
                    label: 'Ingresos por mes',
                    type: 'line',
                    expectsFillArray: 'incomeData',
                    axis: { x: 'month', y: 'income' }
                },
                {
                    id: 2,
                    label: 'Costos por mes',
                    type: 'line',
                    expectsFillArray: 'costData',
                    axis: { x: 'month', y: 'cost' }
                },
                {
                    id: 3,
                    label: 'Tasa dólar promedio por mes',
                    type: 'line',
                    expectsFillArray: 'dollarData',
                    axis: { x: 'month', y: 'dollar' }
                }
            ]
        }
    ]
};

const dollarRate = await getDollarRate();

const FinanceModule: ModuleFormGridData = {
    url: '/api/finance',
    label: 'Transacciones',
    description: 'Aquí puedes ver las transacciones de tu empresa.',
    icon: Money,
    columns: {
        config: {
            gridSpacing: 2
        },
        data: [
            {
                field: 'date',
                headerName: 'Fecha',
                inputConfig: {
                    size: 12,
                    id: 'date',
                    date: {}
                },
            },
            {
                field: 'amount',
                headerName: 'Monto',
                inputConfig: {
                    size: 12,
                    id: 'amount',
                    number: {
                        adornment: () => <>Bs</>,
                        adornmentPosition: 'start'
                    }
                },
            },
            {
                field: 'description',
                headerName: 'Descripción',
                inputConfig: {
                    size: 12,
                    id: 'description'
                },
            },
            {
                field: 'auto',
                headerName: 'Tasa BCV',
                inputConfig: {
                    id: 'auto',
                    size: 12,
                    dataGridHidden: true,
                    switch: {
                        label: 'Auto',
                        disableIds: [
                            {
                                id: 'dollar_rate',
                                value: dollarRate[0].promedio
                            }
                        ]
                    }
                }
            },
            {
                field: 'dollar_rate',
                headerName: 'Tasa de dolar',
                inputConfig: {
                    size: 12,
                    id: 'dollar_rate',
                    number: {
                        adornment: () => <>Bs/$</>,
                        adornmentPosition: 'start'
                    }
                },
            },
            {
                field: 'account',
                headerName: 'Cuenta',
                inputConfig: {
                    size: 12,
                    id: 'account',
                    autocomplete: {
                        url: '/api/finance/account',
                        label: 'Cuenta',
                        loadingType: 'screen',
                        newItemLabel: 'Agregar cuenta',
                        labelField: 'name',
                        config: {
                            create: {
                                name: 'Agregar cuenta',
                                description: 'Agregar cuenta',
                            },
                            validation: AccountSchema
                        },
                        formData: {
                            createFillField: 'name',
                            columns: {
                                data: [
                                    {
                                        field: 'name',
                                        headerName: 'Nombre',
                                        inputConfig: {
                                            size: 12,
                                            id: 'name',
                                        }
                                    },
                                    {
                                        field: 'description',
                                        headerName: 'Descripción',
                                        inputConfig: {
                                            size: 12,
                                            id: 'description'
                                        }
                                    }
                                ]
                            }
                        }
                    }
                },
            },
            {
                field: 'method',
                headerName: 'Método',
                inputConfig: {
                    size: 12,
                    id: 'method',
                    autocomplete: {
                        url: '/api/finance/method',
                        label: 'Método',
                        loadingType: 'screen',
                        newItemLabel: 'Agregar método',
                        labelField: 'name',
                        config: {
                            validation: MethodSchema
                        },
                        confirm: {
                            title: 'Agregar método',
                            message: '¿Estás seguro de querer agregar este método?',
                            successMessage: 'Método agregado correctamente',
                        }
                    }
                },
            }
        ]
    },
    actions: {
        config: {
            field: 'actions',
            headerName: 'Acciones',
            width: 150
        },
        data: []
    },
    config: {
        toolbar: {
            show: ['quickFilter', 'columns', 'export', 'export', 'filter', 'density', 'add', 'delete']
        },
        create: {
            name: 'Registrar transacción',
            description: 'Registrar transacción',
            validation: FinanceSchema
        },
    }
}

const accountsModule: ModuleFormGridData = {
    url: '/api/finance/account/balance',
    label: 'Cuentas',
    description: 'Aquí puedes ver las cuentas de tu empresa.',
    icon: AccountBalance,
    columns: {
        config: {
            gridSpacing: 2,
        },
        data: [
            {
                field: 'name',
                headerName: 'Nombre',
                inputConfig: {
                    size: 12,
                    id: 'name'
                },
                flex: 1,
            },
            {
                field: 'balance',
                headerName: 'Balance',
                inputConfig: {
                    size: 12,
                    id: 'balance'
                },
                flex: 1,
            },
        ]
    },
    
    config: {
        rowHeight: 60,
        inputConfig: {
            allowCheckboxSelection: false
        },
        toolbar: {
            show: ['quickFilter', 'columns']
        }
    }
}

const financeStackCards: ModuleStackCardsData = {
    url: 'https://ve.dolarapi.com/v1/dolares',
    description: 'Aquí puedes ver las finanzas de tu empresa.',
    config: {
        cardWidth: 12,
        cardHeight: 160,
    },
    data: [
        {
            id: '1',
            fetchCard: {
                dataDisplayDirection: 'row',
                caption: 'Tasa de dolar',
                mapper: (data) => {
                    return data.map((item: any) => {
                        return {
                            [item.nombre]: `${item.promedio}bs`,
                            Fecha: dayjs(item.fechaActualizacion).format('DD/MM/YYYY'),
                        }
                    });
                },
            },
            size: { xs: 12, md: 6 },
        },
        {
            id: '2',
            textCard: {
                caption: 'Total de finanzas',
                title: 'Total de finanzas',
                description: 'Aquí puedes ver el total de finanzas de tu empresa.',
            },
            size: { xs: 12, md: 6 },
        }
    ]
}

export default function FinancePage() {
    return (
        <Grid container spacing={2}>
            <Grid size={6}>
                <ModuleStats moduleStats={financeStatsModule} />
            </Grid>
            <Grid size={6}>
                <ModuleDataGrid moduleSettings={accountsModule} />
            </Grid>
            <Grid size={12}>
                <ModuleStackCards moduleSettings={financeStackCards} />
            </Grid>
            <Grid size={12}>
                <ModuleDataGrid moduleSettings={FinanceModule} />
            </Grid>
        </Grid>
    );
}