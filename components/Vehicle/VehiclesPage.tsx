'use client';

import ModuleDataGrid from "../ModuleDataGrid"
import { ModuleFormGridData } from "@/types/datagrid/datagrid"

const VehicleModule: ModuleFormGridData = {
    url: '/api/service/vehicle',
    columns: {
        config: {
            gridSpacing: 2
        },
        data: [
            {
                field: 'license_plate',
                headerName: 'Placa',
                inputConfig: {
                    size: 12,
                    id: 'license_plate'
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
            name: 'Crear vehículo',
            description: 'Crear vehículo'
        },
        edit: {
            name: 'Editar vehículo',
            description: 'Editar vehículo'
        }
    }
}


export default function VehiclesPage() {
    return <ModuleDataGrid moduleSettings={VehicleModule}/>
}
