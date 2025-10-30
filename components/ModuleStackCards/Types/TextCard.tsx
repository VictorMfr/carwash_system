import { TextCard as TextCardType } from "@/types/stackcards/stackcards";
import { Stack, Typography } from "@mui/material";

export default function TextCard({ data }: { data: TextCardType }) {
    return (
        <Stack direction="column" spacing={1}>
            {data.caption && <Typography variant="body2">{data.caption}</Typography>}
            {data.title && <Typography variant="h6">{data.title}</Typography>}
            {data.description && <Typography variant="body1">{data.description}</Typography>}
        </Stack>
    );
}