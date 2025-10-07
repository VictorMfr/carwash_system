import defaultUsers from "@/constants/backend/db/defaultUsers";
import { State, Brand, StockDetails, User } from "../../models/associations";
import Product from "../../models/stock/product";
import Stock, { StockCreationAttributes } from "../../models/stock/stock";
import { defaultProducts } from "./createProducts";
import { defaultStockDetails } from "./createStockDetails";
import { defaultBrands } from "./createBrands";
import { defaultStates } from "./createStates";

const defaultStocks: Omit<StockCreationAttributes, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>[] = [
    {
        total_quantity: 20, //random
        minimum_quantity: 1
    },
    {
        total_quantity: 30, //random
        minimum_quantity: 20
    },
    {
        total_quantity: 40, //random
        minimum_quantity: 32
    },
    {
        total_quantity: 50, //random
        minimum_quantity: 40
    },
    {
        total_quantity: 60, //random
        minimum_quantity: 20
    },
    {
        total_quantity: 70, //random
        minimum_quantity: 20
    },
    {
        total_quantity: 80, //random
        minimum_quantity: 20
    }
]

export default async function createStocks() {
    const stocks = await Stock.bulkCreate(defaultStocks);

    stocks.forEach(async (stock) => {
        await stock.createProduct(defaultProducts[Math.floor(Math.random() * defaultProducts.length)] as Product);
        await stock.setUser(1);

        // Create 3 StockDetails
        for (let i = 0; i < 4; i++) {
            const details = await stock.createStockDetail(defaultStockDetails[Math.floor(Math.random() * defaultStockDetails.length)] as StockDetails);
            await details.createBrand(defaultBrands[Math.floor(Math.random() * defaultBrands.length)] as Brand);
            await details.createState(defaultStates[Math.floor(Math.random() * defaultStates.length)] as State);
        }
    });
}