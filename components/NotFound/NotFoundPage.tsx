'use client';

import { Box, Typography, Button, Container } from '@mui/material';
import { Home, ArrowBack } from '@mui/icons-material';
import Link from 'next/link';

export default function NotFoundPage() {
    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    textAlign: 'center',
                    gap: 3,
                }}
            >
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: { xs: '4rem', sm: '6rem' },
                        fontWeight: 'bold',
                        color: 'primary.main',
                        lineHeight: 1,
                    }}
                >
                    404
                </Typography>
                
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        mb: 1,
                    }}
                >
                    Página no encontrada
                </Typography>
                
                <Typography
                    variant="body1"
                    sx={{
                        color: 'text.secondary',
                        mb: 4,
                        maxWidth: '400px',
                    }}
                >
                    Lo sentimos, la página que estás buscando no existe o ha sido movida.
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Button
                        component={Link}
                        href="/dashboard"
                        variant="contained"
                        startIcon={<Home />}
                        size="large"
                    >
                        Ir al Dashboard
                    </Button>
                    
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBack />}
                        onClick={() => window.history.back()}
                        size="large"
                    >
                        Volver atrás
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}