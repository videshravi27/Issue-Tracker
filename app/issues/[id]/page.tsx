import StatusBadge from '@/app/components/StatusBadge'
import prisma from '@/prisma/client'
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { Pencil2Icon } from '@radix-ui/react-icons'
import Link from 'next/link'

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
    if (typeof params.id !== 'string') notFound();

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if (!issue)
        notFound();

    return (
        <Grid columns={{ initial: "1", md: "2"}} gap='5'>
            <Box>
                <Heading>{issue.title}</Heading>
                <Flex className='space-x-3' my="2">
                    <StatusBadge status={issue.status} />
                    <Text>{issue.createdAt.toDateString()}</Text>
                </Flex>
                <Card className='prose' mt="4">
                    <ReactMarkdown>{issue.description}</ReactMarkdown>
                </Card>
            </Box>
            <Box>
                <Button>
                    <Link href={`/issues/${issue.id}/edit`}><Pencil2Icon /></Link>
                    <Link href={`/issues/${issue.id}/edit`}>Edit</Link>
                </Button>
            </Box>
        </Grid>
    )
}

export default IssueDetailPage