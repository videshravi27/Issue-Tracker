'use client';

import { Skeleton } from "@/app/components";
import Link from 'next/link'
import React from 'react'
import { IoBugSharp } from "react-icons/io5";
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';

const Navbar = () => {
    return (
        <nav className='border-b mb-5 px-1 py-3'>
            <Container>
                <Flex justify="between">
                    <Flex align="center" gap="3">
                        <Link href="/" className='hover:px-1'><IoBugSharp /></Link>
                        <NavLinks />
                    </Flex>
                    <AuthStatus />
                </Flex>
            </Container>
        </nav>
    )
}

const NavLinks = () => {
    const currentpath = usePathname()

    return (
        <ul className='flex gap-5'>
            <li><Link href="/" className={`${currentpath === '/' ? 'font-extrabold' : 'font-normal'}  hover:bg-violet-300 hover:py-1 hover:rounded-md hover:px-1 transition-colors`}>Dashboard</Link></li>
            <li><Link href="/issues" className={`${currentpath === '/issues' ? 'font-extrabold' : 'font-normal'} hover:bg-violet-300 hover:py-1 hover:rounded-md hover:px-1 transition-colors`}>Issues</Link></li>
        </ul>
    );

}

const AuthStatus = () => {
    const { status, data: session } = useSession()

    if (status === 'loading') return <Skeleton width="3rem" />

    if (status === 'unauthenticated')
        return <Link href="/api/auth/signin" className='font-extrabold'>Login</Link>

    return(
    <Box>
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Avatar
                    src={session!.user!.image!}
                    fallback="?"
                    size="2"
                    radius='full'
                    className='cursor-pointer'
                    referrerPolicy='no-referrer'
                />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                <DropdownMenu.Label>
                    <Text size="2">{session!.user!.email}</Text>
                </DropdownMenu.Label>
                <DropdownMenu.Item>
                    <Link href="/api/auth/signout">Logout</Link>
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    </Box>
)}

export default Navbar