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

interface ServiceData {
    id: number;
    date: string;
    recipeName: string;
    vehicleLicensePlate: string;
    client: string;
    bol_charge: number;
    dollar_charge: number | null;
    dollar_rate: number;
    status: string;
    operators: Array<{ id: number; name: string; lastname: string }>;
}

interface ServiceStatistics {
    servicesByRecipe: Array<{ id: number; value: number; label: string }>;
    servicesByVehicle: Array<{ id: number; value: number; label: string }>;
    servicesByOperator: Array<{ id: number; value: number; label: string }>;
    servicesByMonth: Array<{ month: string; count: number }>;
}

// Export pages so they can be composed in a single PDF
export const ServiceReportPages = ({ 
    services, 
    statistics 
}: { 
    services: ServiceData[], 
    statistics: ServiceStatistics 
}) => {
    const totalServices = services.length;
    const totalRevenue = services.reduce((sum, s) => sum + s.bol_charge, 0);
    const totalDollarRevenue = services.reduce((sum, s) => sum + (s.dollar_charge || 0), 0);
    const avgRevenue = totalServices > 0 ? totalRevenue / totalServices : 0;
    const avgDollarRate = totalServices > 0 
        ? services.reduce((sum, s) => sum + s.dollar_rate, 0) / totalServices 
        : 0;
    
    const completedServices = services.filter(s => s.status === 'Completado').length;
    const pendingServices = services.filter(s => s.status === 'Pendiente').length;
    const completionRate = totalServices > 0 ? (completedServices / totalServices) * 100 : 0;
    
    const maxRevenue = services.length > 0
        ? Math.max(...services.map(s => s.bol_charge))
        : 0;
    const minRevenue = services.length > 0
        ? Math.min(...services.map(s => s.bol_charge))
        : 0;
    
    const totalOperators = new Set(services.flatMap(s => s.operators.map(op => op.id))).size;
    const totalClients = new Set(services.map(s => s.client)).size;
    const totalVehicles = new Set(services.map(s => s.vehicleLicensePlate)).size;
    
    // Últimos 10 servicios
    const recentServices = [...services]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 10);
    
    const currentDate = dayjs().format('DD/MM/YYYY');
    const currentTime = dayjs().format('HH:mm:ss');

    return (
        <>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.title}>REPORTE DE SERVICIOS</Text>
                    <Text style={styles.subtitle}>Fecha de generación: {currentDate} a las {currentTime}</Text>
                </View>

                {/* Resumen Ejecutivo */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Resumen Ejecutivo</Text>
                    <View style={styles.summary}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Total de servicios:</Text>
                            <Text style={styles.summaryValue}>{totalServices}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Servicios completados:</Text>
                            <Text style={styles.summaryValue}>{completedServices}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Servicios pendientes:</Text>
                            <Text style={styles.summaryValue}>{pendingServices}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Tasa de completación:</Text>
                            <Text style={styles.summaryValue}>{completionRate.toFixed(1)}%</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Total de ingresos (Bs):</Text>
                            <Text style={styles.summaryValue}>Bs. {totalRevenue.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Total de ingresos ($):</Text>
                            <Text style={styles.summaryValue}>$ {totalDollarRevenue.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Total de clientes únicos:</Text>
                            <Text style={styles.summaryValue}>{totalClients}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Total de vehículos atendidos:</Text>
                            <Text style={styles.summaryValue}>{totalVehicles}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Total de operadores:</Text>
                            <Text style={styles.summaryValue}>{totalOperators}</Text>
                        </View>
                    </View>
                </View>

                {/* Estadísticas de Servicios */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Estadísticas de Servicios</Text>
                    <View style={styles.statsGrid}>
                        <View style={styles.statsBox}>
                            <Text style={styles.statsLabel}>Ingreso Promedio por Servicio</Text>
                            <Text style={styles.statsValue}>Bs. {avgRevenue.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                        </View>
                        <View style={styles.statsBox}>
                            <Text style={styles.statsLabel}>Tasa Promedio de Dólar</Text>
                            <Text style={styles.statsValue}>Bs. {avgDollarRate.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                        </View>
                        <View style={styles.statsBox}>
                            <Text style={styles.statsLabel}>Mayor Ingreso Individual</Text>
                            <Text style={styles.statsValue}>Bs. {maxRevenue.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                        </View>
                        <View style={styles.statsBox}>
                            <Text style={styles.statsLabel}>Menor Ingreso Individual</Text>
                            <Text style={styles.statsValue}>Bs. {minRevenue.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                        </View>
                    </View>
                </View>

                {/* Servicios por Receta */}
{statistics.servicesByRecipe && statistics.servicesByRecipe.length > 0 ? (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Servicios por Receta</Text>
                        <View style={styles.table}>
                            <View style={styles.tableHeader}>
                                <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Receta</Text>
                                <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Cantidad</Text>
                            </View>
                            {statistics.servicesByRecipe.map((item) => (
                                <View key={item.id} style={styles.tableRow}>
                                    <Text style={[styles.tableCell, { flex: 2 }]}>{item.label}</Text>
                                    <Text style={[styles.tableCell, { flex: 1 }]}>{item.value}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
 ) : (
	<View style={styles.section}>
		<Text style={styles.sectionTitle}>Servicios por Receta</Text>
		<View style={styles.table}>
			<View style={styles.tableRow}>
				<Text style={[styles.tableCell, { flex: 1 }]}>No hay datos de servicios por receta.</Text>
			</View>
		</View>
	</View>
)}

                {/* Servicios por Mes */}
{statistics.servicesByMonth && statistics.servicesByMonth.length > 0 ? (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Servicios por Mes (Últimos 6 meses)</Text>
                        <View style={styles.table}>
                            <View style={styles.tableHeader}>
                                <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Mes</Text>
                                <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Cantidad</Text>
                            </View>
                            {statistics.servicesByMonth.map((item, index) => (
                                <View key={index} style={styles.tableRow}>
                                    <Text style={[styles.tableCell, { flex: 2 }]}>{item.month}</Text>
                                    <Text style={[styles.tableCell, { flex: 1 }]}>{item.count}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
 ) : (
	<View style={styles.section}>
		<Text style={styles.sectionTitle}>Servicios por Mes (Últimos 6 meses)</Text>
		<View style={styles.table}>
			<View style={styles.tableRow}>
				<Text style={[styles.tableCell, { flex: 1 }]}>No hay datos de servicios por mes.</Text>
			</View>
		</View>
	</View>
)}

                {pendingServices > 0 && (
                    <View style={styles.warning}>
                        <Text style={styles.warningText}>
                            Nota: {pendingServices} servicio(s) pendiente(s) de completar.
                        </Text>
                    </View>
                )}

                <View style={styles.footer}>
                    <Text>Página 1 de 2 | Generado el {currentDate} | Sistema de Gestión de Servicios</Text>
                </View>
            </Page>

            {/* Segunda Página - Tablas Detalladas */}
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.title}>SERVICIOS Y OPERADORES</Text>
                </View>

                {/* Servicios por Operador */}
{statistics.servicesByOperator && statistics.servicesByOperator.length > 0 ? (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Servicios por Operador</Text>
                        <View style={styles.table}>
                            <View style={styles.tableHeader}>
                                <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Operador</Text>
                                <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Cantidad de Servicios</Text>
                            </View>
                            {statistics.servicesByOperator.map((item) => (
                                <View key={item.id} style={styles.tableRow}>
                                    <Text style={[styles.tableCell, { flex: 2 }]}>{item.label}</Text>
                                    <Text style={[styles.tableCell, { flex: 1 }]}>{item.value}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
 ) : (
	<View style={styles.section}>
		<Text style={styles.sectionTitle}>Servicios por Operador</Text>
		<View style={styles.table}>
			<View style={styles.tableRow}>
				<Text style={[styles.tableCell, { flex: 1 }]}>No hay datos de servicios por operador.</Text>
			</View>
		</View>
	</View>
)}

                {/* Servicios por Vehículo */}
{statistics.servicesByVehicle && statistics.servicesByVehicle.length > 0 ? (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Servicios por Vehículo (Top 10)</Text>
                        <View style={styles.table}>
                            <View style={styles.tableHeader}>
                                <Text style={[styles.tableHeaderCell, { flex: 0.5 }]}>#</Text>
                                <Text style={[styles.tableHeaderCell, { flex: 1.5 }]}>Placa</Text>
                                <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Cantidad</Text>
                            </View>
                            {statistics.servicesByVehicle.slice(0, 10).map((item, index) => (
                                <View key={item.id} style={styles.tableRow}>
                                    <Text style={[styles.tableCell, { flex: 0.5 }]}>{index + 1}</Text>
                                    <Text style={[styles.tableCell, { flex: 1.5 }]}>{item.label}</Text>
                                    <Text style={[styles.tableCell, { flex: 1 }]}>{item.value}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
 ) : (
	<View style={styles.section}>
		<Text style={styles.sectionTitle}>Servicios por Vehículo (Top 10)</Text>
		<View style={styles.table}>
			<View style={styles.tableRow}>
				<Text style={[styles.tableCell, { flex: 1 }]}>No hay datos de servicios por vehículo.</Text>
			</View>
		</View>
	</View>
)}

                {/* Últimos Servicios */}
{recentServices.length > 0 ? (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Últimos 10 Servicios</Text>
                        <View style={styles.table}>
                            <View style={styles.tableHeader}>
                                <Text style={[styles.tableHeaderCell, { flex: 0.8 }]}>Fecha</Text>
                                <Text style={[styles.tableHeaderCell, { flex: 1.2 }]}>Cliente</Text>
                                <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Receta</Text>
                                <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Ingreso</Text>
                                <Text style={[styles.tableHeaderCell, { flex: 0.8 }]}>Estado</Text>
                            </View>
                            {recentServices.map((service) => (
                                <View key={service.id} style={styles.tableRow}>
                                    <Text style={[styles.tableCell, { flex: 0.8 }]}>
                                        {dayjs(service.date).format('DD/MM/YYYY')}
                                    </Text>
                                    <Text style={[styles.tableCell, { flex: 1.2 }]}>{service.client || 'N/A'}</Text>
                                    <Text style={[styles.tableCell, { flex: 1 }]}>{service.recipeName || 'N/A'}</Text>
                                    <Text style={[styles.tableCell, { flex: 1 }]}>
                                        Bs. {service.bol_charge.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </Text>
                                    <Text style={[styles.tableCell, { flex: 0.8, fontStyle: service.status === 'Pendiente' ? 'italic' : 'normal' }]}>
                                        {service.status}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
 ) : (
	<View style={styles.section}>
		<Text style={styles.sectionTitle}>Últimos 10 Servicios</Text>
		<View style={styles.table}>
			<View style={styles.tableRow}>
				<Text style={[styles.tableCell, { flex: 1 }]}>No hay servicios recientes.</Text>
			</View>
		</View>
	</View>
)}

                <View style={styles.footer}>
                    <Text>Página 2 de 2 | Generado el {currentDate} | Sistema de Gestión de Servicios</Text>
                </View>
            </Page>
        </>
    );
};

// Create Document Component (standalone viewer)
const ServiceReportDocument = ({ 
    services, 
    statistics 
}: { 
    services: ServiceData[], 
    statistics: ServiceStatistics 
}) => (
    <Document>
        <ServiceReportPages services={services} statistics={statistics} />
    </Document>
);

export default function ServiceReportsPage() {
    const [services, setServices] = useState<ServiceData[]>([]);
    const [statistics, setStatistics] = useState<ServiceStatistics>({
        servicesByRecipe: [],
        servicesByVehicle: [],
        servicesByOperator: [],
        servicesByMonth: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                
                // Fetch all data in parallel
                const [servicesRes, statsRes] = await Promise.all([
                    fetch('/api/service'),
                    fetch('/api/service/statistics')
                ]);

                if (!servicesRes.ok) {
                    throw new Error('Error al cargar los servicios');
                }
                if (!statsRes.ok) {
                    throw new Error('Error al cargar las estadísticas');
                }

                const servicesData = await servicesRes.json();
                const statsData = await statsRes.json();

                setServices(servicesData);
                setStatistics(statsData);
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
                <ServiceReportDocument 
                    services={services} 
                    statistics={statistics} 
                />
            </PDFViewer>
        </Box>
    );
}
