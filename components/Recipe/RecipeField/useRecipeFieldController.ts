import { useEffect, useState } from "react";
import { AutocompleteChangeDetails, AutocompleteChangeReason, createFilterOptions, FilterOptionsState } from "@mui/material";
import api from "@/lib/axios";

export interface RecipeFieldType {
    id: number;
    name: string;
    inputValue?: string;
}

type CartItem = { productId: number; productName: string; quantity: number };

const filter = createFilterOptions<RecipeFieldType>();

export default function useRecipeFieldController() {
    const [recipeOptions, setRecipeOptions] = useState<RecipeFieldType[]>([]);
    const [value, setValue] = useState<RecipeFieldType | null>(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const [dialogValue, setDialogValue] = useState<{ id: number; name: string }>({ id: 0, name: '' });
    const [cart, setCart] = useState<CartItem[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [quantity, setQuantity] = useState<number>(1);

    const handleAddToCart = () => {
        if (!selectedProduct || !selectedProduct.id || quantity <= 0) return;
        setCart(prev => {
            const exists = prev.find(i => i.productId === selectedProduct.id);
            if (exists) {
                return prev.map(i => i.productId === selectedProduct.id ? { ...i, quantity: i.quantity + quantity } : i);
            }
            return [...prev, { productId: selectedProduct.id, productName: selectedProduct.name, quantity }];
        });
        setSelectedProduct(null);
        setQuantity(1);
    };

    const handleRemoveFromCart = (productId: number) => {
        setCart(prev => prev.filter(i => i.productId !== productId));
    };

    const handleSubmit = async () => {
        if (!dialogValue.name.trim()) return;
        try {
            const recipeRes = await api.post(`/api/service/recipe`, { name: dialogValue.name.trim() });
            const recipe = recipeRes.data;
            if (cart.length > 0) {
                await api.post(`/api/dashboard/(modules)/service/recipe/${recipe.id}/product`, {
                    items: cart.map(i => ({ productId: i.productId, quantity: i.quantity }))
                });
            }
            setValue(recipe);
            setRecipeOptions(prev => [...prev, recipe]);
            setOpen(false);
            setCart([]);
            setDialogValue({ id: 0, name: '' });
        } catch (error) {
            // handle error
        }
    };

    const handleClose = () => setOpen(false);
    const handleCancel = () => {
        setOpen(false);
        setCart([]);
        setDialogValue({ id: 0, name: '' });
        setSelectedProduct(null);
        setQuantity(1);
    };

    const changeValueHandler = (
        event: React.SyntheticEvent,
        value: RecipeFieldType | null | string,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<RecipeFieldType> | undefined
    ) => {
        if (typeof value === 'string') {
            setOpen(true);
            setDialogValue({ id: 0, name: value });
        } else if (value && (value as any).inputValue) {
            setOpen(true);
            setDialogValue({ id: 0, name: (value as any).inputValue || '' });
        } else {
            setValue(value);
        }
    };

    const filterOptionsHandler = (
        options: RecipeFieldType[],
        params: FilterOptionsState<RecipeFieldType>
    ) => {
        const filtered = filter(options, params);
        if (params.inputValue !== '') {
            filtered.push({ id: 0, name: `Add "${params.inputValue}"`, inputValue: params.inputValue });
        }
        return filtered;
    };

    const getOptionLabelHandler = (option: RecipeFieldType | string) => {
        if (typeof option === 'string') return option;
        if ((option as any).inputValue) return (option as any).inputValue as string;
        return option.name;
    };

    const getRecipeOptions = async () => {
        try {
            const response = await api.get('/api/service/recipe');
            setRecipeOptions(response.data);
        } catch (error) {
            setRecipeOptions([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getRecipeOptions();
    }, []);

    return {
        value,
        open,
        loading,
        dialogValue,
        cart,
        selectedProduct,
        quantity,
        setDialogValue,
        setSelectedProduct,
        setQuantity,
        handleAddToCart,
        handleRemoveFromCart,
        handleSubmit,
        handleClose,
        handleCancel,
        recipeOptions,
        changeValueHandler,
        filterOptionsHandler,
        getOptionLabelHandler,
    };
}


