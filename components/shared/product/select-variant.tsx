import { Button } from '@/components/ui/button'
import { IProduct } from '@/lib/db/models/product.model'
import Link from 'next/link'

export default function SelectVariant({
    product,
    size,
    color,
}: {
    product: IProduct
    color: string
    size: string
}) {
    // Fix: Check if product.colors and product.sizes exist before trying to access them
    const selectedColor = color || (product.colors && product.colors.length > 0 ? product.colors[0] : '')
    const selectedSize = size || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : '')

    return (
        <>
            {/* Fix: Check if product.colors exists and has items */}
            {product.colors && product.colors.length > 0 && (
                <div className='space-x-2 space-y-2'>
                    <div>Color:</div>
                    {product.colors.map((x: string) => (
                        <Button
                            asChild
                            variant='outline'
                            className={
                                selectedColor === x ? 'border-2 border-primary' : 'border-2'
                            }
                            key={x}
                        >
                            <Link
                                replace
                                scroll={false}
                                href={`?${new URLSearchParams({
                                    color: x,
                                    size: selectedSize,
                                })}`}
                                key={x}
                            >
                                <div
                                    style={{ backgroundColor: x }}
                                    className='h-4 w-4 rounded-full border border-muted-foreground'
                                ></div>
                                {x}
                            </Link>
                        </Button>
                    ))}
                </div>
            )}
            {/* Fix: Check if product.sizes exists and has items */}
            {product.sizes && product.sizes.length > 0 && (
                <div className='mt-2 space-x-2 space-y-2'>
                    <div>Size:</div>
                    {product.sizes.map((x: string) => (
                        <Button
                            asChild
                            variant='outline'
                            className={
                                selectedSize === x ? 'border-2  border-primary' : 'border-2  '
                            }
                            key={x}
                        >
                            <Link
                                replace
                                scroll={false}
                                href={`?${new URLSearchParams({
                                    color: selectedColor,
                                    size: x,
                                })}`}
                            >
                                {x}
                            </Link>
                        </Button>
                    ))}
                </div>
            )}
        </>
    )
}