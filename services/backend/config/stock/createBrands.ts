import Brand, { BrandCreationAttributes } from "../../models/stock/brand";

export const defaultBrands: Omit<BrandCreationAttributes, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>[] = [
    // Tools Product brands
    {
        name: 'Makita'
    },
    {
        name: 'Bosch'
    },
    {
        name: 'Dewalt'
    },
    {
        name: 'Black & Decker'
    },
    {
        name: 'Hitachi'
    },
    {
        name: 'DeWalt'
    },
    {
        name: 'Milwaukee'
    }
]

export default async function createBrands() {
    const brands = await Brand.bulkCreate(defaultBrands);

    if (brands.length > 0) {
        console.log('Brands created');
    } else {
        console.log('Brands already exist');
    }
}