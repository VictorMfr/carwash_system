import { Transaction } from "../../models/associations";
import Method from "../../models/finance/method";
import Type from "../../models/finance/type";
import Account from "../../models/finance/account";
import { defaultMethods } from "./createMethods";
import { defaultTypes } from "./createTypes";
import { defaultAccounts } from "./createAccounts";
import { TransactionCreationAttributes } from "../../models/finance/transaction";

export const defaultTransactions: Omit<TransactionCreationAttributes, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>[] = [
    {
        date: new Date(),
        amount: 100000,
        description: 'Venta de servicio cambio de aceite',
        dolar_rate: 3800,
        name: 'Venta de servicio cambio de aceite'
    },
    {
        date: new Date(),
        amount: 100000,
        description: 'Venta de servicio revisión de frenos',
        dolar_rate: 3800,
        name: 'Venta de servicio revisión de frenos'
    },
    {
        date: new Date(),
        amount: 100000,
        description: 'Compra de llantas nuevas',
        dolar_rate: 3800,
        name: 'Compra de llantas nuevas'
    },
    {
        date: new Date(),
        amount: 100000,
        description: 'Venta de servicio cambio de aceite',
        dolar_rate: 3800,
        name: 'Venta de servicio cambio de aceite'
    },
    {
        date: new Date(),
        amount: 100000,
        description: 'Venta de servicio revisión de frenos',
        dolar_rate: 3800,
        name: 'Venta de servicio revisión de frenos'
    },
    {
        date: new Date(),
        amount: 100000,
        description: 'Compra de llantas nuevas',
        dolar_rate: 3800,
        name: 'Compra de llantas nuevas'
    },
    {
        date: new Date(),
        amount: 100000,
        description: 'Venta de servicio cambio de aceite',
        dolar_rate: 3800,
        name: 'Venta de servicio cambio de aceite'
    },
    {
        date: new Date(),
        amount: 100000,
        description: 'Venta de servicio revisión de frenos',
        dolar_rate: 3800,
        name: 'Venta de servicio revisión de frenos'
    },
    {
        date: new Date(),
        amount: 100000,
        description: 'Venta de servicio revisión de frenos',
        dolar_rate: 3800,
        name: 'Venta de servicio revisión de frenos'
    }
]

export default async function createTransactions() {
    const transactions = await Transaction.bulkCreate(defaultTransactions);

    if (transactions.length == 0) {
        console.log('Transactions created');
    }

    transactions.forEach(async (transaction) => {
        await transaction.createMethod(defaultMethods[Math.floor(Math.random() * defaultMethods.length)] as Method);
        await transaction.createType(defaultTypes[Math.floor(Math.random() * defaultTypes.length)] as Type);
        await transaction.createAccount(defaultAccounts[Math.floor(Math.random() * defaultAccounts.length)] as Account);
    });
}