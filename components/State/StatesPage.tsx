'use client';

import ModuleDataGrid from "../ModuleDataGrid"
import { ModuleFormGridData } from "@/types/datagrid/datagrid"
import { Build } from "@mui/icons-material";

const StateModule: ModuleFormGridData = {
    url: '/api/stock/state',
    label: 'Estados',
    description: 'Aquí puedes ver y gestionar los estados de tus productos.',
    icon: Build,
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
        create: {
            name: 'Crear estado',
            description: 'Crear estado'
        },
        edit: {
            name: 'Editar estado',
            description: 'Editar estado'
        },
        delete: {
            hiddenAction: false
        },
        toolbar: {
            show: ['quickFilter', 'columns', 'export', 'export', 'filter', 'density', 'add', 'delete']
        }
    }
}


export default function StatesPage() {
    return <ModuleDataGrid moduleSettings={StateModule}/>
}
