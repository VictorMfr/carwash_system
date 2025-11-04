'use client';

import React, { useEffect, useState } from 'react';
import { Document, PDFViewer, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Box, CircularProgress, Alert } from '@mui/material';

import { StockReportPages } from '@/components/Reports/Stock/StockReportsPage';
import { FinanceReportPages } from '@/components/Reports/Finance/FinanceReportsPage';
import { ServiceReportPages } from '@/components/Reports/Service/ServiceReportsPage';
import { ClientReportPages } from '@/components/Reports/Client/ClientReportsPage';

// Minimal types to satisfy props
type StockData = any;
type StockDetailData = any;
type StockStatistics = any;
type TransactionData = any;
type AccountData = any;
type FinanceStatistics = any;
type ServiceData = any;
type ServiceStatistics = any;
type ClientData = any;

export default function AllReportsPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [stock, setStock] = useState<StockData[]>([]);
    const [stockDetails, setStockDetails] = useState<StockDetailData[]>([]);
    const [stockStats, setStockStats] = useState<StockStatistics>({});

    const [transactions, setTransactions] = useState<TransactionData[]>([]);
    const [accounts, setAccounts] = useState<AccountData[]>([]);
    const [financeStats, setFinanceStats] = useState<FinanceStatistics>({});

    const [services, setServices] = useState<ServiceData[]>([]);
    const [serviceStats, setServiceStats] = useState<ServiceStatistics>({});

    const [clients, setClients] = useState<ClientData[]>([]);

    useEffect(() => {
        const loadAll = async () => {
            try {
                setLoading(true);
                const [
                    stockRes,
                    stockDetRes,
                    stockStatsRes,
                    trxRes,
                    accRes,
                    finStatsRes,
                    svcRes,
                    svcStatsRes,
                    clientsRes
                ] = await Promise.all([
                    fetch('/api/stock'),
                    fetch('/api/stock/details'),
                    fetch('/api/stock/statistics'),
                    fetch('/api/finance'),
                    fetch('/api/finance/account/balance'),
                    fetch('/api/finance/statistics'),
                    fetch('/api/service'),
                    fetch('/api/service/statistics'),
                    fetch('/api/service/client')
                ]);

                if (!stockRes.ok || !stockDetRes.ok || !stockStatsRes.ok || !trxRes.ok || !accRes.ok || !finStatsRes.ok || !svcRes.ok || !svcStatsRes.ok || !clientsRes.ok) {
                    throw new Error('Error al cargar datos de reportes');
                }

                setStock(await stockRes.json());
                setStockDetails(await stockDetRes.json());
                setStockStats(await stockStatsRes.json());

                setTransactions(await trxRes.json());
                setAccounts(await accRes.json());
                setFinanceStats(await finStatsRes.json());

                setServices(await svcRes.json());
                setServiceStats(await svcStatsRes.json());

                setClients(await clientsRes.json());
            } catch (e: any) {
                setError(e.message || 'Error al cargar los reportes');
            } finally {
                setLoading(false);
            }
        };
        loadAll();
    }, []);

	// Summary styles (neutral/academic)
	const styles = StyleSheet.create({
		page: { padding: 25, fontSize: 11, fontFamily: 'Times-Roman', color: '#1a1a1a' },
		header: { marginBottom: 12, paddingBottom: 6, borderBottom: '1 solid #2c2c2c' },
		title: { fontSize: 20, fontWeight: 'bold', marginBottom: 3, color: '#1a1a1a', letterSpacing: 0.5 },
		subtitle: { fontSize: 10, color: '#4a4a4a', marginBottom: 2, fontStyle: 'italic' },
		section: { marginBottom: 10 },
		sectionTitle: { fontSize: 12, fontWeight: 'bold', marginBottom: 6, marginTop: 8, borderBottom: '0.5 solid #8a8a8a', paddingBottom: 3, color: '#2c2c2c', letterSpacing: 0.3 },
		grid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 6 },
		card: { width: '48%', padding: 8, marginBottom: 6, marginRight: '2%', border: '0.5 solid #c8c8c8', backgroundColor: '#ffffff' },
		label: { fontSize: 9, color: '#6a6a6a', marginBottom: 2, fontStyle: 'italic' },
		value: { fontSize: 11, fontWeight: 'bold', color: '#1a1a1a' },
		table: { marginTop: 6, marginBottom: 10 },
		thead: { backgroundColor: '#3a3a3a', color: '#ffffff', flexDirection: 'row', padding: 5 },
		theadCell: { flex: 1, color: '#ffffff', fontWeight: 'bold', fontSize: 9, letterSpacing: 0.2 },
		row: { flexDirection: 'row', padding: 4, borderBottom: '0.5 solid #d0d0d0', minHeight: 18 },
		cell: { flex: 1, fontSize: 9, color: '#2a2a2a' },
		footer: { position: 'absolute', bottom: 20, left: 25, right: 25, textAlign: 'center', fontSize: 9, color: '#6a6a6a', borderTop: '0.5 solid #c8c8c8', paddingTop: 6, fontStyle: 'italic' }
	});

	// Aggregated indicators
	const totalProducts: number = Array.isArray(stock) ? stock.length : 0;
	const lowStockCount: number = Array.isArray(stock) ? stock.filter((s: any) => (s.total_quantity ?? 0) <= (s.minimum_quantity ?? 0)).length : 0;
	const totalInventoryValue: number = Array.isArray(stockDetails) ? stockDetails.reduce((sum: number, d: any) => sum + Number(d.price || 0) * Number(d.quantity || 0), 0) : 0;

	const totalTransactions: number = Array.isArray(transactions) ? transactions.length : 0;
	const totalIncome: number = Array.isArray(transactions) ? transactions.filter((t: any) => Number(t.amount) >= 0).reduce((s: number, t: any) => s + Number(t.amount), 0) : 0;
	const totalCosts: number = Array.isArray(transactions) ? transactions.filter((t: any) => Number(t.amount) < 0).reduce((s: number, t: any) => s + Math.abs(Number(t.amount)), 0) : 0;
	const netFinance: number = totalIncome - totalCosts;

	const totalServices: number = Array.isArray(services) ? services.length : 0;
	const completedServices: number = Array.isArray(services) ? services.filter((s: any) => s.status === 'Completado').length : 0;
	const completionRate: number = totalServices > 0 ? (completedServices / totalServices) * 100 : 0;

	const totalClients: number = Array.isArray(clients) ? clients.length : 0;
	const activeClients: number = (() => {
		if (!Array.isArray(services) || !Array.isArray(clients)) return 0;
		const names = new Set(services.map((s: any) => s.client).filter((n: any) => n));
		return Array.from(names).length;
	})();
	const activeRate: number = totalClients > 0 ? (activeClients / totalClients) * 100 : 0;

	const topRecipe: string | null = Array.isArray((serviceStats as any)?.servicesByRecipe)
		? [...(serviceStats as any).servicesByRecipe].sort((a: any, b: any) => b.value - a.value)[0]?.label ?? null
		: null;
	const topOperator: string | null = Array.isArray((serviceStats as any)?.servicesByOperator)
		? ([...(serviceStats as any).servicesByOperator].sort((a: any, b: any) => b.value - a.value)[0]?.label ?? null)
		: null;

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
                <Document>
					{/* Resumen Global */}
					<Page size="A4" style={styles.page}>
						<View style={styles.header}>
							<Text style={styles.title}>INFORME GLOBAL</Text>
							<Text style={styles.subtitle}>Resumen consolidado de Inventario, Finanzas, Servicios y Clientes</Text>
						</View>

						<View style={styles.section}>
							<Text style={styles.sectionTitle}>Indicadores Principales</Text>
							<View style={styles.grid}>
								<View style={styles.card}><Text style={styles.label}>Productos</Text><Text style={styles.value}>{totalProducts}</Text></View>
								<View style={styles.card}><Text style={styles.label}>Stock Bajo</Text><Text style={styles.value}>{lowStockCount}</Text></View>
								<View style={styles.card}><Text style={styles.label}>Valor Inventario</Text><Text style={styles.value}>Bs. {totalInventoryValue.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text></View>
								<View style={styles.card}><Text style={styles.label}>Transacciones</Text><Text style={styles.value}>{totalTransactions}</Text></View>
								<View style={styles.card}><Text style={styles.label}>Ingresos</Text><Text style={styles.value}>Bs. {totalIncome.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text></View>
								<View style={styles.card}><Text style={styles.label}>Costos</Text><Text style={styles.value}>Bs. {totalCosts.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text></View>
								<View style={styles.card}><Text style={styles.label}>Balance Neto</Text><Text style={styles.value}>Bs. {netFinance.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text></View>
								<View style={styles.card}><Text style={styles.label}>Servicios</Text><Text style={styles.value}>{totalServices}</Text></View>
								<View style={styles.card}><Text style={styles.label}>Completados</Text><Text style={styles.value}>{completedServices} ({completionRate.toFixed(1)}%)</Text></View>
								<View style={styles.card}><Text style={styles.label}>Clientes</Text><Text style={styles.value}>{totalClients}</Text></View>
								<View style={styles.card}><Text style={styles.label}>Clientes Activos</Text><Text style={styles.value}>{activeClients} ({activeRate.toFixed(1)}%)</Text></View>
							</View>
						</View>

						<View style={styles.section}>
							<Text style={styles.sectionTitle}>Destacados</Text>
							<View style={styles.grid}>
								<View style={styles.card}><Text style={styles.label}>Receta más frecuente</Text><Text style={styles.value}>{topRecipe ?? 'N/D'}</Text></View>
								<View style={styles.card}><Text style={styles.label}>Operador más activo</Text><Text style={styles.value}>{topOperator ?? 'N/D'}</Text></View>
							</View>
						</View>

						<View style={styles.footer}>
							<Text>Resumen Global | Generado automáticamente</Text>
						</View>
					</Page>
                    {/* Inventario */}
                    <StockReportPages stocks={stock} stockDetails={stockDetails} statistics={stockStats} />
                    {/* Finanzas */}
                    <FinanceReportPages transactions={transactions} accounts={accounts} statistics={financeStats} />
                    {/* Servicios */}
                    <ServiceReportPages services={services} statistics={serviceStats} />
                    {/* Clientes */}
                    <ClientReportPages clients={clients} services={services} />
                </Document>
            </PDFViewer>
        </Box>
    );
}