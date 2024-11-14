'use client';

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import React from 'react';

const statuses: { label: string, value?: Status }[] = [
    { label: 'All' },
    { label: 'Open', value: 'OPEN' },
    { label: 'Closed', value: 'CLOSED' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
];

const IssueStatusFilter = () => {
    return (
        <Select.Root>
            <Select.Trigger aria-label="Filter by status" placeholder="Filter by status..." />
            <Select.Content>
                {statuses.map(status => (
                    <Select.Item
                        key={status.label}
                        value={status.value || 'null'}
                    >
                        {status.label}
                    </Select.Item>
                ))}
            </Select.Content>
        </Select.Root>
    );
};

export default IssueStatusFilter;