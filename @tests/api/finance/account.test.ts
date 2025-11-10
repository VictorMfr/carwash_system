/** @jest-environment node */
import { POST, GET, DELETE } from "@/app/api/finance/account/route";
import { GET as GETAccount, PUT as PUTAccount, DELETE as DELETEAccount } from "@/app/api/finance/account/[id]/route";
import { Account } from "@/services/backend/models/associations";
import { toObject } from "../../util";

const testAccountOne = {
    json: async () => [
        { field: 'name', value: 'Test Account One' },
        { field: 'description', value: 'Test Account Description One' },
    ] as any,
} as any;

const testAccountTwo = {
    json: async () => [
        { field: 'name', value: 'Test Account Two' },
        { field: 'description', value: 'Test Account Description Two' },
    ] as any,
} as any;

describe('Rutas de cuenta', () => {

    // Crear cuenta
    test('Crear cuenta', async () => {
        const testData = {
            json: async () => toObject(await testAccountOne.json())
        } as any;

        const test = await POST(testData);
        const account = await test.json();
        expect(test.status).toBe(200);
        
        // Delete account
        await (await Account.findByPk(account.id))?.destroy({ force: true });
    });

    // Obtener cuentas
    test('Obtener cuentas', async () => {
        const accounts = await GET();
        expect(accounts.status).toBe(200);
    });

    // Visualizar cuenta
    test('Visualizar cuenta', async () => {
        const account = await GETAccount(null as any, { params: Promise.resolve({ id: '1' }) });
        expect(account.status).toBe(200);
    });

    // Actualizar cuenta
    test('Actualizar cuenta', async () => {
        const account = await Account.create(toObject(await testAccountOne.json()));
        const testData = {
            json: async () => toObject(await testAccountOne.json())
        } as any;

        const response = await PUTAccount(testData, { params: Promise.resolve({ id: account.id.toString() }) });
        expect(response.status).toBe(200);
        await account.destroy({ force: true });
    });

    // Borrar cuenta
    test('Borrar cuenta', async () => {
        const account = await Account.create(toObject(await testAccountOne.json()));
        const response = await DELETEAccount(null as any, { params: Promise.resolve({ id: account.id.toString() }) });
        expect(response.status).toBe(200);
        await account.destroy({ force: true });
    });

    // Borrar multiple cuentas
    test('Borrar multiple cuentas', async () => {
        const accountOne = await Account.create(toObject(await testAccountOne.json()));
        const accountTwo = await Account.create(toObject(await testAccountTwo.json()));

        const request = { json: async () => ({ ids: [accountOne.id.toString(), accountTwo.id.toString()] }) } as any;

        const response = await DELETE(request);
        expect(response.status).toBe(200);

        await accountOne.destroy({ force: true });
        await accountTwo.destroy({ force: true });
    });
});

