'use client';

import withUIDisplayControls from "@/HOC/withUIDisplayControls";
import { ProductProvider } from "./ContextProvider";
import ProductPage from "./ProductPage/ProductPage";

const ProductIndex = () => {
    return (
        <ProductProvider>
            <ProductPage/>
        </ProductProvider>
    )
}

export default withUIDisplayControls(ProductIndex);
