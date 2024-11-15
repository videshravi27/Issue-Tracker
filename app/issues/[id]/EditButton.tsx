import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

const EditButton = ({ issueId }: { issueId: number }) => {
  return (
    <>
      <Button>
        <Link href={`/issues/${issueId}/edit`}><Pencil2Icon /></Link>
        <Link href={`/issues/${issueId}/edit`}>Edit</Link>
      </Button>
    </>
  )
}

export default EditButton
