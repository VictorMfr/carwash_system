'use client';

import { ModuleFormGridData } from "@/types/datagrid/datagrid"
import ModuleStats from "../ModuleStats/ModuleStats";
import { ModuleStatsData } from "@/types/stats/stats";
import { Grid } from "@mui/material";
import PictureCell from "../ModuleDataGrid/PictureCell";
import { BarChart, Build, ChangeCircle, Inventory, Money } from "@mui/icons-material";
import StateModal from "./StateModal";
import DetailsLink from "./DetailsLink";
import { ProductSchema, StockSchema } from "@/lib/definitions";
import ModuleDataGrid from "../ModuleDataGrid";

const StockModule: ModuleFormGridData = {
    url: '/api/stock',
    label: 'Inventario',
    description: 'Aquí puedes ver el inventario de tus productos.',
    icon: Inventory,
    columns: {
        config: {
            gridSpacing: 2
        },
        data: [
            {
                field: 'product',
                headerName: 'Producto',
                inputConfig: {
                    size: 12,
                    id: 'product',
                    autocomplete: {
                        config: {
                            validation: ProductSchema,
                            create: {
                                name: 'Agregar producto',
                                description: 'Ingresa los datos del producto',
                            }
                        },
                        url: '/api/stock/product?withoutInventory=true',
                        // Pedir solo productos sin inventario asignado
                        queryParams: { withoutInventory: true },
                        label: 'Producto',
                        labelField: 'name',
                        newItemLabel: 'Agregar producto',
                        loadingType: 'screen',
                        formData: {
                            createFillField: 'name',
                            columns: {
                                config: {
                                    gridSpacing: 2
                                },
                                data: [
                                    {
                                        field: 'name',
                                        headerName: 'Nombre',
                                        inputConfig: {
                                            size: 12,
                                            id: 'name'
                                        }
                                    },
                                    {
                                        field: 'isTool',
                                        headerName: 'Es herramienta',
                                        inputConfig: {
                                            size: 12,
                                            id: 'isTool',
                                            switch: {
                                                label: 'Es herramienta',
                                                disableIds: [{
                                                    id: 'unit',
                                                    value: 'u'
                                                }]
                                            }
                                        }
                                    },
                                    {
                                        field: 'unit',
                                        headerName: 'Unidad',
                                        inputConfig: {
                                            size: 12,
                                            id: 'unit',
                                            select: {
                                                label: 'Unidad',
                                                options: [
                                                    'kg',
                                                    'gr',
                                                    'lt',
                                                    'ml',
                                                    'u',
                                                ]
                                            }

                                        }
                                    },
                                ]
                            }
                        }
                    }
                },
            },
            {
                field: 'minimum_quantity',
                headerName: 'Cantidad Mínima',
                inputConfig: {
                    size: 12,
                    number: {},
                    id: 'minimum_quantity'
                }
            }
        ]
    },
    actions: {
        config: {
            field: 'actions',
            headerName: 'Acciones',
            width: 150
        },
        data: [
            {
                name: 'Ver Detalles',
                icon: DetailsLink,
                dispatchMode: 'link',
            }
        ]
    },
    config: {
        toolbar: {
            show: ['quickFilter', 'columns', 'export', 'export', 'filter', 'density', 'add', 'delete']
        },
        create: {
            name: 'Crear inventario',
            description: 'Crear inventario',
            hiddenAction: true,
            validation: StockSchema
        },
        edit: {
            name: 'Editar inventario',
            description: 'Editar inventario',
        },
        delete: {
            hiddenAction: true
        }
    }
}

const stockStats: ModuleStatsData = {
    url: '/api/stock/statistics',
    loadingType: 'spinner',
    size: 'small',
    label: 'Estadísticas',
    description: 'Aquí puedes ver las estadísticas de tu inventario.',
    icon: BarChart,
    tabs: [
        {
            label: 'Productos',
            description: 'Descripción de la pestaña de productos',
            useMenu: true,
            graphs: [
                {
                    id: 1,
                    label: 'Productos por Marca',
                    expectsFillArray: 'productsByBrand',
                    type: 'pie',
                },
                {
                    id: 2,
                    label: 'Productos por Estado',
                    expectsFillArray: 'productsByState',
                    type: 'pie'
                }
            ]
        },
        {
            label: 'Inventario',
            description: 'Descripción de la pestaña de productos por estado',
            useMenu: true,
            graphs: [
                {
                    id: 1,
                    label: 'Costo por mes',
                    type: 'line',
                    expectsFillArray: 'costData',
                    axis: {
                        x: 'month',
                        y: 'cost'
                    }
                },
                {
                    id: 2,
                    label: 'Entrada por mes',
                    type: 'line',
                    expectsFillArray: 'entryData',
                    axis: {
                        x: 'month',
                        y: 'entry'
                    }
                }
            ]
        }
    ]
};

const maintenanceModule: ModuleFormGridData = {
    url: '/api/maintenance/tools',
    label: 'Mantenimiento',
    description: 'Aquí puedes ver el mantenimiento de tus herramientas.',
    icon: Build,
    columns: {
        config: {
            gridSpacing: 2
        },
        data: [
            {
                field: 'picture',
                headerName: 'Imagen',
                inputConfig: {
                    size: 12,
                    id: 'picture'
                },
                flex: 1,
                renderCell: PictureCell
            },
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
                field: 'brand',
                headerName: 'Marca',
                inputConfig: {
                    size: 12,
                    id: 'brand'
                },
                flex: 1,
            },
            {
                field: 'state',
                headerName: 'Estado',
                inputConfig: {
                    size: 12,
                    id: 'state'
                },
                flex: 1,
            }
        ]
    },
    actions: {
        config: {
            field: 'actions',
            headerName: 'Acciones',
            width: 150
        },
        data: [
            {
                name: 'Cambiar estado',
                icon: ChangeCircle,
                dispatch: StateModal
            },
        ]
    },
    config: {
        rowHeight: 100,
        inputConfig: {
            allowCheckboxSelection: false
        },
        toolbar: {
            show: ['quickFilter', 'columns']
        }
    }
}

export default function StockPage() {
    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
                <ModuleStats moduleStats={stockStats} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} sx={{ height: 604 }}>
                <ModuleDataGrid moduleSettings={maintenanceModule} />
            </Grid>
            <Grid size={12}>
                <ModuleDataGrid
                    moduleSettings={StockModule}
                />
            </Grid>
        </Grid>
    )
}
