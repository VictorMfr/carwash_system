'use client';

import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { Box, CircularProgress, Alert } from '@mui/material';
import dayjs from 'dayjs';

// Create styles - Academic/Neutral Style - Compact
const styles = StyleSheet.create({
    page: {
        padding: 25,
        fontSize: 11,
        fontFamily: 'Times-Roman',
        color: '#1a1a1a',
    },
    header: {
        marginBottom: 12,
        paddingBottom: 6,
        borderBottom: '1 solid #2c2c2c',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 3,
        color: '#1a1a1a',
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 10,
        color: '#4a4a4a',
        marginBottom: 2,
        fontStyle: 'italic',
    },
    section: {
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 6,
        marginTop: 8,
        borderBottom: '0.5 solid #8a8a8a',
        paddingBottom: 3,
        color: '#2c2c2c',
        letterSpacing: 0.3,
    },
    summary: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#fafafa',
        border: '0.5 solid #d0d0d0',
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 3,
        paddingBottom: 2,
        borderBottom: '0.3 solid #e8e8e8',
    },
    summaryLabel: {
        fontWeight: 'normal',
        fontSize: 10,
        color: '#4a4a4a',
    },
    summaryValue: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 6,
    },
    statsBox: {
        width: '48%',
        padding: 8,
        marginBottom: 6,
        backgroundColor: '#ffffff',
        border: '0.5 solid #c8c8c8',
        marginRight: '2%',
    },
    statsLabel: {
        fontSize: 9,
        color: '#6a6a6a',
        marginBottom: 2,
        fontStyle: 'italic',
    },
    statsValue: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    table: {
        marginTop: 6,
        marginBottom: 10,
    },
    tableHeader: {
        backgroundColor: '#3a3a3a',
        color: '#ffffff',
        flexDirection: 'row',
        padding: 5,
    },
    tableHeaderCell: {
        flex: 1,
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 9,
        letterSpacing: 0.2,
    },
    tableRow: {
        flexDirection: 'row',
        padding: 4,
        borderBottom: '0.5 solid #d0d0d0',
        minHeight: 18,
        backgroundColor: '#ffffff',
    },
    tableCell: {
        flex: 1,
        fontSize: 9,
        color: '#2a2a2a',
    },
    tableSmallCell: {
        flex: 0.5,
        fontSize: 9,
        color: '#2a2a2a',
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        left: 25,
        right: 25,
        textAlign: 'center',
        fontSize: 9,
        color: '#6a6a6a',
        borderTop: '0.5 solid #c8c8c8',
        paddingTop: 6,
        fontStyle: 'italic',
    },
    warning: {
        backgroundColor: '#f5f5f5',
        padding: 6,
        border: '0.5 solid #8a8a8a',
        marginTop: 6,
        marginBottom: 6,
    },
    warningText: {
        fontSize: 10,
        color: '#4a4a4a',
        fontStyle: 'italic',
    },
});

interface ClientData {
    id: number;
    name: string;
    lastname: string;
    phone: string;
}

interface ServiceData {
    id: number;
    date: string;
    client: string;
    vehicleLicensePlate: string;
    bol_charge: number;
    dollar_charge: number | null;
    status: string;
}

interface ClientStatistics {
    clientName: string;
    totalServices: number;
    totalSpent: number;
    totalSpentDollar: number;
    vehicles: Set<string>;
    lastServiceDate: string | null;
}

