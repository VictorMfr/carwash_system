import { useState } from "react";

export type ExtraCartItem = {
    productId: number;
    productName: string;
    quantity: number;
    unit: string;
};

export default function useExtraFieldController() {
    const [cart, setCart] = useState<ExtraCartItem[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [quantity, setQuantity] = useState<number>(1);

    const handleAddToCart = () => {
        if (!selectedProduct || !selectedProduct.id || quantity <= 0) return;
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.productId === selectedProduct.id);
            if (existingItem) {
                return prevCart.map(item => (
                    item.productId === selectedProduct.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                ));
            }
            return [
                ...prevCart,
                {
                    productId: selectedProduct.id,
                    productName: selectedProduct.name,
                    quantity,
                    unit: selectedProduct.unit
                }
            ];
        });
        setSelectedProduct(null);
        setQuantity(1);
    };

    const handleRemoveFromCart = (productId: number) => {
        setCart(prevCart => prevCart.filter(item => item.productId !== productId));
    };

    const handleCancel = () => {
        setCart([]);
        setSelectedProduct(null);
        setQuantity(1);
    };

    return {
        cart,
        selectedProduct,
        quantity,
        setSelectedProduct,
        setQuantity,
        handleAddToCart,
        handleRemoveFromCart,
        handleCancel,
        setCart
    };
}


