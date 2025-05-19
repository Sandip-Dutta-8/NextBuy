'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createProduct, updateProduct } from '@/lib/actions/product.actions'
import { IProduct } from '@/lib/db/models/product.model'
import { UploadButton } from '@/lib/uploadthing'
import { ProductInputSchema, ProductUpdateSchema } from '@/lib/validator'
import { Checkbox } from '@/components/ui/checkbox'
import { toSlug } from '@/lib/utils'
import { IProductInput } from '@/types'
import { toast } from 'sonner'
import { Trash } from 'lucide-react'

// Define types for upload response and error
interface UploadResponse {
    url: string
}

const productDefaultValues: IProductInput =
    process.env.NODE_ENV === 'development'
        ? {
            name: 'Sample Product',
            slug: 'sample-product',
            category: 'Sample Category',
            images: ['/images/p11-1.jpg'],
            brand: 'Sample Brand',
            description: 'This is a sample description of the product.',
            price: 99.99,
            listPrice: 0,
            countInStock: 15,
            numReviews: 0,
            avgRating: 0,
            numSales: 0,
            isPublished: false,
            tags: [],
            sizes: [],
            colors: [],
            ratingDistribution: [],
            reviews: [],
        }
        : {
            name: '',
            slug: '',
            category: '',
            images: [],
            brand: '',
            description: '',
            price: 0,
            listPrice: 0,
            countInStock: 0,
            numReviews: 0,
            avgRating: 0,
            numSales: 0,
            isPublished: false,
            tags: [],
            sizes: [],
            colors: [],
            ratingDistribution: [],
            reviews: [],
        }

interface ProductFormProps {
    type: 'Create' | 'Update'
    product?: IProduct
    productId?: string
}

const ProductForm = ({ type, product, productId }: ProductFormProps) => {
    const router = useRouter()

    // Change the type handling to be more explicit
    const form = useForm({
        resolver: zodResolver(type === 'Update' ? ProductUpdateSchema : ProductInputSchema),
        defaultValues: product && type === 'Update'
            ? { ...productDefaultValues, ...product }
            : productDefaultValues,
    })


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async function onSubmit(values: any) {
        try {
            if (type === 'Create') {
                const res = await createProduct(values as IProductInput)
                if (!res.success) {
                    toast.error(res.message || "Failed to create product")
                } else {
                    toast.success(res.message || "Product created successfully")
                    router.push(`/admin/products`)
                }
            }
            if (type === 'Update') {
                if (!productId) {
                    toast.error("Product ID is required for update")
                    router.push(`/admin/products`)
                    return
                }
                const res = await updateProduct({ ...values, _id: productId })
                if (!res.success) {
                    toast.error(res.message || "Failed to update product")
                } else {
                    toast.success(res.message || "Product updated successfully")
                    router.push(`/admin/products`)
                }
            }
        } catch (error) {
            console.error("Product submission error:", error)
            toast.error("An unexpected error occurred")
        }
    }

    const images = form.watch('images') || []

    console.log(form.formState.errors)

    return (
        <Form {...form}>
            <form
                method='post'
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-8'
            >
                <div className='flex flex-col gap-5 md:flex-row'>
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder='Enter product name' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='slug'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Slug</FormLabel>
                                <FormControl>
                                    <div className='relative'>
                                        <Input
                                            placeholder='Enter product slug'
                                            className='pl-8'
                                            {...field}
                                        />
                                        <button
                                            type='button'
                                            onClick={() => {
                                                form.setValue('slug', toSlug(form.getValues('name')))
                                            }}
                                            className='absolute right-2 top-2.5'
                                        >
                                            Generate
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className='flex flex-col gap-5 md:flex-row'>
                    <FormField
                        control={form.control}
                        name='category'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Input placeholder='Enter category' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='brand'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Brand</FormLabel>
                                <FormControl>
                                    <Input placeholder='Enter product brand' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className='flex flex-col gap-5 md:flex-row'>
                    <FormField
                        control={form.control}
                        name='listPrice'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>List Price</FormLabel>
                                <FormControl>
                                    <Input
                                        type='number'
                                        placeholder='Enter product list price'
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                                        value={field.value || ''}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='price'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Net Price</FormLabel>
                                <FormControl>
                                    <Input
                                        type='number'
                                        placeholder='Enter product price'
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                                        value={field.value || ''}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='countInStock'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Count In Stock</FormLabel>
                                <FormControl>
                                    <Input
                                        type='number'
                                        placeholder='Enter product count in stock'
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                                        value={field.value || ''}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className='flex flex-col gap-5 md:flex-row'>
                    <FormField
                        control={form.control}
                        name='images'
                        render={() => (
                            <FormItem className='w-full'>
                                <FormLabel>Images</FormLabel>
                                <Card>
                                    <CardContent className='space-y-2 mt-2 min-h-48'>
                                        <div className='flex flex-wrap justify-start items-center gap-2'>
                                            {images.map((image: string) => (
                                                <Card key={image} className='relative '>
                                                    <Image
                                                        src={image}
                                                        alt='product image'
                                                        className='w-36 h-36 object-cover object-center rounded-sm'
                                                        width={100}
                                                        height={100}
                                                    />
                                                    <Button
                                                        variant={'destructive'}
                                                        className='absolute top-1 right-1'
                                                        type='button'
                                                        size='icon'
                                                        onClick={() => {
                                                            form.setValue(
                                                                'images',
                                                                images.filter((img) => img !== image)
                                                            )
                                                        }}
                                                    >
                                                        <Trash />
                                                    </Button>
                                                </Card>
                                            ))}
                                            <FormControl>
                                                <UploadButton
                                                    endpoint='imageUploader'
                                                    onClientUploadComplete={(res: UploadResponse[]) => {
                                                        if (res && res.length > 0) {
                                                            const currentImages = form.getValues('images') || [];
                                                            form.setValue('images', [...currentImages, res[0].url]);
                                                        }
                                                    }}
                                                    onUploadError={(error: Error) => {
                                                        toast.error(`Upload error: ${error.message}`);
                                                    }}
                                                />
                                            </FormControl>
                                        </div>
                                    </CardContent>
                                </Card>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div>
                    <FormField
                        control={form.control}
                        name='description'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder='Enter product description'
                                        className='resize-none'
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    You can <span>@mention</span> other users and organizations to
                                    link to them.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div>
                    <FormField
                        control={form.control}
                        name='isPublished'
                        render={({ field }) => (
                            <FormItem className='flex items-center space-x-2'>
                                <FormControl>
                                    <Checkbox
                                        checked={field.value || false}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel>Is Published?</FormLabel>
                            </FormItem>
                        )}
                    />
                </div>

                <div>
                    <Button
                        type='submit'
                        size='lg'
                        disabled={form.formState.isSubmitting}
                        className='button col-span-2 w-full'
                    >
                        {form.formState.isSubmitting ? 'Submitting...' : `${type} Product `}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default ProductForm