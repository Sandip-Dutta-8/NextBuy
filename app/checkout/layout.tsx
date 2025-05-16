import { HelpCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function CheckoutLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className='p-4'>
            <header className='bg-card mb-4 border-b pb-2.5'>
                <div className='max-w-6xl mx-auto flex justify-between items-center'>
                    <Link href='/'>
                        <div className='h1-bold'>NextBuy</div>
                    </Link>
                    <div>
                        <h1 className='text-3xl'>Checkout</h1>
                    </div>
                    <div>
                        <Link href='/page/help'>
                            <HelpCircle className='w-6 h-6' />
                        </Link>
                    </div>
                </div>
            </header>
            {children}
        </div>
    )
}