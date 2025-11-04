import { handleServerError } from "@/lib/error";
import { Stock, Brand, State, StockDetails, Product } from "@/services/backend/models/associations";
import { NextRequest, NextResponse } from "next/server";
import { storeAndGetPicturePath } from "@/lib/pictures";

// Create a stock detail given a stock id
export async function POST(request: NextRequest) {
    try {
        const form = await request.formData();
        const stock = form.get('stock') as any;
        const state = form.get('state') as any;
        const brand = form.get('brand') as any;
        const quantity = form.get('quantity');
        const price = form.get('price');
        const entry_date = form.get('entry_date');
        const picture = form.get('picture');

        if (!stock || !state || !brand || !quantity || !price || !entry_date || !picture) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        // parse the stock, state, brand to objects
        const stockObj = JSON.parse(stock as string);
        const stateObj = JSON.parse(state as string);
        const brandObj = JSON.parse(brand as string);

        const picturePath = await storeAndGetPicturePath(picture, 'stockDetails');

        const DBStock = await Stock.findByPk(stockObj.id, { include: [{ model: Product, as: 'Product' }] }	);
        if (!DBStock) {
            return NextResponse.json({ error: 'Stock not found' }, { status: 404 });
        }

        const [day, month, year] = (entry_date as string).split('-');
        const entryDate = new Date(Number(year), Number(month) - 1, Number(day));


        const stockDetail = await DBStock.createStockDetail({
            quantity: Number(quantity),
            price: Number(price),
            entry_date: entryDate,
            picture: picturePath,
        });

        await stockDetail.setBrand(brandObj.id);
        await stockDetail.setState(stateObj.id);

        const formatted = {
            ...stockDetail.toJSON(),
            name: `${DBStock.Product.name} - ${brandObj.name} `,
        }

        return NextResponse.json(formatted);

    } catch (error) {
        console.log(error);
        return handleServerError(error);
    }
}

// Get all stock details
export async function GET(request: NextRequest) {
    try {
        const stockDetails = await StockDetails.findAll({
            include: [
                { model: Stock, as: 'Stock', include: [{ model: Product, as: 'Product' }] },
                { model: Brand, as: 'Brand' },
                { model: State, as: 'State' },
            ]
        });

        const formatted = stockDetails.map((stockDetail) => {
            return {
                ...stockDetail.toJSON(),
                name: `${stockDetail.Stock.Product.name} - ${stockDetail.Brand.name} `,
            }
        });

        if (!stockDetails) {
            return NextResponse.json({ error: 'Stock details not found' }, { status: 404 });
        }

        return NextResponse.json(formatted);
    } catch (error) {
        console.log(error);
        return handleServerError(error);
    }
}