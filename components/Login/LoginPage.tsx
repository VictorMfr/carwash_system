'use client';

import { Box, Button, Link, Paper, Stack, TextField, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import useLoginController from "./useLoginController";
import withUIDisplayControls from "@/HOC/withUIDisplayControls";

const LoginPage = () => {
    const controller = useLoginController();
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "background.default",
            }}
        >

            <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
                Iniciar sesión
            </Typography>

            <Stack spacing={2}>
                <TextField
                    value={controller.formData.email.value}
                    onChange={(e) => controller.setEmail(e.target.value)}
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="Email"
                    required
                    fullWidth
                    variant="outlined"
                    error={!!controller.formData.email.error}
                    helperText={controller.formData.email.error}
                />
                <TextField
                    value={controller.formData.password.value}
                    onChange={(e) => controller.setPassword(e.target.value)}
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Password"
                    required
                    fullWidth
                    variant="outlined"
                    error={!!controller.formData.password.error}
                    helperText={controller.formData.password.error}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    fullWidth
                    onClick={controller.login}
                    loading={controller.formData.loading}
                >
                    Login
                </Button>
                <Link href="/passwordRecover" style={{ textAlign: "center", width: "100%" }}>
                    <Typography variant="body1" sx={{ color: "blue", mb: 2, textAlign: "center" }}>
                        Forgot password?
                    </Typography>
                </Link>
            </Stack>
        </Box>
    )
}

export default withUIDisplayControls(LoginPage);