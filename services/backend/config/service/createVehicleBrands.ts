import VehicleBrand, { BrandCreationAttributes } from "../../models/service/vehicle/brand";

export const defaultVehicleBrands: Omit<BrandCreationAttributes, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>[] = [
    {
        name: 'Toyota'
    },
    {
        name: 'Honda'
    },
    {
        name: 'Nissan'
    },
    {
        name: 'Mazda'
    },
    {
        name: 'Hyundai'
    },
    {
        name: 'Kia'
    },
    {
        name: 'Ford'
    },
    {
        name: 'Chevrolet'
    },
    {
        name: 'Volkswagen'
    },
    {
        name: 'BMW'
    },
    {
        name: 'Mercedes-Benz'
    },
    {
        name: 'Audi'
    }
];

export default async function createVehicleBrands() {
    const brands = await VehicleBrand.bulkCreate(defaultVehicleBrands);

    if (brands.length > 0) {
        console.log('Vehicle brands created');
    } else {
        console.log('Vehicle brands already exist');
    }
}
