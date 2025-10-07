import Product, { ProductCreationAttributes } from "../../models/stock/product";

export const defaultProducts: Omit<ProductCreationAttributes, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>[] = [
    {
        name: 'Aceite',
        unit: 'lt',
        isTool: false
    },
    {
        name: 'Frenos',
        unit: 'u',
        isTool: true
    },
    {
        name: 'Llantas',
        unit: 'u',
        isTool: true
    },
    {
        name: 'Frenos',
        unit: 'u',
        isTool: true
    },
    {
        name: 'Frenos',
        unit: 'u',
        isTool: true
    }
]

export default async function createProducts() {
    const products = await Product.bulkCreate(defaultProducts);

    if (products.length > 0) {
        console.log('Products created');
    } else {
        console.log('Products already exist');
    }
}