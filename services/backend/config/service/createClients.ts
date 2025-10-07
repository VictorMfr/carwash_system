import Client, { ClientCreationAttributes } from "../../models/service/client";

export const defaultClients: Omit<ClientCreationAttributes, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>[] = [
    {
        name: 'Roberto',
        lastname: 'Silva',
        phone: '3001111111'
    },
    {
        name: 'Carmen',
        lastname: 'López',
        phone: '3002222222'
    },
    {
        name: 'Fernando',
        lastname: 'García',
        phone: '3003333333'
    },
    {
        name: 'Isabel',
        lastname: 'Morales',
        phone: '3004444444'
    },
    {
        name: 'Diego',
        lastname: 'Ramírez',
        phone: '3005555555'
    },
    {
        name: 'Patricia',
        lastname: 'Castro',
        phone: '3006666666'
    },
    {
        name: 'Andrés',
        lastname: 'Vargas',
        phone: '3007777777'
    },
    {
        name: 'Lucía',
        lastname: 'Jiménez',
        phone: '3008888888'
    },
    {
        name: 'Sergio',
        lastname: 'Torres',
        phone: '3009999999'
    },
    {
        name: 'Valentina',
        lastname: 'Ruiz',
        phone: '3000000000'
    }
];

export default async function createClients() {
    const clients = await Client.bulkCreate(defaultClients);

    if (clients.length > 0) {
        console.log('Clients created');
    } else {
        console.log('Clients already exist');
    }
}
