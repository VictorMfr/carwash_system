import { StockContextType } from "../ContextProvider";
import useFetchStocks from "@/hooks/fetch/useFetchStocks";

export default function useStockController(context?: StockContextType) {
    const { stocks, loadingStocks } = useFetchStocks(context);

    return {
        stocks,
        loadingStocks
    }
}
