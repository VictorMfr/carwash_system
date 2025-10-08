import { Vehicle } from "../../models/associations";
import { VehicleCreationAttributes } from "../../models/service/vehicle/vehicle";

type VehicleSeed =
    Pick<VehicleCreationAttributes, 'license_plate'> &
    Partial<Pick<VehicleCreationAttributes, 'brandId' | 'modelId'>>;

export const defaultVehicles: VehicleSeed[] = [
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
    const vehicles = await Vehicle.bulkCreate(defaultVehicles as unknown as VehicleCreationAttributes[]);
}
