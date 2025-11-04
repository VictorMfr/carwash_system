'use client';

import { ProductSchema, RecipeSchema } from "@/lib/definitions";
import ModuleDataGrid from "../ModuleDataGrid"
import { ModuleFormGridData } from "@/types/datagrid/datagrid"
import { ProductModule } from "../Product/ProductsPage";
import { Fragment } from "react";
import { Typography } from "@mui/material";

export const RecipeModule: ModuleFormGridData = {
    url: '/api/service/recipe',
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
            show: ['export', 'filter', 'columns', 'density', 'quickFilter', 'add', 'delete'],
        },
        create: {
            name: 'Crear receta',
            description: 'Crear receta',
            validation: RecipeSchema
        },
        edit: {
            name: 'Editar receta',
            description: 'Editar receta',
            validation: RecipeSchema
        },
        delete: {
            hiddenAction: false
        }
    }
}


export default function RecipesPage() {
    return <ModuleDataGrid moduleSettings={RecipeModule} />
}
