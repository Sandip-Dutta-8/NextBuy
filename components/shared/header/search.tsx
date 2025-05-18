import { SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../ui/select'
import { getAllCategories } from '@/lib/actions/product.actions'


export default async function Search() {
    
    const categories = await getAllCategories()

    return (
        <form action='/search' method='GET' className='flex items-stretch h-10'>
            <Select name='category'>
                <SelectTrigger className='w-auto min-h-full dark:border-gray-200 bg-gray-100 text-black border-r  rounded-r-none rounded-l-md rtl:rounded-r-md rtl:rounded-l-none'>
                    <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent position='popper'>
                    <SelectItem value='all'>All</SelectItem>
                    {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                            {category}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Input
                className='flex-1 rounded-none dark:border-gray-200 bg-gray-100 text-black text-base h-full focus-visible:ring-0'
                placeholder="search..."
                name='q'
                type='search'
            />
            <button
                type='submit'
                className='bg-primary text-primary-foreground rounded-s-none rounded-e-md px-3 py-2 cursor-pointer h-full'
            >
                <SearchIcon className='w-6 h-6' />
            </button>
        </form>
    )
}