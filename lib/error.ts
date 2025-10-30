import { AxiosError } from "axios";
import { NextResponse } from "next/server";
import { SequelizeScopeError } from "sequelize";

// handle api error
export const handleApiError = (error: unknown, uiContext: any) => {
    if (error instanceof AxiosError) {
        const apiError = error.response?.data?.error || error.response?.data?.message || error.message || 'Ocurrió un error en la solicitud';
        console.log(apiError, error);
        uiContext.setSnackbar({ open: true, message: apiError, severity: 'error' });
    } else if (error instanceof Error) {
        console.log(error);
        uiContext.setSnackbar({ open: true, message: error.message || 'Ocurrió un error', severity: 'error' });
    } else {
        console.log(error);
        uiContext.setSnackbar({ open: true, message: 'Ocurrió un error desconocido', severity: 'error' });
    }
}

// handle server error
export const handleServerError = (error: unknown) => {

    const functionCalledWithoutError = "La funcion handleServerError fue llamada sin un error";

    if (!error) {
        console.log(functionCalledWithoutError);
        return NextResponse.json({ error: functionCalledWithoutError }, { status: 500 });
    }

    // Check if it's a axios error
    if (error instanceof AxiosError) {
        const axiosError = "Axios Error: " + error.response?.data?.error || error.response?.data?.message || error.message || 'Ocurrió un error en la solicitud';
        console.log(axiosError);
        return NextResponse.json({ error: axiosError }, { status: 500 });
    }

    // Check if it's a error
    if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Check if it's a unknown error
    return NextResponse.json({ error: 'Ocurrió un error desconocido' }, { status: 500 });
}
    
