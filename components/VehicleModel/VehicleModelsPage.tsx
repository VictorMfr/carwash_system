'use client';

import ModuleDataGrid from "../ModuleDataGrid"
import { ModuleFormGridData } from "@/types/datagrid/datagrid"

const VehicleModelModule: ModuleFormGridData = {
    url: '/api/service/vehicle/model',
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
            name: 'Crear modelo',
            description: 'Crear modelo'
        },
        edit: {
            name: 'Editar modelo',
            description: 'Editar modelo'
        }
    }
}


export default function VehicleModelsPage() {
    return <ModuleDataGrid moduleSettings={VehicleModelModule}/>
}
