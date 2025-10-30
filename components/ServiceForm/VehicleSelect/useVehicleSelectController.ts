import useFetch from "@/hooks/fetch/useFetch";

interface Vehicle {
    id: number;
    license_plate: string;
} 

export default function useVehicleSelectController() {
    const { data, loading } = useFetch<Vehicle[]>('/api/service/vehicle');

    return {
        vehicles: data,
        loadingVehicles: loading
    }
}