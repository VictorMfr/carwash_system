'use client';

import ModuleDataGrid from "../ModuleDataGrid"
import { ModuleFormGridData } from "@/types/datagrid/datagrid"

const RecipeModule: ModuleFormGridData = {
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
                    id: 'name',
                }
            },
        ]
    },
    config: {
        create: {
            name: 'Crear receta',
            description: 'Crear receta'
        }
    }
}


export default function RecipesPage() {
    return <ModuleDataGrid moduleSettings={RecipeModule}/>
}
