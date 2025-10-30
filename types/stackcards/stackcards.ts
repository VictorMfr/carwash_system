import { GridProps } from "@mui/material";

export interface TextCard {
    caption: string;
    title: string;
    description: string;
}

export interface FetchCard {
    caption?: string;
    title?: string;
    description?: string;
    dataDisplayDirection: 'row' | 'column';
    mapper?: (data: any) => {
        field: string;
        value: string;
    }[];
}

export interface CardData {
    id: string;
    textCard?: TextCard;
    fetchCard?: FetchCard;
    size: GridProps['size'];
}

export interface ModuleStackCardsData {
    url?: string;
    mapper?: (data: any) => {
        field: string;
        value: string;
    }[];
    title?: string;
    description: string;
    config: {
        cardWidth: number;
        cardHeight: number;
    },
    data: CardData[];
}