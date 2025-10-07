'use client';

import { Box, Button, Link, Paper, Stack, TextField, Typography } from "@mui/material";
import useLoginController from "./useLoginController";

export default function LoginPage() {
    const controller = useLoginController();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "background.default",
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    maxWidth: 400,
                    width: "100%",
                    px: 4,
                    py: 5,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <form action={controller.action} style={{ width: "100%" }}>
                    <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
                        Login
                    </Typography>
                    {controller.state.error && (
                        <Typography variant="body1" sx={{ color: "red", mb: 2, textAlign: "center" }}>
                            {controller.state.error}
                        </Typography>
                    )}
                    <Stack spacing={2}>
                        <Button
                            variant="outlined"
                            component="label"
                            sx={{ display: "none" }}
                        />
                        <TextField
                            type="email"
                            name="email"
                            label="Email"
                            placeholder="Email"
                            required
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            type="password"
                            name="password"
                            label="Password"
                            placeholder="Password"
                            required
                            fullWidth
                            variant="outlined"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={controller.pending}
                            sx={{ mt: 2 }}
                            fullWidth
                        >
                            Login
                        </Button>
                        <Link href="/passwordRecover" style={{ textAlign: "center", width: "100%" }}>
                            <Typography variant="body1" sx={{ color: "blue", mb: 2, textAlign: "center" }}>
                                Forgot password?
                            </Typography>
                        </Link>
                    </Stack>
                </form>
            </Paper>
        </Box>
    )
}