import Link from 'next/link'
import React from 'react'
import { IoBugSharp } from "react-icons/io5";

const Navbar = () => {
    return (
        <nav className='flex gap-5 border-b mb-5 px-1 h-10 items-center'>
            <Link href="/" className='hover:px-1'><IoBugSharp /></Link>
            <ul className='flex gap-5'>
                <li><Link href="/" className='hover:bg-violet-300 hover:py-1 hover:rounded-md hover:px-1 transition-colors'>Dashboard</Link></li>
                <li><Link href="/issues" className='hover:bg-violet-300 hover:py-1 hover:rounded-md hover:px-1 transition-colors'>Issues</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar
