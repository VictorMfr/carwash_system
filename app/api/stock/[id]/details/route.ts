import { handleServerError } from "@/lib/error";
import { storeAndGetPicturePath } from "@/lib/pictures";
import { Brand, State, Stock, StockDetails } from "@/services/backend/models/associations";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";

// Get all stock details
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        // Get the stock id
        const { id } = await params;

        // get stock by id
        const stock = await Stock.findByPk(id, {
            include: {
                model: StockDetails,
                as: 'StockDetails',
                include: [
                    { model: Brand, as: 'Brand' },
                    { model: State, as: 'State' }
                ]
            }
        });

        if (!stock) {
            return NextResponse.json({ error: 'Stock not found' }, { status: 404 });
        }


        let records: any[] = [];

        stock.StockDetails.forEach((stockDetail) => {
            // transform the entry_date to DD-MM-YYYY
            const entryDate = dayjs(stockDetail.entry_date).format('DD-MM-YYYY');
            records.push({
                ...stockDetail.toJSON(),
                entry_date: entryDate,
                brand: stockDetail.Brand.name,
                state: stockDetail.State.name
            });
        });

        // get states
        return NextResponse.json(records);
    } catch (error) {
        console.log(error);
        return handleServerError(error);
    }
}

// Create a stock detail
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        // Validate the request
        const form = await request.formData();
        const quantity = form.get('quantity');
        const price = form.get('price');
        const picture = form.get('picture');
        const entry_date = form.get('entry_date');
        const brand = form.get('brand');
        const state = form.get('state');

        console.log("VALORES RECIBIDOS", quantity, price, picture, entry_date, brand, state);

        // Store the picture in the uploads folder
        const picturePath = await storeAndGetPicturePath(picture, 'stockDetails');

        // find stock by id
        const stock = await Stock.findByPk(id);
        if (!stock) {
            return NextResponse.json({ error: 'Stock not found' }, { status: 404 });
        }

        const [day, month, year] = (entry_date as string).split('-');
        const entryDate = new Date(Number(year), Number(month) - 1, Number(day));

        

        // create stock detail
        const detail = await stock.createStockDetail({ 
            quantity: Number(quantity), 
            price: Number(price), 
            entry_date: entryDate,
            picture: picturePath
        });


        
        const brandDetail = JSON.parse(brand as string);
        const stateDetail = JSON.parse(state as string);

        await detail.setBrand(brandDetail?.id);
        await detail.setState(stateDetail?.id);

        const response = {
            ...detail.toJSON(),
            brand: brandDetail?.name,
            state: stateDetail?.name
        }

        return NextResponse.json(response);
    } catch (error) {
        return handleServerError(error);
    }
}

// Update a stock detail
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const url = new URL(request.url);
        const detailId = url.pathname.split('/').pop();

        // Validate the request
        const form = await request.formData();
        const quantity = form.get('quantity');
        const price = form.get('price');
        const picture = form.get('picture');
        const entry_date = form.get('entry_date');
        const brandId = form.get('brandId');
        const stateId = form.get('stateId');

        // Store the picture in the uploads folder if provided
        const picturePath = picture ? await storeAndGetPicturePath(picture, 'stockDetails') : null;

        // find stock detail by id
        const stockDetail = await StockDetails.findByPk(detailId);
        if (!stockDetail) {
            return NextResponse.json({ error: 'Stock detail not found' }, { status: 404 });
        }

        // update stock detail (FKs are set via association setters)
        const updateData: any = {
            quantity: Number(quantity),
            price: Number(price),
            entry_date: new Date(entry_date as string)
        };

        // Only update picture if a new one was provided
        if (picturePath) {
            updateData.picture = picturePath;
        }

        await stockDetail.update(updateData);
        if (brandId) await stockDetail.setBrand(Number(brandId));
        if (stateId) await stockDetail.setState(Number(stateId));

        return NextResponse.json(stockDetail);
    } catch (error) {
        return handleServerError(error);
    }
}