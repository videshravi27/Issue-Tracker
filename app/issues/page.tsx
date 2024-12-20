import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import IssueAction from './list/IssueAction';
import { Link, StatusBadge } from '@/app/components'

export default async function IssuesPage() {
    const issues = await prisma.issue.findMany();

    return (
        <div>
            <IssueAction />

            <Table.Root variant='surface'>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Issues</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.map(issue => (
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                <Link href={`/issues/${issue.id}`}>
                                    {issue.title}
                                </Link>
                                <div className='block md:hidden'>
                                    <StatusBadge status={issue.status} />
                                </div>
                            </Table.Cell>
                            <Table.Cell className='hidden md:table-cell'>
                                <StatusBadge status={issue.status} />
                            </Table.Cell>
                            <Table.Cell className='hidden md:table-cell'>
                                {issue.createdAt.toDateString()}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>
    );
}

export const dynamic = 'force-dynamic';