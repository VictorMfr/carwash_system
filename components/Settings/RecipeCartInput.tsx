import { FormDataField } from "@/types/form/form";
import { useModuleFormContext } from "../ModuleForm/context";
import { Grid } from "@mui/material";
import AutoCompleteField from "../ModuleForm/Inputs/AutoComplete";
import CartField from "../ModuleForm/Inputs/Cart/Cart";
import PictureCartItem from "../ModuleForm/Inputs/Cart/PictureCartItem";
import api from "@/lib/axios";
import withUIDisplayControls from "@/HOC/withUIDisplayControls";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { StockSchema } from "@/lib/definitions";
import { StockModule } from "../Stock/StockPage";

const recipeNameField: FormDataField = {
    field: 'recipeName',
    headerName: 'Nombre de la receta',
    inputConfig: {
        id: 'recipeName',
        size: 12,
        autocomplete: {
            url: '/api/service/recipe',
            labelField: 'name',
            label: 'Nombre de la receta',
            newItemLabel: 'Agregar receta',
            loadingType: { loadingText: 'Cargando recetas...' },
            getOptionLabel: (option) => option.recipeName?.name ?? option.name ?? '',
            confirm: {
                title: 'Agregar receta',
                message: '¿Estás seguro de querer agregar esta receta?',
                successMessage: 'Receta agregada correctamente',
            }
        }
    }
}

const cartField: FormDataField = {
    field: 'cart',
    headerName: 'Carrito de productos',
    inputConfig: {
        id: 'cart',
        size: 12,
        cart: {
            autocomplete: {
                field: 'product',
                headerName: 'Producto',
                inputConfig: {
                    size: 12,
                    id: 'product',
                    autocomplete: {
                        url: '/api/stock/details',
                        renderOption: (option) => <PictureCartItem option={option} />,
                        labelField: 'name',
                        label: 'Producto',
                        newItemLabel: 'Agregar producto',
                        loadingType: { loadingText: 'Cargando productos...' },
                        config: {
                            disableActions: true,
                        },
                        formData: {
                            createFillField: 'name',
                            columns: {
                                contentType: 'multipart/form-data',
                                stepper: {
                                    orientation: 'horizontal',
                                    steps: [
                                        {
                                            title: 'Llena los campos',
                                            description: 'Llena los campos para agregar un nuevo stock',
                                            label: 'Llena los campos',
                                            config: {
                                                gridSpacing: 2,
                                            },
                                            data: [
                                                {
                                                    field: 'stock',
                                                    headerName: 'Inventario',
                                                    inputConfig: {
                                                        size: 12,
                                                        id: 'stock',
                                                        autocomplete: {
                                                            url: '/api/stock',
                                                            label: 'Inventario',
                                                            newItemLabel: 'Agregar inventario',
                                                            loadingType: { loadingText: 'Cargando inventarios...' },
                                                            labelField: 'product',
                                                            config: {
                                                                create: {
                                                                    name: 'Agregar inventario',
                                                                    description: 'Ingresa los datos del inventario',
                                                                },
                                                                validation: StockSchema,
                                                                contentType: 'multipart/form-data'
                                                            },
                                                            formData: {
                                                                columns: StockModule.columns,
                                                            }
                                                        }
                                                    },
                                                },
                                                {
                                                    field: 'quantity',
                                                    headerName: 'Cantidad',
                                                    inputConfig: {
                                                        size: 12,
                                                        id: 'quantity',
                                                        number: {}
                                                    },
                                                },
                                                {
                                                    field: 'price',
                                                    headerName: 'Precio',
                                                    inputConfig: {
                                                        size: 12,
                                                        id: 'price',
                                                        number: {
                                                            adornment: () => <>$</>,
                                                            adornmentPosition: 'start'
                                                        }
                                                    },
                                                },
                                                {
                                                    field: 'entry_date',
                                                    headerName: 'Fecha de entrada',
                                                    inputConfig: {
                                                        size: 12,
                                                        id: 'entry_date',
                                                        date: {}
                                                    },
                                                },
                                                {
                                                    field: 'brand',
                                                    headerName: 'Marca',
                                                    inputConfig: {
                                                        size: 12,
                                                        id: 'brand',
                                                        autocomplete: {
                                                            url: '/api/stock/brand',
                                                            label: 'Marca',
                                                            loadingType: 'screen',
                                                            newItemLabel: 'Agregar marca',
                                                            confirm: {
                                                                title: 'Agregar marca',
                                                                message: '¿Estás seguro de querer agregar esta marca?',
                                                                successMessage: 'Marca agregada correctamente',
                                                            },
                                                            labelField: 'name',

                                                        }
                                                    },
                                                },
                                                {
                                                    field: 'state',
                                                    headerName: 'Estado',
                                                    inputConfig: {
                                                        size: 12,
                                                        id: 'state',
                                                        autocomplete: {
                                                            url: '/api/stock/state',
                                                            label: 'Estado',
                                                            loadingType: 'screen',
                                                            newItemLabel: 'Agregar estado',
                                                            confirm: {
                                                                title: 'Agregar estado',
                                                                message: '¿Estás seguro de querer agregar este estado?',
                                                                successMessage: 'Estado agregado correctamente',
                                                            },
                                                            labelField: 'name',
                                                        }
                                                    },
                                                }
                                            ]
                                        },
                                        {
                                            title: 'Agrega una imagen',
                                            description: 'Agrega una imagen al stock',
                                            label: 'Agrega una imagen',
                                            config: {
                                                gridSpacing: 2
                                            },
                                            data: [
                                                {
                                                    field: 'picture',
                                                    headerName: 'Imagen',
                                                    inputConfig: {
                                                        size: 12,
                                                        id: 'picture',
                                                        picture: {
                                                            title: 'Imagen',
                                                            description: 'Agrega una imagen al stock',
                                                            suggestion: 'Sube una imagen para el stock',
                                                        },
                                                    },
                                                }
                                            ]
                                        }
                                    ]
                                }
                            }
                        }
                    }
                }
            },
            number: {
                field: 'quantity',
                headerName: 'Cantidad',
                inputConfig: {
                    size: 12,
                    id: 'quantity',
                }
            }
        }
    }
}

