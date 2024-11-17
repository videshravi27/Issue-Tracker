'use client';

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const statuses: { label: string, value: Status | 'all' }[] = [
    { label: 'All', value: 'all' },
    { label: 'Open', value: 'OPEN' },
    { label: 'Closed', value: 'CLOSED' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
];

const IssueStatusFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams()

    return (
        <Select.Root
        defaultValue={searchParams.get('status') || 'all'}
            onValueChange={(status) => {
                const params = new URLSearchParams();
                if (status!=='all') 
                    params.append('status', status)

                if (searchParams.get('orderBy'))
                    params.append('orderBy', searchParams.get('orderBy')!)

                const query = params.toString() ? `?${params.toString()}` : '';
                router.push(`/issues/list${query}`);
            }}>
            <Select.Trigger aria-label="Filter by status" placeholder="Filter by status..." />
            <Select.Content>
                {statuses.map(status => (
                    <Select.Item
                        key={status.value}
                        value={status.value}
                    >
                        {status.label}
                    </Select.Item>
                ))}
            </Select.Content>
        </Select.Root>
    );
};

export default IssueStatusFilter;