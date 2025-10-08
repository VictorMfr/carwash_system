import { useState, useEffect } from "react";
import api from "@/lib/axios";

interface PaymentRecord {
    id: number;
    date: string;
    vehicle: string;
    client: string;
    status: 'pending' | 'complete';
    created_at: string;
    updated_at: string;
}

export default function usePaymentsCardController() {
    const [payments, setPayments] = useState<PaymentRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("");
    const [order, setOrder] = useState<'asc' | 'desc'>('desc');
    const [orderBy, setOrderBy] = useState<'date' | 'vehicle' | 'client' | 'status'>('date');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [statusDialogOpen, setStatusDialogOpen] = useState(false);
    const [statusDialogRecord, setStatusDialogRecord] = useState<PaymentRecord | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<'pending' | 'complete' | null>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/api/service/payments`);
                setPayments(response.data);
            } catch (error) {
                console.error(error);
                setPayments([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleRequestSort = (property: 'date' | 'vehicle' | 'client' | 'status') => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
        setPage(0);
    };

    const getComparableValue = (rec: PaymentRecord) => {
        switch (orderBy) {
            case 'date':
                return new Date(rec.date).getTime();
            case 'vehicle':
                return rec.vehicle ?? '';
            case 'client':
                return rec.client ?? '';
            case 'status':
                return rec.status ?? '';
            default:
                return '';
        }
    };

    const filtered = payments.filter((rec) => {
        const q = filter.trim().toLowerCase();
        if (!q) return true;
        return (
            rec.vehicle.toLowerCase().includes(q) ||
            rec.client.toLowerCase().includes(q) ||
            rec.status.toLowerCase().includes(q)
        );
    });

    const sorted = [...filtered].sort((a, b) => {
        const va = getComparableValue(a);
        const vb = getComparableValue(b);
        if (va < vb) return order === 'asc' ? -1 : 1;
        if (va > vb) return order === 'asc' ? 1 : -1;
        return 0;
    });

    const rowCount = sorted.length;
    const visibleRows = sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const onModifyStatus = (record: PaymentRecord) => {
        setStatusDialogRecord(record);
        setSelectedStatus(record.status);
        setStatusDialogOpen(true);
    };

    const closeStatusDialog = () => {
        setStatusDialogOpen(false);
        setStatusDialogRecord(null);
        setSelectedStatus(null);
    };

    const submitStatusChange = async () => {
        if (!statusDialogRecord || !selectedStatus) return;
        try {
            setSaving(true);
            
            // Update payment status
            await api.put(`/api/service/payments/${statusDialogRecord.id}`, {
                status: selectedStatus
            });

            // Optimistic UI update
            setPayments(prev => prev.map(rec => 
                rec.id === statusDialogRecord.id
                    ? { ...rec, status: selectedStatus }
                    : rec
            ));
            
            closeStatusDialog();
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return {
        // data
        payments,
        loading,
        visibleRows,
        rowCount,
        // sorting
        order,
        orderBy,
        handleRequestSort,
        // pagination
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage,
        // filter
        filter,
        handleFilterChange,
        // actions
        onModifyStatus,
        // status change dialog
        statusDialogOpen,
        statusDialogRecord,
        selectedStatus,
        setSelectedStatus,
        closeStatusDialog,
        submitStatusChange,
        saving,
        formatDate,
    }
}
