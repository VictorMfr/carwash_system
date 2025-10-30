'use client';

import { MethodSchema } from "@/lib/definitions";
import ModuleDataGrid from "../ModuleDataGrid"
import { ModuleFormGridData } from "@/types/datagrid/datagrid"

const MethodModule: ModuleFormGridData = {
    url: '/api/finance/method',
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
        toolbar: {
            show: ['quickFilter', 'columns', 'export', 'export', 'filter', 'density', 'add', 'delete']
        },
        create: {
            name: 'Crear metodo',
            description: 'Crear metodo',
            validation: MethodSchema
        },
        edit: {
            name: 'Editar metodo',
            description: 'Editar metodo',
            validation: MethodSchema
        },
        delete: {
            hiddenAction: false
        }
    }
}


export default function MethodsPage() {
    return <ModuleDataGrid moduleSettings={MethodModule}/>
}
