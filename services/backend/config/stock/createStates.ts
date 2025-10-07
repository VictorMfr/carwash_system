import State, { StateCreationAttributes } from "../../models/stock/state";

export const defaultStates: Omit<StateCreationAttributes, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>[] = [
    {
        name: 'Nuevo'
    },
    {
        name: 'Usado - Excelente'
    },
    {
        name: 'Usado - Bueno'
    },
    {
        name: 'Usado - Regular'
    },
    {
        name: 'Dañado'
    }
]

export default async function createStates() {
    const states = await State.bulkCreate(defaultStates);

    if (states.length > 0) {
        console.log('States created');
    } else {
        console.log('States already exist');
    }
}