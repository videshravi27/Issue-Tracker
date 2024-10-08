'use client';
import React from 'react'
import { Button } from '@radix-ui/themes'
import Link from 'next/link';

const IssuesPage = () => {
    return (
        <>
            <div>
                IssuesPage
            </div>
            <Button><Link href='/issues/newissue'>New Issue</Link></Button>
        </>
    )
}

export default IssuesPage
