import { Box, Typography, Stack, Button } from "@mui/material";
import Link from "next/link";

export default function HomePage() {
    return (
        <Box sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
            px: 2,
            maxWidth: 600,
            mx: 'auto'
        }}>
            <Typography variant="h3" component="h1" gutterBottom textAlign="center">
                Gestión Administrativa para Autolavados
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
                Optimiza y controla tu autolavado con nuestra plataforma. Administra turnos, empleados, servicios, clientes y reportes de manera sencilla y eficiente desde cualquier dispositivo.
            </Typography>
            <Stack direction="row" spacing={2}>
                <Link href="/login">
                    <Button variant="contained" color="primary">
                        Iniciar Sesión
                    </Button>
                </Link>
            </Stack>
        </Box>
    )
}