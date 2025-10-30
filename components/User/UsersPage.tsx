'use client';

import ModuleDataGrid from "../ModuleDataGrid";
import { UserCreateSchema, UserUpdateSchema } from "@/lib/definitions";
import AssignRoleModal from "./AssignRoleModal";
import AssignmentIcon from '@mui/icons-material/Assignment';
import { ModuleFormGridData } from "@/types/datagrid/datagrid";


const UserModule: ModuleFormGridData = {
    url: '/api/user',
    columns: {
        config: {
            gridSpacing: 2
        },
        data: [
            {
                field: 'name',
                headerName: 'Nombre',
                inputConfig: {
                    size: 6,
                    id: 'name'
                },
                flex: 1
            },
            {
                field: 'lastname',
                headerName: 'Apellido',
                inputConfig: {
                    size: 6,
                    id: 'lastname'
                },
                flex: 1
            },
            {
                field: 'email',
                headerName: 'Email',
                inputConfig: {
                    size: 6,
                    id: 'email'
                },
                flex: 1
            },
            {
                field: 'phone',
                headerName: 'Teléfono',
                inputConfig: {
                    size: 6,
                    id: 'phone'
                },
                flex: 1
            },
            {
                field: 'address',
                headerName: 'Dirección',
                inputConfig: {
                    size: 6,
                    id: 'address'
                },
                flex: 1
            },
            {
                field: 'password',
                headerName: 'Contraseña',
                inputConfig: {
                    size: 6,
                    TextFieldProps: {
                        type: 'password',
                        id: 'password'
                    },
                    hideIfUpdate: true,
                    dataGridHidden: true,
                    id: 'password'
                },
                flex: 1
            }
        ]
    },
    actions: {
        config: {
            field: 'actions',
            headerName: 'Acciones',
            width: 150
        },
        data: [
            {
                name: 'Asignar rol',
                icon: AssignmentIcon,
                dispatch: AssignRoleModal
            }
        ]
    },
    config: {
        toolbar: {
            show: ['quickFilter', 'columns', 'export', 'export', 'filter', 'density', 'add', 'delete']
        },
        create: {
            name: 'Crear usuario',
            description: 'Llena los campos para crear un nuevo usuario',
            validation: UserCreateSchema
        },
        edit: {
            name: 'Editar usuario',
            description: 'Llena los campos para editar el usuario',
            validation: UserUpdateSchema
        },
        delete: {
            hiddenAction: false
        }
    }
}

export default function UsersPage() {
    return <ModuleDataGrid moduleSettings={UserModule} />
}