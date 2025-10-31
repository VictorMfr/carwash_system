
import { FormData } from "../form/form";
import { Module } from "../module";
import { ZodSchema } from "zod";

export interface AutocompleteModule extends Module {
	/**
	 * El campo que se buscara por cada item para mostrar el label del autocomplete.
	*/
	labelField?: string;

	/**
	 * El label del autocomplete.
	*/
	label: string;

	/**
	 * El label del botón para agregar un nuevo item.
	 */
	newItemLabel: string;

	/**
	 * El tipo de carga del autocomplete.
	 * Puede ser 'screen' para mostrar un loading en la pantalla, 'skeleton' para mostrar un skeleton, o un objeto con el texto de carga.
	 */
	loadingType: 'screen' | 'skeleton' | {
		loadingText: string;
	};

	/**
	 * Parámetros de consulta opcionales para filtrar los resultados en el backend.
	 */
	queryParams?: Record<string, string | number | boolean>;

	/**
	 * Activar solo si se requiere confirmar la creación de un nuevo item.	 */
	confirm?: {

		/**
		 * El título de la confirmación.
		 */
		title: string;

		/**
		 * El mensaje de la confirmación.
		 */
		message: string;

		/**
		 * El mensaje de éxito de la confirmación.
		 */
		successMessage: string;
	};

	/**
	 * El formulario de creación de un nuevo item.
	 */
	formData?: {
		/**
		 * El campo que se usará para llenar el campo de creación del autocomplete.
		 */
		createFillField?: string;

		/**
		 * Las columnas del formulario de creación de un nuevo item.
		 */
		columns: Omit<FormData, 'url'>;
	};

	/**
	 * Activar solo si se requiere seleccionar múltiples items.
	 */
	multiple?: boolean;

	/**
	 * La configuración del autocomplete.
	 */
	config?: {

		/**
		 * La configuración del formulario de creación de un nuevo item.
		 */
		create?: {

			/**
			 * El nombre del formulario de creación de un nuevo item.
			 */
			name: string;

			/**
			 * La descripción del formulario de creación de un nuevo item.
			 */
			description: string;
		},

		/**
		 * La validación del formulario de creación de un nuevo item.
		 */
		validation?: ZodSchema<any>;
	};
}