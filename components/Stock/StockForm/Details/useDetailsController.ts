import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";

export interface ImageData {
    file: File | null;
    preview: string | null;
    name: string;
}

interface DetailData {
    brand: any;
    state: any;
    quantity: number;
    price: number;
    entryDate: Dayjs | null;
    image: ImageData;
}

interface UseDetailsControllerProps {
    initialData?: Partial<DetailData>;
    onUpdate?: (data: DetailData) => void;
    isTool?: boolean;
}

export default function useDetailsController({ initialData, onUpdate, isTool = false }: UseDetailsControllerProps = {}) {
    const [detailData, setDetailData] = useState<DetailData>({
        brand: null,
        state: null,
        quantity: isTool ? 1 : 0,
        price: 0,
        entryDate: null,
        image: {
            file: null,
            preview: null,
            name: ''
        },
        ...initialData
    });

    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newImageData = {
                    file: file,
                    preview: e.target?.result as string,
                    name: file.name
                };
                
                const updatedData = {
                    ...detailData,
                    image: newImageData
                };
                
                setDetailData(updatedData);
                onUpdate?.(updatedData);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageRemove = () => {
        const updatedData = {
            ...detailData,
            image: {
                file: null,
                preview: null,
                name: ''
            }
        };
        
        setDetailData(updatedData);
        onUpdate?.(updatedData);
    };

    const handleFieldChange = (field: keyof DetailData, value: any) => {
        let processedValue = value;
        
        // Convert Date to Dayjs for entryDate field
        if (field === 'entryDate' && value instanceof Date) {
            processedValue = dayjs(value);
        }
        
        // If isTool is true, quantity should always be 1
        if (field === 'quantity' && isTool) {
            processedValue = 1;
        }
        
        const updatedData = {
            ...detailData,
            [field]: processedValue
        };
        
        setDetailData(updatedData);
        onUpdate?.(updatedData);
    };

    const handleImageUpload = async () => {
        if (!detailData.image.file) return;

        try {
            const formData = new FormData();
            formData.append('image', detailData.image.file);
            
            console.log('Uploading image:', detailData.image.name);
            return true;
        } catch (error) {
            console.error('Error uploading image:', error);
            return false;
        }
    };

    useEffect(() => {
        if (initialData) {
            setDetailData(prev => ({ ...prev, ...initialData }));
        }
    }, [initialData]);

    useEffect(() => {
        if (isTool) {
            setDetailData(prev => ({ ...prev, quantity: 1 }));
        }
    }, [isTool]);

    return {
        detailData,
        handleImageSelect,
        handleImageRemove,
        handleImageUpload,
        handleFieldChange
    };
}