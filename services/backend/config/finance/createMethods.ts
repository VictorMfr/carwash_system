import Method, { MethodCreationAttributes } from "../../models/finance/method";

export const defaultMethods: Omit<MethodCreationAttributes, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>[] = [
    {
        name: 'Efectivo'
    },
    {
        name: 'Transferencia'
    },
    {
        name: 'Tarjeta de Crédito'
    },
    {
        name: 'Cheque'
    },
    {
        name: 'Transferencia Bancaria'
    },
    {
        name: 'Tarjeta de Débito'
    },
    {
        name: 'Transferencia Electrónica'
    }
]

export default async function createMethods() {
    const methods = await Method.bulkCreate(defaultMethods);

    if (methods.length > 0) {
        console.log('Methods created');
    } else {
        console.log('Methods already exist');
    }
}