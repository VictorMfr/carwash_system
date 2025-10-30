'use client';

import ModuleDataGrid from "../ModuleDataGrid"
import { ModuleFormGridData } from "@/types/datagrid/datagrid"

const RoleModule: ModuleFormGridData = {
    url: '/api/role',
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
        inputConfig: {
            allowCheckboxSelection: false
        },
        toolbar: {
            show: ['quickFilter', 'columns', 'export', 'export', 'filter', 'density']
        },
        edit: {
            name: 'Editar rol',
            description: 'Llena los campos para editar el rol',
        },
    }
}


export default function RolesPage() {
    return <ModuleDataGrid moduleSettings={RoleModule}/>
}
