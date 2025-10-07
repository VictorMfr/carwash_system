import Operator, { OperatorCreationAttributes } from "../../models/service/operator";

export const defaultOperators: Omit<OperatorCreationAttributes, 'id' | 'created_at' | 'updated_at' | 'deleted_at' | 'avatar'>[] = [
    {
        name: 'Juan',
        lastname: 'Pérez',
        phone: '3001234567',
        address: 'Calle 123 #45-67'
    },
    {
        name: 'María',
        lastname: 'González',
        phone: '3002345678',
        address: 'Carrera 45 #78-90',
    },
    {
        name: 'Carlos',
        lastname: 'Rodríguez',
        phone: '3003456789',
        address: 'Avenida 67 #12-34',
    },
    {
        name: 'Ana',
        lastname: 'Martínez',
        phone: '3004567890',
        address: 'Calle 89 #56-78',
    },
    {
        name: 'Luis',
        lastname: 'Hernández',
        phone: '3005678901',
        address: 'Carrera 12 #34-56',
    }
];

export default async function createOperators() {
    const operators = await Operator.bulkCreate(defaultOperators);

    if (operators.length > 0) {
        console.log('Operators created');
    } else {
        console.log('Operators already exist');
    }
}
