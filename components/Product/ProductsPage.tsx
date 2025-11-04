'use client';

import ModuleDataGrid from "../ModuleDataGrid"
import { ModuleFormGridData } from "@/types/datagrid/datagrid"
import { ProductSchema } from "@/lib/definitions";

export const ProductModule: ModuleFormGridData = {
    url: '/api/stock/product',
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
                    id: 'name',
                    dataGridHidden: false,
                    hideIfUpdate: false
                }
            },
            {
                field: 'isTool',
                headerName: 'Es herramienta',
                inputConfig: {
                    size: 12,
                    id: 'isTool',
                    dataGridHidden: true,
                    switch: {
                        label: 'Es una herramienta',
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
                            'pcs',
                            'mtr',
                        ]
                    }
                }
            }
        ]
    },
    config: {
        toolbar: {
            show: ['quickFilter', 'columns', 'export', 'export', 'filter', 'density', 'add', 'delete']
        },
        create: {
            name: 'Crear producto',
            description: 'Crear producto',
            validation: ProductSchema
        }
    }
}


export default function ProductsPage() {
    return <ModuleDataGrid moduleSettings={ProductModule}/>
}
