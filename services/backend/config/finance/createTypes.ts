import Type, { TypeCreationAttributes } from "../../models/finance/type";

export const defaultTypes: Omit<TypeCreationAttributes, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>[] = [
    {
        name: 'Ingreso'
    },
    {
        name: 'Gasto'
    },
    {
        name: 'Transferencia'
    }
];

export default async function createTypes() {
    const types = await Type.bulkCreate(defaultTypes);

    if (types.length > 0) {
        console.log('Types created');
    } else {
        console.log('Types already exist');
    }
}