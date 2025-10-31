'use client';

import { FormData } from "@/types/form/form";
import ModuleForm from "../ModuleForm";
import { Fragment, useEffect, useState } from "react";
import useFormDataController, { FormInput } from "../ModuleForm/FormDataController";
import { Button } from "@mui/material";


const testForm: FormData = {
    data: [
        {
            field: 'switch',
            headerName: 'Switch',
            inputConfig: {
                id: 'switch',
                size: 12,
                switch: {
                    label: 'Switch',
                    swapIds: [
                        {
                            id: 'name',
                            value: {
                                id: 'name',
                                data: [
                                    {
                                        field: 'lastname',
                                        headerName: 'Apellido',
                                        inputConfig: {
                                            id: 'lastname',
                                            size: 12,
                                        }
                                    },
                                    {
                                        field: 'email',
                                        headerName: 'Email',
                                        inputConfig: {
                                            id: 'email',
                                            size: 12,
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }

            }
        },
        {
            field: 'name',
            headerName: 'Nombre',
            inputConfig: {
                id: 'name',
                size: 12,
                autocomplete: {
                    url: '/api/stock/brand',
                    label: 'Marca',
                    newItemLabel: 'Agregar marca',
                    loadingType: 'screen',
                    labelField: 'name',
                    multiple: true,
                    confirm: {
                        title: 'Agregar marca',
                        message: '¿Estás seguro de querer agregar esta marca?',
                        successMessage: 'Marca agregada correctamente',
                    }
                }
            }
        }
    ]
}

export default function SettingsPage() {

    const { initialFormInputs } = useFormDataController(testForm);
    const [formValue, setFormValue] = useState<FormInput[]>(initialFormInputs);

    // useEffect(() => {
    //     console.log('formValue', formValue);
    // }, [formValue]);

    const submitHandler = () => {
        console.log('formValue', formValue);
    }

    return (
        <Fragment>
            <ModuleForm
                settings={testForm}
                formValue={formValue}
                onChangeFormData={setFormValue}
            />
            <Button onClick={submitHandler}>Agregar</Button>
        </Fragment>
    )
}