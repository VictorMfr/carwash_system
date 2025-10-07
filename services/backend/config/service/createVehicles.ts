import { Vehicle, VehicleBrand, VehicleModel, Client } from "../../models/associations";
import { defaultVehicleBrands } from "./createVehicleBrands";
import { defaultVehicleModels } from "./createVehicleModels";
import { defaultClients } from "./createClients";
import { VehicleCreationAttributes } from "../../models/service/vehicle/vehicle";

export const defaultVehicles: Omit<VehicleCreationAttributes, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>[] = [
    {
        license_plate: 'ABC-123'
    },
    {
        license_plate: 'DEF-456'
    },
    {
        license_plate: 'GHI-789'
    },
    {
        license_plate: 'JKL-012'
    },
    {
        license_plate: 'MNO-345'
    },
    {
        license_plate: 'PQR-678'
    },
    {
        license_plate: 'STU-901'
    },
    {
        license_plate: 'VWX-234'
    },
    {
        license_plate: 'YZA-567'
    },
    {
        license_plate: 'BCD-890'
    }
];

export default async function createVehicles() {
    const vehicles = await Vehicle.bulkCreate(defaultVehicles);
}
