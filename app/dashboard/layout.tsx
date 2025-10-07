import * as React from 'react';
import DashboardIndex from '@/components/Dashboard';

export default function DashboardLayoutServer({ children }: { children: React.ReactNode }) {
    return <DashboardIndex children={children}/>
}
