import { Module } from "../module";
import { ComponentType } from "react";
import { ZodObject, ZodSchema } from "zod";
import {  FormData, FormDataField, FormDataInputConfig, Stepper, StepperStep } from "../form/form";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";

export type ToolbarItem = 'export' | 'filter' | 'columns' | 'density' | 'quickFilter' | 'add' | 'delete';
export type ColumnData = FormDataField & {
	field: string;
	headerName: string;
	inputConfig: {
		size: number;
		dataGridHidden?: boolean;
		hideIfUpdate?: boolean;
	},
	flex?: number;
	width?: number;
	renderCell?: GridColDef['renderCell'];
} & GridColDef;


export interface ModuleFormGridData extends Module {
	label?: string;
	description?: string;
	icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
		muiName: string;
	};
	columns: FormData & {
		config: {
			gridSpacing: number;
		};
		data?: ColumnData[];
		stepper?: Stepper & {
			steps: (StepperStep & {
				data: ColumnData[];
			})[];
		};
	};
	actions?: {
		config: {
			field: string;
			headerName: string;
			width: number;
		};
		data: {
			name: string;
			icon: ComponentType<{ params: GridRenderCellParams } | any>;
			dispatch?: ComponentType<{
				setActionModal: (actionModal: { open: boolean, action: any, data: any }) => void,
				actionModal: { open: boolean, action: any, data: any }
			}>;
			dispatchMode?: 'modal' | 'link';
		}[];
	},
	config?: {
		append?: Record<string, any>;
		rowHeight?: number;
		toolbar?: {
			show: ToolbarItem[];
		}
		inputConfig?: {
			allowCheckboxSelection: boolean;
		};
		create?: {
			name?: string;
			description?: string;
			hiddenAction?: boolean;
			validation?: ZodSchema<any>;
			contentType?: 'multipart/form-data' | 'application/json' | 'application/x-www-form-urlencoded';
		};
		edit?: {
			name?: string;
			description?: string;
			hiddenAction?: boolean;
			validation?: ZodSchema<any>;
			contentType?: 'multipart/form-data' | 'application/json' | 'application/x-www-form-urlencoded';
		};
		delete?: {
			hiddenAction?: boolean;
		};
	};
}