import { Service, Recipe, Operator, Vehicle } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";
import { handleServerError } from "@/lib/error";
import { Op } from "sequelize";

export async function GET() {
    try {
        // Get services by recipe
        const servicesByRecipe = await Service.findAll({
            attributes: [
                'RecipeId',
                [Service.sequelize!.fn('COUNT', Service.sequelize!.col('Service.id')), 'count']
            ],
            include: [{
                model: Recipe,
                attributes: ['name'],
                required: true
            }],
            group: ['RecipeId', 'Recipe.id', 'Recipe.name'],
            raw: false
        });

        // Get services by vehicle
        const servicesByVehicle = await Service.findAll({
            attributes: [
                'VehicleId',
                [Service.sequelize!.fn('COUNT', Service.sequelize!.col('Service.id')), 'count']
            ],
            include: [{
                model: Vehicle,
                attributes: ['license_plate'],
                required: true
            }],
            group: ['VehicleId', 'Vehicle.id', 'Vehicle.license_plate'],
            raw: false
        });

        // Get services by operator
        const servicesByOperator = await Service.findAll({
            attributes: [
                [Service.sequelize!.fn('COUNT', Service.sequelize!.col('Service.id')), 'count']
            ],
            include: [{
                model: Operator,
                attributes: ['name', 'lastname'],
                required: true
            }],
            group: ['Operators.id', 'Operators.name', 'Operators.lastname'],
            raw: false
        });

        // Get services by month (last 6 months)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const servicesByMonth = await Service.findAll({
            attributes: [
                [Service.sequelize!.fn('DATE_FORMAT', Service.sequelize!.col('Service.date'), '%Y-%m'), 'month'],
                [Service.sequelize!.fn('COUNT', Service.sequelize!.col('Service.id')), 'count']
            ],
            where: {
                date: {
                    [Op.gte]: sixMonthsAgo
                }
            },
            group: [Service.sequelize!.fn('DATE_FORMAT', Service.sequelize!.col('Service.date'), '%Y-%m')],
            order: [[Service.sequelize!.fn('DATE_FORMAT', Service.sequelize!.col('Service.date'), '%Y-%m'), 'ASC']],
            raw: true
        });

        // Transform data for charts
        const servicesByRecipeData = servicesByRecipe.map((item: any, index) => ({
            id: index,
            value: parseInt(item.dataValues.count),
            label: item.Recipe.name
        }));

        const servicesByVehicleData = servicesByVehicle.map((item: any, index) => ({
            id: index,
            value: parseInt(item.dataValues.count),
            label: item.Vehicle.license_plate
        }));

        const servicesByOperatorData = servicesByOperator.map((item: any, index) => ({
            id: index,
            value: parseInt(item.dataValues.count),
            label: `${item.Operators.name} ${item.Operators.lastname}`
        }));

        const servicesByMonthData = servicesByMonth.map((item: any) => ({
            month: item.month,
            count: parseInt(item.count)
        }));

        return NextResponse.json({
            servicesByRecipe: servicesByRecipeData,
            servicesByVehicle: servicesByVehicleData,
            servicesByOperator: servicesByOperatorData,
            servicesByMonth: servicesByMonthData
        });
    } catch (error) {
        return handleServerError(error);
    }
}
