'use client';

import { BrandSchema } from "@/lib/definitions";
import ModuleDataGrid from "../ModuleDataGrid"
import { ModuleFormGridData } from "@/types/datagrid/datagrid"
import { Build } from "@mui/icons-material";

const BrandModule: ModuleFormGridData = {
    url: '/api/stock/brand',
    label: 'Marcas',
    description: 'Aquí puedes ver y gestionar las marcas de tus productos.',
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
        toolbar: {
            show: ['quickFilter', 'columns', 'export', 'export', 'filter', 'density', 'add', 'delete']
        },
        create: {
            name: 'Crear marca',
            description: 'Crear marca',
            validation: BrandSchema
        },
        edit: {
            name: 'Editar marca',
            description: 'Editar marca',
            validation: BrandSchema
        },
        delete: {
            hiddenAction: false
        }
    }
}


export default function BrandPage() {
    return <ModuleDataGrid moduleSettings={BrandModule}/>
}
