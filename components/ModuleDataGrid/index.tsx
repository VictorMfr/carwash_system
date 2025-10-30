import { ModuleFormGridData } from "@/types/datagrid/datagrid";
import DataGridContext from "./context";
import DataGrid from "./DataGrid";

export default function ModuleDataGrid({ 
    moduleSettings 
}: { 
    moduleSettings: ModuleFormGridData 
}) {
    return (
        <DataGridContext moduleSettings={moduleSettings}>
            <DataGrid />
        </DataGridContext>
    );
}