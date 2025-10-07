import { StockDetails, State } from "@/services/backend/models/associations";
import { NextRequest, NextResponse } from "next/server";
import { deleteUploadFile, storePicture } from "@/lib/pictures";
import { handleServerError } from "@/lib/error";


// Update a stock detail
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string, detailsId: string }> }) {
    try {
        // Get the form data
        const form = await request.formData();
        const quantity = Number(form.get('quantity'));
        const price = Number(form.get('price'));
        const entry_date = form.get('entry_date');
        const state_id = form.get('state_id');
        const picture = form.get('picture');

        // Get the details stock id
        const { detailsId } = await params;

        // find stock detail by id
        const detail = await StockDetails.findByPk(detailsId);
        if (!detail) {
            return NextResponse.json({ error: 'Stock detail not found' }, { status: 404 });
        }

        let picturePath: string | undefined = undefined;
        // Only handle picture if a new one was sent
        if (picture && picture instanceof File) {
            // Delete the old picture first (best effort)
            if (detail.picture) {
                await deleteUploadFile(detail.picture);
            }
            // Store with a fresh name; do NOT pass the old public path as name
            picturePath = await storePicture(picture as File, 'stockDetails');
        }

        // update stock detail basic fields
        const updatedDetail = await detail.update({
            quantity,
            price,
            entry_date: entry_date ? new Date(entry_date as string) : (detail as any).entry_date,
            ...(picturePath ? { picture: picturePath } : {})
        });

        // Optionally update state association if provided
        if (state_id) {
            const state = await State.findByPk(Number(state_id));
            if (state) {
                await detail.setState(state.id);
            }
        }
        
        return NextResponse.json(updatedDetail);
        
    } catch (error) {
        return handleServerError(error);
    }
}

// Delete a stock detail
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string, detailsId: string }> }) {
    try {
        const { detailsId } = await params;

        // find stock detail by id
        const detail = await StockDetails.findByPk(detailsId);
        if (!detail) {
            return NextResponse.json({ error: 'Stock detail not found' }, { status: 404 });
        }

        // delete the stock detail
        await detail.destroy();

        // delete the picture
        if (detail.picture) {
            await deleteUploadFile(detail.picture);
        }

        return NextResponse.json(detail);
    } catch (error) {
        return handleServerError(error);
    }
}