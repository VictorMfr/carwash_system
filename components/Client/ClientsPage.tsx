'use client';

import ModuleDataGrid from "../ModuleDataGrid"
import { ModuleFormGridData } from "@/types/datagrid/datagrid"

const ClientModule: ModuleFormGridData = {
    url: '/api/service/client',
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
                    id: 'phone',
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
        data: []
    },
    config: {
        toolbar: {
            show: ['quickFilter', 'columns', 'export', 'export', 'filter', 'density', 'add', 'delete']
        },
        create: {
            name: 'Crear cliente',
            description: 'Crear cliente'
        },
        edit: {
            name: 'Editar cliente',
            description: 'Editar cliente'
        }
    }
}


export default function ClientsPage() {
    return <ModuleDataGrid moduleSettings={ClientModule}/>
}
