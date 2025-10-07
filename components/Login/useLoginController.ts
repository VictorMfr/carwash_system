import { useCallback, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

type LoginState = { error: string | null; message: string | null };

export default function useLoginController() {
    const [state, setState] = useState<LoginState>({ error: null, message: null });
    const [pending, startTransition] = useTransition();
    const router = useRouter();

    const action = useCallback((formData: FormData) => {
        startTransition(async () => {
            try {
                const email = formData.get('email');
                const password = formData.get('password');

                const res = await api.post('/api/auth/login', {
                    email,
                    password
                });

                const data = res.data;

                if (data.error) {
                    setState({ error: data?.error ?? 'Login failed', message: null });
                    return;
                }

                setState({ error: null, message: data?.message ?? 'Login successful' });
                router.push('/');
            } catch (err) {
                setState({ error: err instanceof Error ? err.message : String(err), message: null });
            }
        });
    }, [router]);

    return {
        state,
        action,
        pending
    };
}