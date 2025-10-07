import { NotificationContextType } from "../ContextProvider";
import useFetchNotifications from "@/hooks/fetch/useFetchNotifications";

export default function useNotificationController(context?: NotificationContextType) {
    const { notifications, loadingNotifications } = useFetchNotifications(context);

    return {
        notifications,
        loadingNotifications
    }
}
