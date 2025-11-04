import { Avatar, ListItemAvatar, ListItemText, Stack } from "@mui/material";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

export default function PictureCartItem({ option }: { option: any }) {
    const [loading, setLoading] = useState(!!option.picture);

    return (
        <Stack
            direction="row"
            alignItems="center"
            gap={1}
        >
            <ListItemAvatar>
                <div style={{ position: "relative", width: 50, height: 50 }}>
                    {loading && (
                        <CircularProgress
                            size={32}
                            sx={{
                                position: "absolute",
                                top: 10,
                                left: 10,
                                zIndex: 1,
                            }}
                        />
                    )}
                    <Avatar
                        variant="rounded"
                        src={option.picture}
                        alt={option.name}
                        sx={{ width: 50, height: 50, opacity: loading ? 0.6 : 1 }}
                        imgProps={{
                            onLoad: () => setLoading(false),
                            onError: () => setLoading(false),
                        }}
                    />
                </div>
            </ListItemAvatar>
            <ListItemText
                primary={option.name}
                secondary={option.brand}
            />
        </Stack>
    );
}