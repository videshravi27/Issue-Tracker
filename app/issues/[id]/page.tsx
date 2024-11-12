import StatusBadge from '@/app/components/StatusBadge'
import prisma from '@/prisma/client'
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { Pencil2Icon } from '@radix-ui/react-icons'
import Link from 'next/link'
import EditButton from './EditButton'
import DeleteIssueButton from './DeleteIssueButton'
import DetailsPage from './DetailsPage'
import { getServerSession } from 'next-auth'
import AuthOptions from '@/app/auth/AuthOptions'
import AssingneeSelect from './AssingneeSelect'

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
    const session = await getServerSession(AuthOptions)
    if (typeof params.id !== 'string') notFound();

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if (!issue)
        notFound();

    return (
        <Grid columns={{ initial: "1", sm: "5" }} gap='5'>
            <Box className='md:col-span-4'>
                <DetailsPage issue={issue} />
            </Box>
            {session && (
                <Box>
                    <Flex direction="column" gap="4">
                        <AssingneeSelect />
                        <EditButton issueId={issue.id} />
                        <DeleteIssueButton issueId={issue.id} />
                    </Flex>
                </Box>
            )}
        </Grid>
    )
}

export default IssueDetailPage