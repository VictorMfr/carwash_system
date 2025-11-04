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
    infoBox: {
        backgroundColor: '#f8f8f8',
        padding: 6,
        border: '0.5 solid #b0b0b0',
        marginTop: 6,
        marginBottom: 6,
    },
    infoText: {
        fontSize: 10,
        color: '#4a4a4a',
    },
    detailSection: {
        marginTop: 10,
        marginBottom: 10,
        padding: 8,
        backgroundColor: '#ffffff',
        border: '0.5 solid #d0d0d0',
    },
    productName: {
        fontSize: 11,
        fontWeight: 'bold',
        marginBottom: 3,
        color: '#2a2a2a',
    },
});

interface StockData {
    id: number;
    product: string;
    unit: string;
    total_quantity: number;
    minimum_quantity: number;
    StockDetails?: StockDetailData[];
}

interface StockDetailData {
    id: number;
    quantity: number;
    price: number;
    entry_date: string;
    brand: string;
    state: string;
    Stock?: {
        Product?: {
            name: string;
        };
    };
}

interface StockStatistics {
    productsByBrand: Array<{ id: number; value: number; label: string }>;
    productsByState: Array<{ id: number; value: number; label: string }>;
    costData: Array<{ month: string; cost: number }>;
    entryData: Array<{ month: string; entry: number }>;
}

