import { CardData, FetchCard as FetchCardType } from "@/types/stackcards/stackcards";
import { Divider, Stack, Typography } from "@mui/material";

export default function FetchCard({
    data,
    fetchData
}: {
    data: CardData,
    fetchData: any[]
}) {
    if (!data.fetchCard) return null;




    return (
        <Stack direction="column" spacing={1}>
            {data.fetchCard?.caption && (
                <Typography variant="body2">{data.fetchCard?.caption}</Typography>
            )}
            {data.fetchCard?.title && (
                <Typography variant="h6">{data.fetchCard?.title}</Typography>
            )}
            {data.fetchCard?.description && (
                <Typography variant="body2">{data.fetchCard?.description}</Typography>
            )}
            {fetchData.map((item, index) => {
                const keys = Object.keys(item);

                return (
                    <Stack
                        direction={data.fetchCard?.dataDisplayDirection ?? 'column'}
                        spacing={1}
                        key={index}
                        justifyContent="space-between"
                    >

                        {keys.map(key => {
                            return (
                                <Stack direction="column" spacing={1} key={key}>
                                    <Typography>{key}: {item[key]}</Typography>
                                </Stack>
                            )
                        })}
                    </Stack>
                );
            })}
        </Stack>
    );
}