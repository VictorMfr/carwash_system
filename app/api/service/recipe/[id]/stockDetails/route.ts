import { handleServerError } from "@/lib/error";
import { Brand, Product, Recipe, State, Stock, StockDetails } from "@/services/backend/models/associations";
import RecipeStockDetails from "@/services/backend/models/service/recipeStockDetails";
import { NextResponse } from "next/server";

// Get stock details by recipe id
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const data = await params;
        console.log(data);

        const recipeStockDetails = await RecipeStockDetails.findAll({
            where: {
                recipeId: Number(data.id)
            },
            include: [
                {
                    model: StockDetails,
                    as: 'StockDetails',
                    include: [
                        { model: Brand, as: 'Brand' },
                        { model: State, as: 'State' },
                        { model: Stock, as: 'Stock', include: [{ model: Product, as: 'Product' }] }
                    ]
                }
            ]
        });

        console.log('VALOR DE recipeStockDetails', recipeStockDetails);

        const formattedResponse = recipeStockDetails.map((recipeStockDetail: any) => {
            const data = recipeStockDetail.toJSON();
            const product = {
                id: data.StockDetails.id,
                quantity: data.quantity,
                name: `${data.StockDetails.Stock.Product.name} - ${data.StockDetails.Brand.name}`,
                picture: data.StockDetails.picture,
            }
            return { product, quantity: data.quantity };
        });

        return NextResponse.json(formattedResponse);
    } catch (error) {
        console.log(error);
        return handleServerError(error);
    }
}