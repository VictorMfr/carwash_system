import { useState, useEffect, useMemo } from 'react';
import api from '@/lib/axios';

interface AccountWithBalance {
    id: number;
    name: string;
    description: string;
    balance: number;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
}

export default function useAccountsCardController() {
    const [accounts, setAccounts] = useState<AccountWithBalance[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [orderBy, setOrderBy] = useState<keyof AccountWithBalance>('name');
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');

    const fetchAccounts = async () => {
        try {
            setLoading(true);
            const response = await api.get('/api/finance/account/balance');
            setAccounts(response.data);
        } catch (error) {
            console.error('Error fetching accounts:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAccounts();
    }, []);

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
        setPage(0);
    };

    const handleRequestSort = (property: keyof AccountWithBalance) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredAccounts = useMemo(() => {
        return accounts.filter(account => 
            account.name.toLowerCase().includes(filter.toLowerCase()) ||
            account.description.toLowerCase().includes(filter.toLowerCase())
        );
    }, [accounts, filter]);

    const sortedAccounts = useMemo(() => {
        return [...filteredAccounts].sort((a, b) => {
            let aValue = a[orderBy] ?? '';
            let bValue = b[orderBy] ?? '';

            if (typeof aValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = (bValue as string).toLowerCase();
            }

            if (aValue < bValue) {
                return order === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return order === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }, [filteredAccounts, orderBy, order]);

    const visibleRows = useMemo(() => {
        const start = page * rowsPerPage;
        return sortedAccounts.slice(start, start + rowsPerPage);
    }, [sortedAccounts, page, rowsPerPage]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return {
        accounts,
        loading,
        filter,
        page,
        rowsPerPage,
        orderBy,
        order,
        visibleRows,
        rowCount: filteredAccounts.length,
        handleFilterChange,
        handleRequestSort,
        handleChangePage,
        handleChangeRowsPerPage,
        formatCurrency,
        fetchAccounts
    };
}
