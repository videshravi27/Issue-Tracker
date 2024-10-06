'use client';

import Link from 'next/link'
import React from 'react'
import { IoBugSharp } from "react-icons/io5";
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const currentpath = usePathname()

    return (
        <nav className='flex gap-5 border-b mb-5 px-1 h-10 items-center'>
            <Link href="/" className='hover:px-1'><IoBugSharp /></Link>
            <ul className='flex gap-5'>
                <li><Link href="/" className={`${currentpath === '/' ? 'font-extrabold' : 'font-normal'}  hover:bg-violet-300 hover:py-1 hover:rounded-md hover:px-1 transition-colors`}>Dashboard</Link></li>
                <li><Link href="/issues" className={`${currentpath === '/issues' ? 'font-extrabold' : 'font-normal'} hover:bg-violet-300 hover:py-1 hover:rounded-md hover:px-1 transition-colors`}>Issues</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar