'use client';

import { OperatorSchema } from "@/lib/definitions";
import ModuleDataGrid from "../ModuleDataGrid"
import { ModuleFormGridData } from "@/types/datagrid/datagrid"

const OperatorModule: ModuleFormGridData = {
    url: '/api/service/operator',
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
                field: 'lastname',
                headerName: 'Apellido',
                inputConfig: {
                    size: 12,
                    id: 'lastname'
                }
            },  
            {
                field: 'phone',
                headerName: 'Teléfono',
                inputConfig: {
                    size: 12,
                    id: 'phone'
                }
            },
            {
                field: 'address',
                headerName: 'Dirección',
                inputConfig: {
                    size: 12,
                    id: 'address'
                }
            },
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
            name: 'Crear operador',
            description: 'Crear operador',
            validation: OperatorSchema
        },
        edit: {
            name: 'Editar operador',
            description: 'Editar operador',
            validation: OperatorSchema
        },
        delete: {
            hiddenAction: false
        }
    }
}


export default function OperatorsPage() {
    return <ModuleDataGrid moduleSettings={OperatorModule}/>
}
