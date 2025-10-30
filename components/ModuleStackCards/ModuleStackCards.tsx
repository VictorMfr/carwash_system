import useFetch from "@/hooks/fetch/useFetch";
import { ModuleStackCardsData } from "@/types/stackcards/stackcards";
import { Card, CardContent, Grid, Skeleton, Typography } from "@mui/material";
import TextCard from "./Types/TextCard";
import FetchCard from "./Types/fetchCard";

const CardFactory = ({ data, fetchData }: { data: ModuleStackCardsData['data'][number], fetchData: any }) => {
    if (data.textCard) {
        return <TextCard data={data.textCard} />;
    }

    if (data.fetchCard) {
        const mappedData = data.fetchCard.mapper ? data.fetchCard.mapper(fetchData) : fetchData;
        return <FetchCard data={data} fetchData={mappedData} />;
    }

    return null;
}

export default function ModuleStackCards({
    moduleSettings,
}: {
    moduleSettings: ModuleStackCardsData;
}) {

    const { data, loading } = !moduleSettings.url ? { data: [], loading: false } : useFetch(moduleSettings.url);


    return (
        <Grid container spacing={2}>
            <Grid size={12}>
                <Typography variant="h6">{moduleSettings.title}</Typography>
            </Grid>
            {moduleSettings.data?.map((column) => (
                <Grid key={column.id} size={column.size}>
                    {loading ? (
                        <Skeleton variant="rounded" height={100} />
                    ) : (
                        <Card variant="outlined" sx={{
                            height: moduleSettings.config.cardHeight,
                            display: 'flex',
                            alignItems: 'flex-start'
                        }}>
                            <CardContent>
                                <CardFactory
                                    data={column}
                                    fetchData={data}
                                />
                            </CardContent>
                        </Card>
                    )}
                </Grid>
            ))}
        </Grid>
    );
}