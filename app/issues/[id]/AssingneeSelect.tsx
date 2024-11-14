'use client';

import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { Skeleton } from '@/app/components'
import toast, { Toaster } from 'react-hot-toast';

const AssingneeSelect = ({ issue }: { issue: Issue }) => {
    const { data: users, error, isLoading } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: () => axios.get('/api/users').then(res => res.data),
        staleTime: 60 * 1000, //60 s
        retry: 3,
    });

    if (isLoading) return <Skeleton />

    if (error) return null;

    const assignIssue = (userId: string) => {
        const assignedToUserId = userId === 'unassigned' ? null : userId;
        axios.patch('/api/issues/' + issue.id, { assignedToUserId }).catch(() => {
            toast.error("Error updating issue assignment")
        })
    }

    return (
        <>
            <Select.Root
                defaultValue={issue.assignedToUserId || ""}
                onValueChange={assignIssue}>
                <Select.Trigger placeholder='Assign...' />
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Suggestions</Select.Label>
                        <Select.Item value="unassigned">Unassigned</Select.Item>
                        {users?.map(user => <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>)}
                    </Select.Group>
                </Select.Content>
            </Select.Root>

            <Toaster />
        </>
    )
}

export default AssingneeSelect
