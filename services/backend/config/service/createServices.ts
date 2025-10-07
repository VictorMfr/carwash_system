import { Service, Recipe, Operator, Vehicle, StockDetails, Client, VehicleBrand, VehicleModel } from "../../models/associations";
import { defaultRecipes } from "./createRecipes";
import { defaultOperators } from "./createOperators";
import { defaultVehicles } from "./createVehicles";
import { ServiceCreationAttributes } from "../../models/service/service";
import { defaultClients } from "./createClients";
import { defaultVehicleBrands } from "./createVehicleBrands";
import { defaultVehicleModels } from "./createVehicleModels";

export const defaultServices: Omit<ServiceCreationAttributes, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>[] = [
    {
        date: new Date()
    },
    {
        date: new Date()
    },
    {
        date: new Date()
    },
    {
        date: new Date()
    },
    {
        date: new Date()
    },
    {
        date: new Date()
    },
    {
        date: new Date()
    },
    {
        date: new Date()
    },
    {
        date: new Date()
    },
    {
        date: new Date()
    }
];

export default async function createServices() {
    const services = await Service.bulkCreate(defaultServices);

    for (const service of services) {
        // recipe
        await service.createRecipe(defaultRecipes[Math.floor(Math.random() * defaultRecipes.length)] as Recipe);
        // vehicle
        const vehicle = await service.createVehicle(defaultVehicles[Math.floor(Math.random() * defaultVehicles.length)] as Vehicle);

        // brand
        await vehicle.createBrand(defaultVehicleBrands[Math.floor(Math.random() * defaultVehicleBrands.length)] as VehicleBrand);
        // model
        await vehicle.createModel(defaultVehicleModels[Math.floor(Math.random() * defaultVehicleModels.length)] as VehicleModel);

        // client
        await vehicle.createClient(defaultClients[Math.floor(Math.random() * defaultClients.length)] as Client);

        // 4 random operators
        for (let i = 0; i < 4; i++) {
            await service.createOperator(defaultOperators[Math.floor(Math.random() * defaultOperators.length)] as Operator);
        }
    }
}
