import { useEffect, useState } from "react";
import useFetchOperators from "@/hooks/fetch/useFetchOperators";

export type OperatorCartItem = {
    operatorId: number;
    operatorName: string;
};

export default function useOperatorCartController({ onChange }: { onChange: (items: OperatorCartItem[]) => void }) {
    const { operators, loadingOperators } = useFetchOperators();
    const [cart, setCart] = useState<OperatorCartItem[]>([]);
    const [selectedOperator, setSelectedOperator] = useState<any>(null);

    useEffect(() => {
        onChange(cart);
    }, [cart, onChange]);

    const handleAddToCart = () => {
        if (!selectedOperator || !selectedOperator.id) return;
        setCart(prev => {
            if (prev.some(item => item.operatorId === selectedOperator.id)) return prev;
            return [...prev, { operatorId: selectedOperator.id, operatorName: `${selectedOperator.name} ${selectedOperator.lastname}` }];
        });
        setSelectedOperator(null);
    };

    const handleRemoveFromCart = (operatorId: number) => {
        setCart(prev => prev.filter(item => item.operatorId !== operatorId));
    };

    return {
        cart,
        selectedOperator,
        setSelectedOperator,
        handleAddToCart,
        handleRemoveFromCart,
        operatorOptions: operators,
        loading: loadingOperators,
    };
}


