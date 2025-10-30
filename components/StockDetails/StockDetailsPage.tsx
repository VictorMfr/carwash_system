'use client';

import { ModuleFormGridData } from "@/types/datagrid/datagrid";
import ModuleDataGrid from "../ModuleDataGrid";
import PictureCell from "../ModuleDataGrid/PictureCell";

const stockDetailsSettings: ModuleFormGridData = {
    url: '/api/stock/details',
    columns: {
        config: {
            gridSpacing: 2
        },
        stepper: {
            orientation: 'horizontal',
            steps: [
                {
                    title: 'Llena los campos',
                    description: 'Llena los campos para agregar un nuevo stock',
                    label: 'Llena los campos',
                    config: {
                        gridSpacing: 2
                    },
                    data: [
                        {
                            field: 'quantity',
                            headerName: 'Cantidad',
                            inputConfig: {
                                size: 12,
                                id: 'quantity',
                                number: {}
                            },
                            width: 100,
                        },
                        {
                            field: 'price',
                            headerName: 'Precio',
                            inputConfig: {
                                size: 12,
                                id: 'price',
                                number: {
                                    adornment: () => <>$</>,
                                    adornmentPosition: 'start'
                                }
                            },
                            width: 70,
                        },
                        {
                            field: 'entry_date',
                            headerName: 'Fecha de entrada',
                            inputConfig: {
                                size: 12,
                                id: 'entry_date',
                                date: {}
                            },
                            width: 150,
                        },
                        {
                            field: 'brand',
                            headerName: 'Marca',
                            inputConfig: {
                                size: 12,
                                id: 'brand',
                                autocomplete: {
                                    url: '/api/stock/brand',
                                    label: 'Marca',
                                    loadingType: 'screen',
                                    newItemLabel: 'Agregar marca',
                                    confirm: {
                                        title: 'Agregar marca',
                                        message: '¿Estás seguro de querer agregar esta marca?',
                                        successMessage: 'Marca agregada correctamente',
                                    },
                                    labelField: 'name',

                                }
                            },
                        },
                        {
                            field: 'state',
                            headerName: 'Estado',
                            inputConfig: {
                                size: 12,
                                id: 'state',
                                autocomplete: {
                                    url: '/api/stock/state',
                                    label: 'Estado',
                                    loadingType: 'screen',
                                    newItemLabel: 'Agregar estado',
                                    confirm: {
                                        title: 'Agregar estado',
                                        message: '¿Estás seguro de querer agregar este estado?',
                                        successMessage: 'Estado agregado correctamente',
                                    },
                                    labelField: 'name',
                                }
                            },
                        }
                    ]
                },
                {
                    title: 'Agrega una imagen',
                    description: 'Agrega una imagen al stock',
                    label: 'Agrega una imagen',
                    config: {
                        gridSpacing: 2
                    },
                    data: [
                        {
                            field: 'picture',
                            headerName: 'Imagen',
                            inputConfig: {
                                size: 12,
                                id: 'picture',
                                picture: {
                                    title: 'Imagen',
                                    description: 'Agrega una imagen al stock',
                                    suggestion: 'Sube una imagen para el stock',
                                },
                            },
                            width: 150,
                            renderCell: PictureCell
                        }
                    ]
                }
            ]
        }
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
        rowHeight: 100,
        create: {
            contentType: 'multipart/form-data'
        },
        edit: {
            contentType: 'multipart/form-data'
        },
        delete: {
            hiddenAction: false
        },
        toolbar: {
            show: ['quickFilter', 'columns', 'export', 'export', 'filter', 'density', 'add', 'delete']
        }
    }
}

export default function StockDetailsPage({ stockId }: { stockId: string }) {
    stockDetailsSettings.url = `/api/stock/${stockId}/details`;
    return <ModuleDataGrid moduleSettings={stockDetailsSettings} />
}