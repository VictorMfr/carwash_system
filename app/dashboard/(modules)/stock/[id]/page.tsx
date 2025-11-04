import StockDetailsPage from "@/components/StockDetails/StockDetailsPage";


// Server side component
export default async function StockDetailsPageServer({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return <StockDetailsPage stockId={id} />
}

