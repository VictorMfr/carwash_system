/** @jest-environment node */
import { POST, GET, DELETE } from "@/app/api/user/route";
import { GET as GETUser, PUT as PUTUser, DELETE as DELETEUser } from "@/app/api/user/[id]/route";
import { User } from "@/services/backend/models/associations";
import { toObject } from "../util";

const testUserOne = {
    json: async () => [
        { field: 'name', value: 'John' },
        { field: 'lastname', value: 'Doe' },
        { field: 'phone', value: '1234567890' },
        { field: 'address', value: '123 Main St' },
        { field: 'email', value: 'john.doe@example.com' },
        { field: 'password', value: 'password123' },
    ] as any,
} as any;

const testUserTwo = {
    json: async () => [
        { field: 'name', value: 'Jane' },
        { field: 'lastname', value: 'Doe' },
        { field: 'phone', value: '1234567890' },
        { field: 'address', value: '123 Main St' },
        { field: 'email', value: 'jane.doe@example.com' },
        { field: 'password', value: 'password123' },
    ] as any,
} as any;

describe('Rutas de usuario', () => {

    // Crear usuario
    test('Crear usuario', async () => {
        const test = await POST(testUserOne);
        const user = await test.json();
        expect(test.status).toBe(200);
        
        // Delete user
        await (await User.findByPk(user.id))?.destroy({ force: true });
    });

    // Obtener usuarios
    test('Obtener usuarios', async () => {
        const user = await GET();
        expect(user.status).toBe(200);
    });

    // Visualizar usuario
    test('Visualizar usuario', async () => {
        const user = await GETUser(null as any, { params: Promise.resolve({ id: '1' }) });
        expect(user.status).toBe(200);
    });

    // Actualizar usuario
    test('Actualizar usuario', async () => {
        const user = await User.create(toObject(await testUserOne.json()));
        const response = await PUTUser(testUserOne, { params: Promise.resolve({ id: user.id.toString() }) });
        expect(response.status).toBe(200);
        await user.destroy({ force: true });
    });

    // Borrar usuario (soft delete)
    test('Borrar usuario', async () => {
        const user = await User.create(toObject(await testUserOne.json()));
        const response = await DELETEUser(null as any, { params: Promise.resolve({ id: user.id.toString() }) });
        expect(response.status).toBe(200);
        await user.destroy({ force: true });
    });

    // Borrar multiple usuarios (soft delete)
    test('Borrar multiple usuarios', async () => {
        const userOne = await User.create(toObject(await testUserOne.json()));
        const userTwo = await User.create(toObject(await testUserTwo.json()));

        const request = { json: async () => ({ ids: [userOne.id.toString(), userTwo.id.toString()] }) } as any;

        const response = await DELETE(request);
        expect(response.status).toBe(200);

        await userOne.destroy({ force: true });
        await userTwo.destroy({ force: true });
    });
});