// Export pages so they can be composed in a single PDF
export const StockReportPages = ({ stocks, stockDetails, statistics }: { stocks: StockData[], stockDetails: StockDetailData[], statistics: StockStatistics }) => {
    const totalProducts = stocks.length;
    const totalQuantity = stocks.reduce((sum, stock) => sum + stock.total_quantity, 0);
    const lowStockItems = stocks.filter(stock => stock.total_quantity <= stock.minimum_quantity);
    
    // Calcular valor total del inventario
    const totalValue = stockDetails.reduce((sum, detail) => sum + (detail.price * detail.quantity), 0);
    
    // Calcular precio promedio
    const avgPrice = stockDetails.length > 0 
        ? stockDetails.reduce((sum, detail) => sum + detail.price, 0) / stockDetails.length 
        : 0;
    
    // Precio más alto y más bajo
    const prices = stockDetails.map(d => d.price);
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
    
    // Total de detalles de inventario
    const totalStockDetails = stockDetails.length;
    
    // Últimas 5 entradas
    const recentEntries = [...stockDetails]
        .sort((a, b) => new Date(b.entry_date).getTime() - new Date(a.entry_date).getTime())
        .slice(0, 5);
    
    const currentDate = dayjs().format('DD/MM/YYYY');
    const currentTime = dayjs().format('HH:mm:ss');

    return (
        <>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.title}>REPORTE DE INVENTARIO</Text>
                    <Text style={styles.subtitle}>Fecha de generación: {currentDate} a las {currentTime}</Text>
                </View>

                {/* Resumen Ejecutivo */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Resumen Ejecutivo</Text>
                    <View style={styles.summary}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Total de productos en inventario:</Text>
                            <Text style={styles.summaryValue}>{totalProducts}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Cantidad total de unidades:</Text>
                            <Text style={styles.summaryValue}>{totalQuantity.toLocaleString()}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Valor total del inventario:</Text>
                            <Text style={styles.summaryValue}>Bs. {totalValue.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Total de entradas registradas:</Text>
                            <Text style={styles.summaryValue}>{totalStockDetails}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Productos con stock bajo:</Text>
                            <Text style={styles.summaryValue}>{lowStockItems.length}</Text>
                        </View>
                    </View>
                </View>

                {/* Estadísticas Financieras */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Estadísticas de Precios</Text>
                    <View style={styles.statsGrid}>
                        <View style={styles.statsBox}>
                            <Text style={styles.statsLabel}>Precio Promedio</Text>
                            <Text style={styles.statsValue}>Bs. {avgPrice.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                        </View>
                        <View style={styles.statsBox}>
                            <Text style={styles.statsLabel}>Precio Más Alto</Text>
                            <Text style={styles.statsValue}>Bs. {maxPrice.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                        </View>
                        <View style={styles.statsBox}>
                            <Text style={styles.statsLabel}>Precio Más Bajo</Text>
                            <Text style={styles.statsValue}>Bs. {minPrice.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                        </View>
                        <View style={styles.statsBox}>
                            <Text style={styles.statsLabel}>Valor Promedio por Entrada</Text>
                            <Text style={styles.statsValue}>Bs. {totalStockDetails > 0 ? (totalValue / totalStockDetails).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}</Text>
                        </View>
                    </View>
                </View>

                {/* Distribución por Marca */}
                {statistics.productsByBrand && statistics.productsByBrand.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Distribución por Marca</Text>
                        <View style={styles.table}>
                            <View style={styles.tableHeader}>
                                <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Marca</Text>
                                <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Cantidad de Productos</Text>
                            </View>
                            {statistics.productsByBrand.map((item, index) => (
                                <View key={index} style={styles.tableRow}>
                                    <Text style={[styles.tableCell, { flex: 2 }]}>{item.label}</Text>
                                    <Text style={[styles.tableCell, { flex: 1 }]}>{item.value}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {/* Distribución por Estado */}
                {statistics.productsByState && statistics.productsByState.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Distribución por Estado</Text>
                        <View style={styles.table}>
                            <View style={styles.tableHeader}>
                                <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Estado</Text>
                                <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Cantidad de Productos</Text>
                            </View>
                            {statistics.productsByState.map((item, index) => (
                                <View key={index} style={styles.tableRow}>
                                    <Text style={[styles.tableCell, { flex: 2 }]}>{item.label}</Text>
                                    <Text style={[styles.tableCell, { flex: 1 }]}>{item.value}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {/* Alertas */}
                {lowStockItems.length > 0 && (
                    <View style={styles.warning}>
                        <Text style={styles.warningText}>
                            Nota: {lowStockItems.length} producto(s) con stock igual o por debajo del mínimo requerido
                        </Text>
                    </View>
                )}

                <View style={styles.footer}>
                    <Text>Página 1 de 2 | Generado el {currentDate} | Sistema de Gestión de Inventario</Text>
                </View>
            </Page>

            {/* Segunda Página - Tabla de Inventario */}
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.title}>INVENTARIO POR PRODUCTO</Text>
                </View>

                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={[styles.tableHeaderCell, { flex: 0.4 }]}>#</Text>
                        <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Producto</Text>
                        <Text style={[styles.tableHeaderCell, { flex: 0.8 }]}>Cantidad</Text>
                        <Text style={[styles.tableHeaderCell, { flex: 0.6 }]}>Unidad</Text>
                        <Text style={[styles.tableHeaderCell, { flex: 0.8 }]}>Mínimo</Text>
                        <Text style={[styles.tableHeaderCell, { flex: 0.8 }]}>Estado</Text>
                    </View>
					{stocks.length > 0 ? stocks.map((stock, index) => {
                        const isLowStock = stock.total_quantity <= stock.minimum_quantity;
                        return (
                            <View key={stock.id} style={styles.tableRow}>
                                <Text style={[styles.tableCell, { flex: 0.4 }]}>{index + 1}</Text>
                                <Text style={[styles.tableCell, { flex: 2 }]}>{stock.product}</Text>
                                <Text style={[styles.tableCell, { flex: 0.8 }]}>{stock.total_quantity.toLocaleString()}</Text>
                                <Text style={[styles.tableCell, { flex: 0.6 }]}>{stock.unit}</Text>
                                <Text style={[styles.tableCell, { flex: 0.8 }]}>{stock.minimum_quantity.toLocaleString()}</Text>
                                <Text style={[styles.tableCell, { flex: 0.8, color: isLowStock ? '#4a4a4a' : '#2a2a2a', fontStyle: isLowStock ? 'italic' : 'normal' }]}>
                                    {isLowStock ? 'Bajo' : 'Normal'}
                                </Text>
                            </View>
                        );
					}) : (
						<View style={styles.tableRow}>
							<Text style={[styles.tableCell, { flex: 1 }]}>No hay productos en inventario.</Text>
						</View>
					)}
                </View>

                {/* Últimas Entradas */}
				{recentEntries.length > 0 ? (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Últimas 5 Entradas al Inventario</Text>
                        <View style={styles.table}>
                            <View style={styles.tableHeader}>
                                <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Producto</Text>
                                <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Marca</Text>
                                <Text style={[styles.tableHeaderCell, { flex: 0.8 }]}>Cantidad</Text>
                                <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Precio</Text>
                                <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Fecha</Text>
                            </View>
                            {recentEntries.map((entry, index) => (
                                <View key={entry.id} style={styles.tableRow}>
                                    <Text style={[styles.tableCell, { flex: 2 }]}>
                                        {entry.Stock?.Product?.name || 'N/A'}
                                    </Text>
                                    <Text style={[styles.tableCell, { flex: 1 }]}>{entry.brand}</Text>
                                    <Text style={[styles.tableCell, { flex: 0.8 }]}>{entry.quantity.toLocaleString()}</Text>
                                    <Text style={[styles.tableCell, { flex: 1 }]}>
                                        Bs. {entry.price.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </Text>
                                    <Text style={[styles.tableCell, { flex: 1 }]}>{dayjs(entry.entry_date).format('DD/MM/YYYY')}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
				) : (
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>Últimas 5 Entradas al Inventario</Text>
						<View style={styles.table}>
							<View style={styles.tableRow}>
								<Text style={[styles.tableCell, { flex: 1 }]}>No hay entradas recientes.</Text>
							</View>
						</View>
					</View>
				)}

                <View style={styles.footer}>
                    <Text>Página 2 de 2 | Generado el {currentDate} | Sistema de Gestión de Inventario</Text>
                </View>
            </Page>
        </>
    );
};

// Create Document Component (standalone viewer)
const StockReportDocument = ({ stocks, stockDetails, statistics }: { stocks: StockData[], stockDetails: StockDetailData[], statistics: StockStatistics }) => (
    <Document>
        <StockReportPages stocks={stocks} stockDetails={stockDetails} statistics={statistics} />
    </Document>
);

export default function StockReportsPage() {
    const [stocks, setStocks] = useState<StockData[]>([]);
    const [stockDetails, setStockDetails] = useState<StockDetailData[]>([]);
    const [statistics, setStatistics] = useState<StockStatistics>({
        productsByBrand: [],
        productsByState: [],
        costData: [],
        entryData: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                
                // Fetch all data in parallel
                const [stocksRes, detailsRes, statsRes] = await Promise.all([
                    fetch('/api/stock'),
                    fetch('/api/stock/details'),
                    fetch('/api/stock/statistics')
                ]);

                if (!stocksRes.ok) {
                    throw new Error('Error al cargar los datos del inventario');
                }
                if (!detailsRes.ok) {
                    throw new Error('Error al cargar los detalles del inventario');
                }
                if (!statsRes.ok) {
                    throw new Error('Error al cargar las estadísticas');
                }

                const stocksData = await stocksRes.json();
                const detailsData = await detailsRes.json();
                const statsData = await statsRes.json();

                setStocks(stocksData);
                setStockDetails(detailsData);
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
                <StockReportDocument stocks={stocks} stockDetails={stockDetails} statistics={statistics} />
            </PDFViewer>
        </Box>
    );
}
