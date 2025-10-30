'use client';

import { ModuleStackCardsData } from "@/types/stackcards/stackcards";
import ModuleStackCards from "../ModuleStackCards/ModuleStackCards";
import dayjs from "dayjs";

const SettingsModule: ModuleStackCardsData = {
    url: 'https://ve.dolarapi.com/v1/dolares',
    title: 'Configuración',
    description: 'Aquí puedes configurar tu sistema.',
    config: {
        cardWidth: 12,
        cardHeight: 12,
    },
    data: [
        {
            id: '1',
            textCard: {
                caption: 'Configuración',
                title: 'Tasas dolares',
                description: 'Aquí puedes configurar tu sistema.',
            },
            size: { xs: 12, md: 4 },
        },
        {
            id: '2',
            fetchCard: {
                dataDisplayDirection: 'row',
                caption: 'Configuración',
                title: 'Tasas dolares',
                description: 'Aquí puedes configurar tu sistema.',
                mapper: (data) => {
                    return data.map((item: any) => {
                        return {
                            [item.nombre]: `${item.promedio}bs`,
                            Fecha: dayjs(item.fechaActualizacion).format('DD/MM/YYYY'),
                        }
                    });
                },
            },
            size: { xs: 12, md: 4 },
        }
    ]

}

export default function SettingsPage() {
    return <ModuleStackCards moduleSettings={SettingsModule} />
}