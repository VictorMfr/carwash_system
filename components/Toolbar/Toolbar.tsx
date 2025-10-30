import { ColumnsPanelTrigger, GridViewColumnIcon, ToolbarButton, ExportCsv, ExportPrint, FilterPanelTrigger, QuickFilter } from "@mui/x-data-grid";
import { Tooltip } from "@mui/material";
import { DensityMedium, FileDownload, FilterList, Print } from "@mui/icons-material";
import QuickFilterSearch from "@/components/Toolbar/Search";
import { Fragment } from "react";


export default function CustomToolbar() {
    return (
        <Fragment>
            <Tooltip title="Quick Filter">
                <QuickFilterSearch />
            </Tooltip>
            <Tooltip title="Columnas">
                <ColumnsPanelTrigger render={<ToolbarButton />}>
                    <GridViewColumnIcon fontSize="small" />
                </ColumnsPanelTrigger>
            </Tooltip>
            <Tooltip title="Descargar como CSV">
                <ExportCsv render={<ToolbarButton />}>
                    <FileDownload fontSize="small" />
                </ExportCsv>
            </Tooltip>
            <Tooltip title="Imprimir">
                <ExportPrint render={<ToolbarButton />}>
                    <Print fontSize="small" />
                </ExportPrint>
            </Tooltip>
            <Tooltip title="Filtrar">
                <FilterPanelTrigger render={<ToolbarButton />}>
                    <FilterList fontSize="small" />
                </FilterPanelTrigger>
            </Tooltip>
            <Tooltip title="Densidad">
                <ToolbarButton>
                    <DensityMedium sx={{ fontSize: 20 }} />
                </ToolbarButton>
            </Tooltip>
        </Fragment>
    )
}