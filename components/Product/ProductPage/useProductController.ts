import { ProductContextType } from "../ContextProvider";
import useFetchProducts from "@/hooks/fetch/useFetchProducts";

export default function useProductController(context?: ProductContextType) {
    const { products, loadingProducts } = useFetchProducts(context);

    return {
        products,
        loadingProducts
    }
}