// Export pages so they can be composed in a single PDF
export const ClientReportPages = ({ 
    clients, 
    services 
}: { 
    clients: ClientData[], 
    services: ServiceData[] 
}) => {
    const totalClients = clients.length;
    
    // Agrupar servicios por cliente
    const clientStatsMap = new Map<string, ClientStatistics>();
    
    services.forEach(service => {
        if (!service.client || service.client === 'N/A') return;
        
        const clientName = service.client;
        if (!clientStatsMap.has(clientName)) {
            clientStatsMap.set(clientName, {
                clientName,
                totalServices: 0,
                totalSpent: 0,
                totalSpentDollar: 0,
                vehicles: new Set(),
                lastServiceDate: null
            });
        }
        
        const stats = clientStatsMap.get(clientName)!;
        stats.totalServices += 1;
        stats.totalSpent += service.bol_charge;
        stats.totalSpentDollar += service.dollar_charge || 0;
        stats.vehicles.add(service.vehicleLicensePlate);
        
        if (!stats.lastServiceDate || new Date(service.date) > new Date(stats.lastServiceDate)) {
            stats.lastServiceDate = service.date;
        }
    });
    
    const clientStats = Array.from(clientStatsMap.values())
        .sort((a, b) => b.totalServices - a.totalServices);
    
    const clientsWithServices = clientStats.length;
    const clientsWithoutServices = totalClients - clientsWithServices;
    
    const totalRevenue = services.reduce((sum, s) => sum + s.bol_charge, 0);
    const avgServicesPerClient = clientsWithServices > 0 
        ? services.length / clientsWithServices 
        : 0;
    const avgSpentPerClient = clientsWithServices > 0
        ? clientStats.reduce((sum, c) => sum + c.totalSpent, 0) / clientsWithServices
        : 0;
    
    const topClient = clientStats.length > 0 ? clientStats[0] : null;
    const topSpender = clientStats.length > 0
        ? [...clientStats].sort((a, b) => b.totalSpent - a.totalSpent)[0]
        : null;
    
    const totalVehicles = new Set(services.map(s => s.vehicleLicensePlate)).size;
    
    // Top 10 clientes por servicios
    const topClientsByServices = clientStats.slice(0, 10);
    
    // Top 10 clientes por gasto
    const topClientsBySpending = [...clientStats]
        .sort((a, b) => b.totalSpent - a.totalSpent)
        .slice(0, 10);
    
    const currentDate = dayjs().format('DD/MM/YYYY');
    const currentTime = dayjs().format('HH:mm:ss');

    return (
        <>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.title}>REPORTE DE CLIENTES</Text>
                    <Text style={styles.subtitle}>Fecha de generación: {currentDate} a las {currentTime}</Text>
                </View>

                {/* Resumen Ejecutivo */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Resumen Ejecutivo</Text>
                    <View style={styles.summary}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Total de clientes registrados:</Text>
                            <Text style={styles.summaryValue}>{totalClients}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Clientes con servicios:</Text>
                            <Text style={styles.summaryValue}>{clientsWithServices}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Clientes sin servicios:</Text>
                            <Text style={styles.summaryValue}>{clientsWithoutServices}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Total de vehículos atendidos:</Text>
                            <Text style={styles.summaryValue}>{totalVehicles}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Total de servicios realizados:</Text>
                            <Text style={styles.summaryValue}>{services.length}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Total de ingresos generados:</Text>
                            <Text style={styles.summaryValue}>Bs. {totalRevenue.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Tasa de clientes activos:</Text>
                            <Text style={styles.summaryValue}>
                                {totalClients > 0 ? ((clientsWithServices / totalClients) * 100).toFixed(1) : 0}%
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Estadísticas de Clientes */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Estadísticas de Clientes</Text>
                    <View style={styles.statsGrid}>
                        <View style={styles.statsBox}>
                            <Text style={styles.statsLabel}>Servicios Promedio por Cliente</Text>
                            <Text style={styles.statsValue}>{avgServicesPerClient.toFixed(1)}</Text>
                        </View>
                        <View style={styles.statsBox}>
                            <Text style={styles.statsLabel}>Gasto Promedio por Cliente</Text>
                            <Text style={styles.statsValue}>Bs. {avgSpentPerClient.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                        </View>
                        {topClient && (
                            <View style={styles.statsBox}>
                                <Text style={styles.statsLabel}>Cliente con Más Servicios</Text>
                                <Text style={styles.statsValue}>{topClient.clientName}</Text>
                                <Text style={[styles.statsLabel, { fontSize: 8, marginTop: 2 }]}>{topClient.totalServices} servicios</Text>
                            </View>
                        )}
                        {topSpender && (
                            <View style={styles.statsBox}>
                                <Text style={styles.statsLabel}>Cliente con Mayor Gasto</Text>
                                <Text style={styles.statsValue}>{topSpender.clientName}</Text>
                                <Text style={[styles.statsLabel, { fontSize: 8, marginTop: 2 }]}>
                                    Bs. {topSpender.totalSpent.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>

                {/* Top 10 Clientes por Servicios */}
{topClientsByServices.length > 0 ? (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Top 10 Clientes por Cantidad de Servicios</Text>
                        <View style={styles.table}>
                            <View style={styles.tableHeader}>
                                <Text style={[styles.tableHeaderCell, { flex: 0.5 }]}>#</Text>
                                <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Cliente</Text>
                                <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Servicios</Text>
                                <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Vehículos</Text>
                                <Text style={[styles.tableHeaderCell, { flex: 1.2 }]}>Total Gastado</Text>
                            </View>
                            {topClientsByServices.map((client, index) => (
                                <View key={index} style={styles.tableRow}>
                                    <Text style={[styles.tableCell, { flex: 0.5 }]}>{index + 1}</Text>
                                    <Text style={[styles.tableCell, { flex: 2 }]}>{client.clientName}</Text>
                                    <Text style={[styles.tableCell, { flex: 1 }]}>{client.totalServices}</Text>
                                    <Text style={[styles.tableCell, { flex: 1 }]}>{client.vehicles.size}</Text>
                                    <Text style={[styles.tableCell, { flex: 1.2 }]}>
                                        Bs. {client.totalSpent.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
 ) : (
	<View style={styles.section}>
		<Text style={styles.sectionTitle}>Top 10 Clientes por Cantidad de Servicios</Text>
		<View style={styles.table}>
			<View style={styles.tableRow}>
				<Text style={[styles.tableCell, { flex: 1 }]}>No hay datos disponibles.</Text>
			</View>
		</View>
	</View>
)}

                {clientsWithoutServices > 0 && (
                    <View style={styles.warning}>
                        <Text style={styles.warningText}>
                            Nota: {clientsWithoutServices} cliente(s) registrado(s) sin servicios asociados.
                        </Text>
                    </View>
                )}

                <View style={styles.footer}>
                    <Text>Página 1 de 2 | Generado el {currentDate} | Sistema de Gestión de Clientes</Text>
                </View>
            </Page>

            {/* Segunda Página - Tablas Detalladas */}
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.title}>CLIENTES Y GASTOS</Text>
                </View>

                {/* Top 10 Clientes por Gasto */}
{topClientsBySpending.length > 0 ? (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Top 10 Clientes por Gasto Total</Text>
                        <View style={styles.table}>
                            <View style={styles.tableHeader}>
                                <Text style={[styles.tableHeaderCell, { flex: 0.5 }]}>#</Text>
                                <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Cliente</Text>
                                <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Servicios</Text>
                                <Text style={[styles.tableHeaderCell, { flex: 1.2 }]}>Total (Bs)</Text>
                                <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Total ($)</Text>
                            </View>
                            {topClientsBySpending.map((client, index) => (
                                <View key={index} style={styles.tableRow}>
                                    <Text style={[styles.tableCell, { flex: 0.5 }]}>{index + 1}</Text>
                                    <Text style={[styles.tableCell, { flex: 2 }]}>{client.clientName}</Text>
                                    <Text style={[styles.tableCell, { flex: 1 }]}>{client.totalServices}</Text>
                                    <Text style={[styles.tableCell, { flex: 1.2 }]}>
                                        Bs. {client.totalSpent.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </Text>
                                    <Text style={[styles.tableCell, { flex: 1 }]}>
                                        $ {client.totalSpentDollar.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
 ) : (
	<View style={styles.section}>
		<Text style={styles.sectionTitle}>Top 10 Clientes por Gasto Total</Text>
		<View style={styles.table}>
			<View style={styles.tableRow}>
				<Text style={[styles.tableCell, { flex: 1 }]}>No hay datos disponibles.</Text>
			</View>
		</View>
	</View>
)}

                {/* Lista Completa de Clientes */}
{clients.length > 0 ? (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Lista de Clientes Registrados</Text>
                        <View style={styles.table}>
                            <View style={styles.tableHeader}>
                                <Text style={[styles.tableHeaderCell, { flex: 0.5 }]}>#</Text>
                                <Text style={[styles.tableHeaderCell, { flex: 1.5 }]}>Nombre</Text>
                                <Text style={[styles.tableHeaderCell, { flex: 1.5 }]}>Apellido</Text>
                                <Text style={[styles.tableHeaderCell, { flex: 1.2 }]}>Teléfono</Text>
                                <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Servicios</Text>
                                <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Gasto Total</Text>
                            </View>
                            {clients.map((client, index) => {
                                const stats = clientStats.find(c => 
                                    c.clientName === `${client.name} ${client.lastname}`
                                );
                                return (
                                    <View key={client.id} style={styles.tableRow}>
                                        <Text style={[styles.tableCell, { flex: 0.5 }]}>{index + 1}</Text>
                                        <Text style={[styles.tableCell, { flex: 1.5 }]}>{client.name}</Text>
                                        <Text style={[styles.tableCell, { flex: 1.5 }]}>{client.lastname}</Text>
                                        <Text style={[styles.tableCell, { flex: 1.2 }]}>{client.phone}</Text>
                                        <Text style={[styles.tableCell, { flex: 1 }]}>
                                            {stats ? stats.totalServices : 0}
                                        </Text>
                                        <Text style={[styles.tableCell, { flex: 1 }]}>
                                            {stats 
                                                ? `Bs. ${stats.totalSpent.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                                                : '-'
                                            }
                                        </Text>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
 ) : (
	<View style={styles.section}>
		<Text style={styles.sectionTitle}>Lista de Clientes Registrados</Text>
		<View style={styles.table}>
			<View style={styles.tableRow}>
				<Text style={[styles.tableCell, { flex: 1 }]}>No hay clientes registrados.</Text>
			</View>
		</View>
	</View>
)}

                <View style={styles.footer}>
                    <Text>Página 2 de 2 | Generado el {currentDate} | Sistema de Gestión de Clientes</Text>
                </View>
            </Page>
        </>
    );
};

// Create Document Component (standalone viewer)
const ClientReportDocument = ({ 
    clients, 
    services 
}: { 
    clients: ClientData[], 
    services: ServiceData[] 
}) => (
    <Document>
        <ClientReportPages clients={clients} services={services} />
    </Document>
);

export default function ClientReportsPage() {
    const [clients, setClients] = useState<ClientData[]>([]);
    const [services, setServices] = useState<ServiceData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                
                // Fetch all data in parallel
                const [clientsRes, servicesRes] = await Promise.all([
                    fetch('/api/service/client'),
                    fetch('/api/service')
                ]);

                if (!clientsRes.ok) {
                    throw new Error('Error al cargar los clientes');
                }
                if (!servicesRes.ok) {
                    throw new Error('Error al cargar los servicios');
                }

                const clientsData = await clientsRes.json();
                const servicesData = await servicesRes.json();

                setClients(clientsData);
                setServices(servicesData);
            } catch (err: any) {
                setError(err.message || 'Error al cargar los datos');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3 }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ width: '100vw', height: '100vh' }}>
            <PDFViewer height={'100%'} width={'100%'}>
                <ClientReportDocument 
                    clients={clients} 
                    services={services} 
                />
            </PDFViewer>
        </Box>
    );
}
