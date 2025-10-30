import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import useVehicleSelectController from "./useVehicleSelectController";

export default function VehicleSelect({ onChange }: { onChange: (vehicle: any) => void }) {
    const controller = useVehicleSelectController();

    return (
        <FormControl fullWidth>
            <InputLabel id="vehicle-label">{controller.loadingVehicles ? 'Cargando...' : 'Vehículo'}</InputLabel>
            <Select
                disabled={controller.loadingVehicles}
                labelId="vehicle-label"
                label="Vehículo"
                onChange={(e) => onChange(controller.vehicles.find((vehicle) => vehicle.id === e.target.value))}
                >
                {!controller.loadingVehicles && controller.vehicles.map((vehicle) => (
                    <MenuItem key={vehicle.id} value={vehicle.id}>
                        {vehicle.license_plate}
                    </MenuItem>
                )) || (
                        <MenuItem value="">
                            <em>Cargando...</em>
                        </MenuItem>
                    )}
            </Select>
        </FormControl>
    );
}