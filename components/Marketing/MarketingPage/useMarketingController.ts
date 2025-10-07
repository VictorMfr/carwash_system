import { MarketingContextType } from "../ContextProvider";
import useFetchMarketings from "@/hooks/fetch/useFetchMarketings";

export default function useMarketingController(context?: MarketingContextType) {
    const { marketings, loadingMarketings } = useFetchMarketings(context);

    return {
        marketings,
        loadingMarketings
    }
}
