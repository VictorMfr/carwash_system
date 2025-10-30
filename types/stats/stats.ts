import { Module } from "../module";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";

export interface ModuleStatsData extends Module {
    loadingType: 'spinner' | 'skeleton',
    size?: 'full' | 'small'
    label?: string;
    description?: string;
    icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    };
    tabs: {
        label: string;
        description: string;
        useMenu?: boolean;
        graphs: {
            id: number;
            label: string;
            expectsFillArray?: string;
            type: 'pie' | 'bar' | 'line';
            axis?: {
                x: string;
                y: string;
            };
            rawPie?: {
                value: number;
                label: string;
            }[];
            rawBar?: {
                id: number;
                label: string;
                xAxis: string;
                yAxis: string;
                dataset: any;
            }
            rawLine?: {
                id: number;
                label: string;
                xAxis: string;
                yAxis: string;
                dataset: any;
            }
        }[];
    }[]
}