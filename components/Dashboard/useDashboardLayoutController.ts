import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { DashboardContextType } from "./ContextProvider";
import { useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

export default function useDashboardLayoutController(dashboardContext: DashboardContextType) {

    const uiContext = useUIDisplayControls();
    const showMobileMenu = useMediaQuery('(max-width: 600px)');
    const router = useRouter();

    const handleLogout = () => {
        uiContext.setAlert({
            open: true,
            title: 'Logout',
            message: 'Are you sure you want to logout?',
            severity: 'warning',
            actions: [
                {
                    label: 'Cancel',
                    onClick: () => uiContext.setAlert(prev => ({ ...prev, open: false }))
                },
                {
                    label: 'Logout',
                    onClick: async () => {
                        try {
                            uiContext.setLoading(true);
                            await api.post('/api/auth/logout');
                        } finally {
                            uiContext.setAlert(prev => ({ ...prev, open: false }));
                            router.push('/login');
                            uiContext.setLoading(false);
                        }
                    }
                }
            ]
        })
    }

    return {
        handleLogout,
        showMobileMenu
    }
}