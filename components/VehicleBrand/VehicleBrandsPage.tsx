'use client';

import ModuleDataGrid from "../ModuleDataGrid"
import { ModuleFormGridData } from "@/types/datagrid/datagrid"

const VehicleBrandModule: ModuleFormGridData = {
    url: '/api/service/vehicle/brand',
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
            name: 'Crear marca',
            description: 'Crear marca'
        },
        edit: {
            name: 'Editar marca',
            description: 'Editar marca'
        },
        delete: {
            hiddenAction: false
        }
    }
}


export default function VehicleBrandsPage() {
    return <ModuleDataGrid moduleSettings={VehicleBrandModule}/>
}
