import { useState, useEffect } from "react";
import api from "@/lib/axios";

interface MaintenanceRecord {
    StockDetails: {
        id: number;
        quantity: number;
        price: number;
        entry_date: string;
        picture: string | null;
    };
    Stock: {
        id: number;
    };
    Product: {
        id: number;
        name: string;
        description: string;
        isTool: boolean;
    };
    Brand: {
        id: number | null;
        name: string;
    };
    State: {
        id: number | null;
        name: string;
    };
}

export default function useMaintenanceCard() {
    const [maintenance, setMaintenance] = useState<MaintenanceRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("");
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<'product' | 'brand' | 'state' | 'date'>('product');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewSrc, setPreviewSrc] = useState<string | null>(null);

    const [stateDialogOpen, setStateDialogOpen] = useState(false);
    const [stateDialogRecord, setStateDialogRecord] = useState<MaintenanceRecord | null>(null);
    const [selectedState, setSelectedState] = useState<any>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/api/maintenance/tools`);
                setMaintenance(response.data);
            } catch (error) {
                console.error(error);
                setMaintenance([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleRequestSort = (property: 'product' | 'brand' | 'state' | 'date') => {
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

    const getComparableValue = (rec: MaintenanceRecord) => {
        switch (orderBy) {
            case 'product':
                return rec.Product.name ?? '';
            case 'brand':
                return rec.Brand.name ?? '';
            case 'state':
                return rec.State.name ?? '';
            case 'date':
                return rec.StockDetails.entry_date ?? '';
            default:
                return '';
        }
    };

    const filtered = maintenance.filter((rec) => {
        const q = filter.trim().toLowerCase();
        if (!q) return true;
        return (
            (rec.Product.name ?? '').toLowerCase().includes(q) ||
            (rec.Brand.name ?? '').toLowerCase().includes(q) ||
            (rec.State.name ?? '').toLowerCase().includes(q)
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

    const openPreview = (src: string | null) => {
        if (!src) return;
        setPreviewSrc(src);
        setPreviewOpen(true);
    };

    const closePreview = () => {
        setPreviewOpen(false);
        setPreviewSrc(null);
    };

    const onModifyState = (record: MaintenanceRecord) => {
        setStateDialogRecord(record);
        setSelectedState(null);
        setStateDialogOpen(true);
    };

    const closeStateDialog = () => {
        setStateDialogOpen(false);
        setStateDialogRecord(null);
        setSelectedState(null);
    };

    const submitStateChange = async () => {
        if (!stateDialogRecord || !selectedState?.id) return;
        try {
            setSaving(true);
            // Use existing PUT endpoint to update only state via multipart form
            const form = new FormData();
            form.append('quantity', String(stateDialogRecord.StockDetails.quantity));
            form.append('price', String(stateDialogRecord.StockDetails.price));
            form.append('entry_date', stateDialogRecord.StockDetails.entry_date);
            form.append('state_id', String(selectedState.id));

            await api.put(`/api/stock/${stateDialogRecord.Stock.id}/details/${stateDialogRecord.StockDetails.id}`, form, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            // Optimistic UI update: update local list immediately
            setMaintenance(prev => prev.map(rec => (
                rec.StockDetails.id === stateDialogRecord.StockDetails.id
                    ? { ...rec, State: { ...rec.State, id: selectedState.id, name: selectedState.name } }
                    : rec
            )));
            // Background refresh (non-blocking)
            api.get(`/api/maintenance/tools`).then(res => setMaintenance(res.data)).catch(() => {});
            closeStateDialog();
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    return {
        // data
        maintenance,
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
        // preview dialog
        previewOpen,
        previewSrc,
        openPreview,
        closePreview,
        // actions
        onModifyState,
        // state change dialog
        stateDialogOpen,
        stateDialogRecord,
        selectedState,
        setSelectedState,
        closeStateDialog,
        submitStateChange,
        saving,
    }
}