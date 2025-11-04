'use client';

import { useEffect, useState } from "react";
import { Button, Grid, Stack, TextField, Typography } from "@mui/material";

export default function SettingsPage() {
    const [percentage, setPercentage] = useState<string>("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('/api/service/payments/config');
                const data = await res.json();
                const value = Number(data.operatorPaymentPercentage ?? 0.3);
                setPercentage(String(Math.round(value * 100)));
            } catch (e) {
                setPercentage("30");
            }
        })();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        setError(null);
        try {
            const numeric = Number(percentage);
            if (isNaN(numeric)) {
                setError('El valor debe ser numérico');
                setSaving(false);
                return;
            }
            const fraction = Math.max(0, Math.min(100, numeric)) / 100;
            const res = await fetch('/api/service/payments/config', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ operatorPaymentPercentage: fraction })
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data?.message || 'Error al guardar');
            }
        } catch (e: any) {
            setError(e.message ?? 'Error al guardar');
        } finally {
            setSaving(false);
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid size={12}>
                <Typography variant="h6">Configuración de pagos a operadores</Typography>
                <Typography variant="body2" color="text.secondary">
                    Define el porcentaje del pago para operadores (por defecto 30%).
                </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <TextField
                        label="Porcentaje de pago (%)"
                        value={percentage}
                        onChange={(e) => setPercentage(e.target.value)}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        fullWidth
                    />
                    <Button variant="contained" onClick={handleSave} disabled={saving}>
                        Guardar
                    </Button>
                </Stack>
                {error && (
                    <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                        {error}
                    </Typography>
                )}
            </Grid>
        </Grid>
    )
}