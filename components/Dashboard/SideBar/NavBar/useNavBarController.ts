import { useState } from 'react';

export default function useNavBarController() {
    const [inventoryOpen, setInventoryOpen] = useState(false);
    const [financeOpen, setFinanceOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const [marketingOpen, setMarketingOpen] = useState(false);

    const handleInventoryClick = () => {
        setInventoryOpen(!inventoryOpen);
    };

    const handleFinanceClick = () => {
        setFinanceOpen(!financeOpen);
    };

    const handleServicesClick = () => {
        setServicesOpen(!servicesOpen);
    };

    const handleMarketingClick = () => {
        setMarketingOpen(!marketingOpen);
    };

    return {
        inventoryOpen,
        handleInventoryClick,
        financeOpen,
        handleFinanceClick,
        servicesOpen,
        handleServicesClick,
        marketingOpen,
        handleMarketingClick,
    }
}