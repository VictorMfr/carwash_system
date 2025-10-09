import { useCallback, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { LoginSchema } from "@/lib/definitions";
import { ZodError } from "zod";
import { AxiosError } from "axios";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";

interface FormData {
    email: {
        value: string;
        error: string;
    };
    password: {
        value: string;
        error: string;
    };
    loading: boolean;
}

export default function useLoginController() {
    const [formData, setFormData] = useState<FormData>({
        email: {
            value: '',
            error: ''
        },
        password: {
            value: '',
            error: ''
        },
        loading: false
    });

    const router = useRouter();
    const uiContext = useUIDisplayControls();

    const setEmail = (email: string) => {
        setFormData({ ...formData, email: { value: email, error: '' } });
    }
    const setPassword = (password: string) => {
        setFormData({ ...formData, password: { value: password, error: '' } });
    }

    const login = async () => {
        try {
            LoginSchema.parse({ email: formData.email.value, password: formData.password.value });

            setFormData({ ...formData, loading: true });
            await api.post('/api/auth/login', { email: formData.email.value, password: formData.password.value });
            return router.replace('/dashboard');

        } catch (error) {
            console.log(error);

            if (error instanceof AxiosError) {
                uiContext.setSnackbar({ 
                    open: true, 
                    message: error.response?.data.error ?? 'Ocurrió un error', 
                    severity: 'error' 
                });

                setFormData({ 
                    ...formData, 
                    email: { value: '', error: '' }, 
                    password: { value: '', error: '' }, 
                    loading: false
                });
            }

            if (error instanceof ZodError) {
                setFormData({
                    ...formData,
                    email: {
                        value: formData.email.value,
                        error: error.issues.find(issue => issue.path[0] === 'email')?.message ?? ''
                    },
                    password: {
                        value: formData.password.value,
                        error: error.issues.find(issue => issue.path[0] === 'password')?.message ?? ''
                    },
                    loading: false
                });
            }
        }
    }

    return { formData, setEmail, setPassword, login };
}