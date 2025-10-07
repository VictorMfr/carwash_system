import { BrandContextType } from "../ContextProvider";
import useFetchBrands from "@/hooks/fetch/useFetchBrands";

export default function useBrandController(context?: BrandContextType) {
    const { brands, loadingBrands } = useFetchBrands(context);

    return {
        brands,
        loadingBrands
    }
}
