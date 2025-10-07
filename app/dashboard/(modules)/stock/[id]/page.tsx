import StockDetailsIndex from "@/components/StockDetails";

// Server side component
export default async function StockDetailsPageServer({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <StockDetailsIndex id={id} />
}

