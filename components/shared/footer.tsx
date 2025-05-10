'use client'

import { ChevronUp } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className='bg-black text-white underline-link'>
            <div className='w-full'>
                <Button
                    variant='ghost'
                    className='bg-gray-800 w-full rounded-none hover:bg-gray-700 transition-colors cursor-pointer'
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <ChevronUp className='mr-2 h-4 w-4' />
                    Back to top
                </Button>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 p-8 max-w-7xl mx-auto'>
                    <div>
                        <h3 className='font-bold mb-4 text-lg'>Get to Know Us</h3>
                        <ul className='space-y-3'>
                            <li>
                                <Link href='/page/careers' className='hover:text-gray-300 transition-colors'>
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href='/page/blog' className='hover:text-gray-300 transition-colors'>
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href='/page/about-us' className='hover:text-gray-300 transition-colors'>
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className='font-bold mb-4 text-lg'>Make Money with Us</h3>
                        <ul className='space-y-3'>
                            <li>
                                <Link href='/page/sell' className='hover:text-gray-300 transition-colors'>
                                    Sell products on NextBuy
                                </Link>
                            </li>
                            <li>
                                <Link href='/page/become-affiliate' className='hover:text-gray-300 transition-colors'>
                                    Become an Affiliate
                                </Link>
                            </li>
                            <li>
                                <Link href='/page/advertise' className='hover:text-gray-300 transition-colors'>
                                    Advertise Your Products
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className='font-bold mb-4 text-lg'>Let Us Help You</h3>
                        <ul className='space-y-3'>
                            <li>
                                <Link href='/page/shipping' className='hover:text-gray-300 transition-colors'>
                                    Shipping Rates & Policies
                                </Link>
                            </li>
                            <li>
                                <Link href='/page/returns-policy' className='hover:text-gray-300 transition-colors'>
                                    Returns & Replacements
                                </Link>
                            </li>
                            <li>
                                <Link href='/page/help' className='hover:text-gray-300 transition-colors'>
                                    Help
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='border-t border-gray-800 py-6 px-4'>
                <div className='flex justify-center gap-6 text-sm mb-4'>
                    <Link href='/page/conditions-of-use' className='hover:text-gray-300 transition-colors'>
                        Conditions of Use
                    </Link>
                    <Link href='/page/privacy-policy' className='hover:text-gray-300 transition-colors'>
                        Privacy Notice
                    </Link>
                    <Link href='/page/help' className='hover:text-gray-300 transition-colors'>
                        Help
                    </Link>
                </div>
                <div className='flex justify-center text-sm'>
                    <p>© {currentYear} NextBuy. All rights reserved.</p>
                </div>
                <div className='mt-6 flex justify-center text-sm text-gray-400'>
                    Berhampore, West Bengal | +123456789
                </div>
            </div>
        </footer>
    )
}