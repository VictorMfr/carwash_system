import VehicleModel, { ModelCreationAttributes } from "../../models/service/vehicle/model";

export const defaultVehicleModels: Omit<ModelCreationAttributes, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>[] = [
    {
        name: 'Corolla'
    },
    {
        name: 'Camry'
    },
    {
        name: 'RAV4'
    },
    {
        name: 'Civic'
    },
    {
        name: 'Accord'
    },
    {
        name: 'CR-V'
    },
    {
        name: 'Sentra'
    },
    {
        name: 'Altima'
    },
    {
        name: 'Rogue'
    },
    {
        name: 'CX-5'
    },
    {
        name: 'Mazda3'
    },
    {
        name: 'Mazda6'
    },
    {
        name: 'Elantra'
    },
    {
        name: 'Sonata'
    },
    {
        name: 'Tucson'
    },
    {
        name: 'Forte'
    },
    {
        name: 'Optima'
    },
    {
        name: 'Sorento'
    },
    {
        name: 'Focus'
    },
    {
        name: 'Fusion'
    },
    {
        name: 'Escape'
    },
    {
        name: 'Cruze'
    },
    {
        name: 'Malibu'
    },
    {
        name: 'Equinox'
    },
    {
        name: 'Golf'
    },
    {
        name: 'Jetta'
    },
    {
        name: 'Tiguan'
    },
    {
        name: 'X3'
    },
    {
        name: 'X5'
    },
    {
        name: 'C-Class'
    },
    {
        name: 'E-Class'
    },
    {
        name: 'A4'
    },
    {
        name: 'A6'
    }
];

export default async function createVehicleModels() {
    const models = await VehicleModel.bulkCreate(defaultVehicleModels);

    if (models.length > 0) {
        console.log('Vehicle models created');
    } else {
        console.log('Vehicle models already exist');
    }
}
