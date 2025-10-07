import Account, { AccountCreationAttributes } from "../../models/finance/account";

export const defaultAccounts: Omit<AccountCreationAttributes, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>[] = [
    {
        name: 'Cuenta Principal',
        description: 'Cuenta principal de la empresa'
    },
    {
        name: 'Cuenta de Ahorros',
        description: 'Cuenta de ahorros para emergencias'
    },
    {
        name: 'Cuenta de Inversión',
        description: 'Cuenta para inversiones a largo plazo'
    },
    {
        name: 'Cuenta de Gastos',
        description: 'Cuenta para gastos de la empresa'
    },
    {
        name: 'Cuenta de Ingresos',
        description: 'Cuenta para ingresos de la empresa'
    }
]

export default async function createAccounts() {
    const accounts = await Account.bulkCreate(defaultAccounts);

    if (accounts.length > 0) {
        console.log('Accounts created');
    } else {
        console.log('Accounts already exist');
    }
}