import useFetch from "@/hooks/fetch/useFetch";

export default function DashboardPageController() {
    const { data, loading } = useFetch('/api/dbMeta');

    console.log(data);
    
    return {
        dbMeta: data,
        loadingDbMeta: loading,
    }
}