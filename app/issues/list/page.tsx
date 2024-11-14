import StatusBadge from '@/app/components/StatusBadge'
import Link from '@/app/components/Link';
import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import IssueAction from './IssueAction';
import { Status } from '@prisma/client';

interface Props{
  searchParams : {status : Status}
}

const Issues = async ({searchParams} : Props) => {
 const statuses = Object.values(Status)
 const status  = statuses.includes(searchParams.status) ? searchParams.status:undefined;
 const issues = await prisma.issue.findMany({
  where:{
    status
  }
 });

  return (
   <div className='max-w-7xl'>  
   <IssueAction />
   <Table.Root variant='surface' >
    <Table.Header>
      <Table.Row>
        <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {issues.map(issue=>(
        <Table.Row key={issue.id}>
         <Table.Cell>
          <Link href={`/issues/${issue.id}`} >
            {issue.title}
          </Link>
            <div className='block md:hidden'><StatusBadge status={issue.status} /></div>
            </Table.Cell>
        
          <Table.Cell className='hidden md:table-cell'><StatusBadge status={issue.status} /></Table.Cell>
          <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
   </Table.Root>
  
   </div>
  )
}
export const dynamic = 'force-dynamic';
export default Issues