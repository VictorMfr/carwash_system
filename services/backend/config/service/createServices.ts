import { Client, Operator, Recipe, Service, Vehicle, VehicleBrand, VehicleModel } from "../../models/associations";
import { defaultClients } from "./createClients";
import { defaultOperators } from "./createOperators";
import { defaultRecipes } from "./createRecipes";
import { defaultVehicleBrands } from "./createVehicleBrands";
import { defaultVehicleModels } from "./createVehicleModels";
import { defaultVehicles } from "./createVehicles";


export default async function createServices() {
    // Get today date in format dd/mm/yyyy
    const today = new Date();

    // Create 4 days services
    for (let i = 0; i < 4; i++) {
        const service = await Service.create({
            date: new Date(today.setDate(today.getDate() + i)),
        });

        // create 4 random operators
        for (let j = 0; j < 4; j++) {
            await service.createOperator(defaultOperators[Math.floor(Math.random() * defaultOperators.length)] as Operator);
        }

        // create recipe
        await service.createRecipe(defaultRecipes[Math.floor(Math.random() * defaultRecipes.length)] as Recipe);

        // create vehicle
        const vehicle = await service.createVehicle(defaultVehicles[Math.floor(Math.random() * defaultVehicles.length)] as Vehicle);
        await vehicle.createClient(defaultClients[Math.floor(Math.random() * defaultClients.length)] as Client);
        await vehicle.createBrand(defaultVehicleBrands[Math.floor(Math.random() * defaultVehicleBrands.length)] as VehicleBrand);
        await vehicle.createModel(defaultVehicleModels[Math.floor(Math.random() * defaultVehicleModels.length)] as VehicleModel);
    }
}
