import { GridProps, TextFieldProps } from "@mui/material";
import { ZodSchema } from "zod";
import { AutocompleteModule } from "../autocomplete/autocomplete";

export interface SwitchDisableRule {
	id: string;
	value?: string | number | boolean;
}

export interface SwitchSwapRule {
	id: string;
	value: FormDataField;
}

export interface Switch {
	label: string;
	disableIds?: SwitchDisableRule[];
	swapIds?: SwitchSwapRule[];
}

export interface FormDataInputConfig {
	/**
	 * El id del campo, es obligatorio porque sirve ante un posible comportamiento de swap.
	 * Deberia ser siempre el mismo valor que el field.
	 */
	id: string;
	size: number | GridProps['size'];
	TextFieldProps?: TextFieldProps;
	hideIfUpdate?: boolean;
	switch?: Switch;
	select?: {
		label: string;
		options: string[];
	};
	autocomplete?: AutocompleteModule;
	number?: {
		adornment?: React.ComponentType;
		adornmentPosition?: 'start' | 'end';
	};
	date?: {};
	picture?: {
		title?: string;
		description?: string;
		suggestion?: string
	};
	cart?: {
		optional?: string;
		autocomplete: FormDataField;
		number: FormDataField;
	},
	custom?: React.ComponentType<{ dataField: FormDataField }>;
}

export interface FormConfig {
	gridSpacing?: number;
}

export interface FormDataField {
	field: string;
	headerName: string;
	inputConfig: FormDataInputConfig;
}

export interface ModuleDesciption {
	title?: string;
	description?: string;
}

export interface StepperStep extends ModuleDesciption {
	label: string;
	config: FormConfig;
	data: FormDataField[];
	validation?: ZodSchema<any>;
}

export interface Stepper {
	orientation?: 'horizontal' | 'vertical';
	steps: StepperStep[];
}

export interface FormData {
	config?: FormConfig;
	contentType?: 'multipart/form-data' | 'application/json' | 'application/x-www-form-urlencoded';
	stepper?: Stepper;
	data?: FormDataField[];
}