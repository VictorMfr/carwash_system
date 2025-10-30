import StockDetailsPage from "@/components/StockDetails/StockDetailsPage";
import { Product, Stock, StockDetails } from "@/services/backend/models/associations";
import { notFound } from "next/navigation";


// Server side component
export default async function StockDetailsPageServer({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return <StockDetailsPage stockId={id} />
}

