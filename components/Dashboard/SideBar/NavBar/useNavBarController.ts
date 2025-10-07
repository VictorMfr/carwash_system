import { useState } from 'react';

export default function useNavBarController() {
    const [inventoryOpen, setInventoryOpen] = useState(false);
    const [financeOpen, setFinanceOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);

    const handleInventoryClick = () => {
        setInventoryOpen(!inventoryOpen);
    };

    const handleFinanceClick = () => {
        setFinanceOpen(!financeOpen);
    };

    const handleServicesClick = () => {
        setServicesOpen(!servicesOpen);
    };

    return {
        inventoryOpen,
        handleInventoryClick,
        financeOpen,
        handleFinanceClick,
        servicesOpen,
        handleServicesClick
    }
}