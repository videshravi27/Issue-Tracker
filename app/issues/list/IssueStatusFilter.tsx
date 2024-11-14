'use client';

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import React from 'react';
import { useRouter } from 'next/navigation';

const statuses: { label: string, value: Status | 'all' }[] = [
    { label: 'All', value: 'all' },
    { label: 'Open', value: 'OPEN' },
    { label: 'Closed', value: 'CLOSED' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
];

const IssueStatusFilter = () => {
    const router = useRouter();

    return (
        <Select.Root onValueChange={(status) => {
            const query = status === 'all' ?  '' : `?status=${status}`;
            router.push('/issues/list' + query)
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