const RecipeCartInput = ({
    dataField
}: {
    dataField: FormDataField
}) => {

    const formCtx = useModuleFormContext();
    const uiCtx = useUIDisplayControls();
    const formInput = formCtx.formValue.find((input) => input.field === dataField.field);

    const changeRecipeNameHandler = async (value: any) => {
        if (value) {
            return await getLastConfigFromRecipe(value);
        }

        return formCtx.setFormValue(prev => (
            prev.map(input => (
                input.field === dataField.field ? {
                    ...input, value: {
                        ...value,
                        cart: []
                    } as any
                } : input
            ))
        ));
    }

    const changeCartHandler = (next: any[]) => {
        formCtx.setFormValue(prev => (
            prev.map(input => (
                input.field === dataField.field ? {
                    ...input, value: {
                        ...formInput?.value,
                        cart: next
                    } as any
                } : input
            ))
        ))
    }

    const getLastConfigFromRecipe = async (value: any) => {
        try {
            console.log(value);
            uiCtx.setScreenLoading(true);
            const response = await api.get(`/api/service/recipe/${value.id}/stockDetails`);
            console.log(response.data);
            formCtx.setFormValue(prev => (
                prev.map(input => (
                    input.field === dataField.field ? {
                        ...input, value: {
                            ...value,
                            cart: response.data
                        } as any
                    } : input
                ))
            ))
        } catch (error) {
            console.log(error);
        } finally {
            uiCtx.setScreenLoading(false);
        }
    }

    return (
        <Grid container spacing={1}>
            <Grid size={12}>
                <AutoCompleteField
                    dataField={recipeNameField}
                    onChange={changeRecipeNameHandler}
                    innerValue={formInput?.value?.name ?? formInput?.value ?? ''}
                />
            </Grid>
            <Grid size={12}>
                <CartField
                    dataField={cartField}
                    onChange={changeCartHandler}
                    innerValue={formInput?.value?.cart ?? []}
                />
            </Grid>
        </Grid>
    );
}

export default withUIDisplayControls(RecipeCartInput);