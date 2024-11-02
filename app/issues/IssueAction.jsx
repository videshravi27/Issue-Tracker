import React from 'react'
import { Button } from '@radix-ui/themes';
import Link from 'next/link';


const IssueAction = () => {
    return (
        <div className='mb-5'>
            <Link href='/issues/newissue'>
                <Button>
                    New Issue
                </Button>
            </Link>
        </div>
    )
}

export default IssueAction
