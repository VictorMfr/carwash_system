'use client';

import { useEffect, useState } from "react";
import { Button, Grid, Stack, TextField, Typography } from "@mui/material";

export default function SettingsPage() {
    const [percentage, setPercentage] = useState<string>("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loyaltyWeights, setLoyaltyWeights] = useState<{ a: string; b: string; c: string }>({ a: "0.33", b: "0.33", c: "0.34" });
    const [delinquencyWeights, setDelinquencyWeights] = useState<{ a: string; b: string }>({ a: "0.5", b: "0.5" });
    const [savingMarketing, setSavingMarketing] = useState(false);
    const [promotionMin, setPromotionMin] = useState<string>("0.7");
    const [reminderMin, setReminderMin] = useState<string>("0.6");

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
            try {
                const res = await fetch('/api/marketing/config');
                if (res.ok) {
                    const data = await res.json();
                    const lw = data?.loyaltyWeights ?? { a: 1/3, b: 1/3, c: 1/3 };
                    const dw = data?.delinquencyWeights ?? { a: 0.5, b: 0.5 };
                    const el = data?.marketingEligibility ?? { promotionMin: 0.7, reminderMin: 0.6 };
                    setLoyaltyWeights({ a: String(lw.a), b: String(lw.b), c: String(lw.c) });
                    setDelinquencyWeights({ a: String(dw.a), b: String(dw.b) });
                    setPromotionMin(String(el.promotionMin));
                    setReminderMin(String(el.reminderMin));
                }
            } catch (e) {
                // ignore
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

    const handleSaveMarketing = async () => {
        setSavingMarketing(true);
        setError(null);
        try {
            const parse = (v: string) => {
                const n = Number(v);
                if (isNaN(n)) throw new Error('Valores de peso deben ser numéricos');
                return Math.max(0, Math.min(1, n));
            };
            const payload = {
                loyaltyWeights: {
                    a: parse(loyaltyWeights.a),
                    b: parse(loyaltyWeights.b),
                    c: parse(loyaltyWeights.c),
                },
                delinquencyWeights: {
                    a: parse(delinquencyWeights.a),
                    b: parse(delinquencyWeights.b),
                },
                marketingEligibility: {
                    promotionMin: parse(promotionMin),
                    reminderMin: parse(reminderMin),
                }
            };
            const res = await fetch('/api/marketing/config', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data?.message || 'Error al guardar');
            }
        } catch (e: any) {
            setError(e.message ?? 'Error al guardar');
        } finally {
            setSavingMarketing(false);
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

            <Grid size={12} sx={{ mt: 4 }}>
                <Typography variant="h6">Configuración de Marketing</Typography>
                <Typography variant="body2" color="text.secondary">
                    Pesos de índices (rango 0 a 1). Fidelidad: b·peso1 + a·peso2 + c·peso3. Morosidad: b·peso1 + a·peso2.
                </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Stack spacing={2}>
                    <Typography variant="subtitle1">Fidelidad</Typography>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                        <TextField label="Peso a (monto)" value={loyaltyWeights.a} onChange={(e) => setLoyaltyWeights(v => ({ ...v, a: e.target.value }))} fullWidth />
                        <TextField label="Peso b (# servicios)" value={loyaltyWeights.b} onChange={(e) => setLoyaltyWeights(v => ({ ...v, b: e.target.value }))} fullWidth />
                        <TextField label="Peso c (recencia)" value={loyaltyWeights.c} onChange={(e) => setLoyaltyWeights(v => ({ ...v, c: e.target.value }))} fullWidth />
                    </Stack>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                        <TextField label="Umbral promoción (≥)" value={promotionMin} onChange={(e) => setPromotionMin(e.target.value)} fullWidth />
                    </Stack>
                </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Stack spacing={2}>
                    <Typography variant="subtitle1">Morosidad</Typography>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                        <TextField label="Peso a (monto pendiente)" value={delinquencyWeights.a} onChange={(e) => setDelinquencyWeights(v => ({ ...v, a: e.target.value }))} fullWidth />
                        <TextField label="Peso b (# pendientes)" value={delinquencyWeights.b} onChange={(e) => setDelinquencyWeights(v => ({ ...v, b: e.target.value }))} fullWidth />
                    </Stack>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                        <TextField label="Umbral recordatorio (≥)" value={reminderMin} onChange={(e) => setReminderMin(e.target.value)} fullWidth />
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" onClick={handleSaveMarketing} disabled={savingMarketing}>Guardar Marketing</Button>
                    </Stack>
                </Stack>
            </Grid>
        </Grid>
    )
}