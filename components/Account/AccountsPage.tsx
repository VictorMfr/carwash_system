'use client';

import { AccountSchema } from "@/lib/definitions";
import ModuleDataGrid from "../ModuleDataGrid"
import { ModuleFormGridData } from "@/types/datagrid/datagrid"

const AccountModule: ModuleFormGridData = {
    url: '/api/finance/account',
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
                field: 'description',
                headerName: 'Descripción',
                inputConfig: {
                    size: 12,
                    id: 'description'
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
            name: 'Crear cuenta',
            description: 'Crear cuenta',
            validation: AccountSchema
        },
        edit: {
            name: 'Editar cuenta',
            description: 'Editar cuenta',
            validation: AccountSchema
        },
        delete: {
            hiddenAction: false
        }
    }
}


export default function AccountsPage() {
    return <ModuleDataGrid moduleSettings={AccountModule}/>
}
