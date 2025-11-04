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
    positive: {
        color: '#2a2a2a',
    },
    negative: {
        color: '#4a4a4a',
        fontStyle: 'italic',
    },
});

interface TransactionData {
    id: number;
    date: string;
    amount: number;
    description: string;
    dollar_rate: number;
    account: string;
    method: string;
    user?: string;
}

interface AccountData {
    id: number;
    name: string;
    description: string;
    balance: number;
}

interface FinanceStatistics {
    incomeData: Array<{ month: string; income: number }>;
    costData: Array<{ month: string; cost: number }>;
    dollarData: Array<{ month: string; dollar: number }>;
}

// Export pages so they can be composed in a single PDF
export const FinanceReportPages = ({ 
    transactions, 
    accounts, 
    statistics 
}: { 
    transactions: TransactionData[], 
    accounts: AccountData[], 
    statistics: FinanceStatistics 
}) => {
    const totalTransactions = transactions.length;
    const totalIncome = transactions
        .filter(t => t.amount >= 0)
        .reduce((sum, t) => sum + t.amount, 0);
    const totalCosts = transactions
        .filter(t => t.amount < 0)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    const netBalance = totalIncome - totalCosts;
    
    const incomeTransactions = transactions.filter(t => t.amount >= 0);
    const costTransactions = transactions.filter(t => t.amount < 0);
    
    const avgIncome = incomeTransactions.length > 0 
        ? totalIncome / incomeTransactions.length 
        : 0;
    const avgCost = costTransactions.length > 0 
        ? totalCosts / costTransactions.length 
        : 0;
    
    const avgDollarRate = transactions.length > 0
        ? transactions.reduce((sum, t) => sum + (t.dollar_rate || 0), 0) / transactions.filter(t => t.dollar_rate).length
        : 0;
    
    const maxIncome = incomeTransactions.length > 0
        ? Math.max(...incomeTransactions.map(t => t.amount))
        : 0;
    const maxCost = costTransactions.length > 0
        ? Math.max(...costTransactions.map(t => Math.abs(t.amount)))
        : 0;
    
    const totalAccounts = accounts.length;
    const totalAccountBalance = accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0);
    
    // Últimas 10 transacciones
    const recentTransactions = [...transactions]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 10);
    
    const currentDate = dayjs().format('DD/MM/YYYY');
    const currentTime = dayjs().format('HH:mm:ss');

    return (
        <>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.title}>REPORTE DE FINANZAS</Text>
                    <Text style={styles.subtitle}>Fecha de generación: {currentDate} a las {currentTime}</Text>
                </View>

                {/* Resumen Ejecutivo */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Resumen Ejecutivo</Text>
                    <View style={styles.summary}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Total de transacciones:</Text>
                            <Text style={styles.summaryValue}>{totalTransactions}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Total de ingresos:</Text>
                            <Text style={styles.summaryValue}>Bs. {totalIncome.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Total de costos:</Text>
                            <Text style={styles.summaryValue}>Bs. {totalCosts.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Balance neto:</Text>
                            <Text style={[styles.summaryValue, netBalance >= 0 ? styles.positive : styles.negative]}>
                                Bs. {netBalance.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Tasa promedio de dólar:</Text>
                            <Text style={styles.summaryValue}>Bs. {avgDollarRate.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Total de cuentas:</Text>
                            <Text style={styles.summaryValue}>{totalAccounts}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Balance total de cuentas:</Text>
                            <Text style={styles.summaryValue}>Bs. {totalAccountBalance.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                        </View>
                    </View>
                </View>

                {/* Estadísticas Financieras */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Estadísticas Financieras</Text>
                    <View style={styles.statsGrid}>
                        <View style={styles.statsBox}>
                            <Text style={styles.statsLabel}>Ingreso Promedio</Text>
                            <Text style={styles.statsValue}>Bs. {avgIncome.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                        </View>
                        <View style={styles.statsBox}>
                            <Text style={styles.statsLabel}>Costo Promedio</Text>
                            <Text style={styles.statsValue}>Bs. {avgCost.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                        </View>
                        <View style={styles.statsBox}>
                            <Text style={styles.statsLabel}>Mayor Ingreso Individual</Text>
                            <Text style={styles.statsValue}>Bs. {maxIncome.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                        </View>
                        <View style={styles.statsBox}>
                            <Text style={styles.statsLabel}>Mayor Costo Individual</Text>
                            <Text style={styles.statsValue}>Bs. {maxCost.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                        </View>
                    </View>
                </View>

                {/* Estadísticas por Mes */}
{statistics.incomeData && statistics.incomeData.length > 0 ? (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Ingresos por Mes (Últimos 6 meses)</Text>
                        <View style={styles.table}>
                            <View style={styles.tableHeader}>
                                <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Mes</Text>
                                <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Ingresos</Text>
                            </View>
                            {statistics.incomeData.slice(-6).map((item, index) => (
                                <View key={index} style={styles.tableRow}>
                                    <Text style={[styles.tableCell, { flex: 2 }]}>{item.month}</Text>
                                    <Text style={[styles.tableCell, { flex: 1 }]}>
                                        Bs. {item.income.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
 ) : (
	<View style={styles.section}>
		<Text style={styles.sectionTitle}>Ingresos por Mes (Últimos 6 meses)</Text>
		<View style={styles.table}>
			<View style={styles.tableRow}>
				<Text style={[styles.tableCell, { flex: 1 }]}>No hay datos de ingresos por mes.</Text>
			</View>
		</View>
	</View>
)}

                {/* Costos por Mes */}
{statistics.costData && statistics.costData.length > 0 ? (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Costos por Mes (Últimos 6 meses)</Text>
                        <View style={styles.table}>
                            <View style={styles.tableHeader}>
                                <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Mes</Text>
                                <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Costos</Text>
                            </View>
                            {statistics.costData.slice(-6).map((item, index) => (
                                <View key={index} style={styles.tableRow}>
                                    <Text style={[styles.tableCell, { flex: 2 }]}>{item.month}</Text>
                                    <Text style={[styles.tableCell, { flex: 1 }]}>
                                        Bs. {item.cost.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
 ) : (
	<View style={styles.section}>
		<Text style={styles.sectionTitle}>Costos por Mes (Últimos 6 meses)</Text>
		<View style={styles.table}>
			<View style={styles.tableRow}>
				<Text style={[styles.tableCell, { flex: 1 }]}>No hay datos de costos por mes.</Text>
			</View>
		</View>
	</View>
)}

                {netBalance < 0 && (
                    <View style={styles.warning}>
                        <Text style={styles.warningText}>
                            Nota: El balance neto es negativo. Se recomienda revisar los costos.
                        </Text>
                    </View>
                )}

                <View style={styles.footer}>
                    <Text>Página 1 de 2 | Generado el {currentDate} | Sistema de Gestión de Finanzas</Text>
                </View>
            </Page>

            {/* Segunda Página - Tablas Detalladas */}
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.title}>TRANSACCIONES Y CUENTAS</Text>
                </View>

                {/* Cuentas con Balance */}
{accounts.length > 0 ? (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Cuentas y Balances</Text>
                        <View style={styles.table}>
                            <View style={styles.tableHeader}>
                                <Text style={[styles.tableHeaderCell, { flex: 0.5 }]}>#</Text>
                                <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Cuenta</Text>
                                <Text style={[styles.tableHeaderCell, { flex: 1.5 }]}>Descripción</Text>
                                <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Balance</Text>
                            </View>
                            {accounts.map((account, index) => (
                                <View key={account.id} style={styles.tableRow}>
                                    <Text style={[styles.tableCell, { flex: 0.5 }]}>{index + 1}</Text>
                                    <Text style={[styles.tableCell, { flex: 2 }]}>{account.name}</Text>
                                    <Text style={[styles.tableCell, { flex: 1.5 }]}>{account.description || 'N/A'}</Text>
                                    <Text style={[styles.tableCell, { flex: 1, color: (account.balance || 0) >= 0 ? '#2a2a2a' : '#4a4a4a' }]}>
                                        Bs. {(account.balance || 0).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
 ) : (
	<View style={styles.section}>
		<Text style={styles.sectionTitle}>Cuentas y Balances</Text>
		<View style={styles.table}>
			<View style={styles.tableRow}>
				<Text style={[styles.tableCell, { flex: 1 }]}>No hay cuentas registradas.</Text>
			</View>
		</View>
	</View>
)}

                {/* Últimas Transacciones */}
{recentTransactions.length > 0 ? (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Últimas 10 Transacciones</Text>
                        <View style={styles.table}>
                            <View style={styles.tableHeader}>
                                <Text style={[styles.tableHeaderCell, { flex: 0.8 }]}>Fecha</Text>
                                <Text style={[styles.tableHeaderCell, { flex: 1.2 }]}>Monto</Text>
                                <Text style={[styles.tableHeaderCell, { flex: 1.5 }]}>Descripción</Text>
                                <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Cuenta</Text>
                                <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Método</Text>
                            </View>
                            {recentTransactions.map((transaction) => {
                                const isIncome = transaction.amount >= 0;
                                return (
                                    <View key={transaction.id} style={styles.tableRow}>
                                        <Text style={[styles.tableCell, { flex: 0.8 }]}>
                                            {dayjs(transaction.date).format('DD/MM/YYYY')}
                                        </Text>
                                        <Text style={[styles.tableCell, { flex: 1.2, color: isIncome ? '#2a2a2a' : '#4a4a4a' }]}>
                                            {isIncome ? '+' : '-'}Bs. {Math.abs(transaction.amount).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </Text>
                                        <Text style={[styles.tableCell, { flex: 1.5 }]}>{transaction.description || 'N/A'}</Text>
                                        <Text style={[styles.tableCell, { flex: 1 }]}>{transaction.account || 'N/A'}</Text>
                                        <Text style={[styles.tableCell, { flex: 1 }]}>{transaction.method || 'N/A'}</Text>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
 ) : (
	<View style={styles.section}>
		<Text style={styles.sectionTitle}>Últimas 10 Transacciones</Text>
		<View style={styles.table}>
			<View style={styles.tableRow}>
				<Text style={[styles.tableCell, { flex: 1 }]}>No hay transacciones recientes.</Text>
			</View>
		</View>
	</View>
)}

                <View style={styles.footer}>
                    <Text>Página 2 de 2 | Generado el {currentDate} | Sistema de Gestión de Finanzas</Text>
                </View>
            </Page>
        </>
    );
};

// Create Document Component (standalone viewer)
const FinanceReportDocument = ({ 
    transactions, 
    accounts, 
    statistics 
}: { 
    transactions: TransactionData[], 
    accounts: AccountData[], 
    statistics: FinanceStatistics 
}) => (
    <Document>
        <FinanceReportPages transactions={transactions} accounts={accounts} statistics={statistics} />
    </Document>
);

export default function FinanceReportsPage() {
    const [transactions, setTransactions] = useState<TransactionData[]>([]);
    const [accounts, setAccounts] = useState<AccountData[]>([]);
    const [statistics, setStatistics] = useState<FinanceStatistics>({
        incomeData: [],
        costData: [],
        dollarData: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                
                // Fetch all data in parallel
                const [transactionsRes, accountsRes, statsRes] = await Promise.all([
                    fetch('/api/finance'),
                    fetch('/api/finance/account/balance'),
                    fetch('/api/finance/statistics')
                ]);

                if (!transactionsRes.ok) {
                    throw new Error('Error al cargar las transacciones');
                }
                if (!accountsRes.ok) {
                    throw new Error('Error al cargar las cuentas');
                }
                if (!statsRes.ok) {
                    throw new Error('Error al cargar las estadísticas');
                }

                const transactionsData = await transactionsRes.json();
                const accountsData = await accountsRes.json();
                const statsData = await statsRes.json();

                setTransactions(transactionsData);
                setAccounts(accountsData);
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
                <FinanceReportDocument 
                    transactions={transactions} 
                    accounts={accounts} 
                    statistics={statistics} 
                />
            </PDFViewer>
        </Box>
    );
}
