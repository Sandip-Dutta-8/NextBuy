'use server'

import { connectToDatabase } from '@/lib/db'
import Product, { IProduct } from '@/lib/db/models/product.model'


export async function getAllCategories() {
    await connectToDatabase()
    const categories = await Product.find({ isPublished: true }).distinct(
        'category'
    )
    return categories
}

export async function getProductsForCard({
    tag,
    limit = 4,
}: {
    tag: string
    limit?: number
}) {
    await connectToDatabase()
    const products = await Product.find(
        { tags: { $in: [tag] }, isPublished: true },
        {
            name: 1,
            href: { $concat: ['/product/', '$slug'] },
            image: { $arrayElemAt: ['$images', 0] },
        }
    )
        .sort({ createdAt: 'desc' })
        .limit(limit)
    return JSON.parse(JSON.stringify(products)) as {
        name: string
        href: string
        image: string
    }[]
}
// GET PRODUCTS BY TAG
export async function getProductsByTag({
    tag,
    limit = 10,
}: {
    tag: string
    limit?: number
}) {
    await connectToDatabase()
    const products = await Product.find({
        tags: { $in: [tag] },
        isPublished: true,
    })
        .sort({ createdAt: 'desc' })
        .limit(limit)
    return JSON.parse(JSON.stringify(products)) as IProduct[]
}

// GET ONE PRODUCT BY SLUG
export async function getProductBySlug(slug: string) {
    await connectToDatabase()
    const product = await Product.findOne({ slug, isPublished: true })
    if (!product) throw new Error('Product not found')
    return JSON.parse(JSON.stringify(product)) as IProduct
}

export async function getAllTags() {
    const tags = await Product.aggregate([
        { $unwind: '$tags' },
        { $group: { _id: null, uniqueTags: { $addToSet: '$tags' } } },
        { $project: { _id: 0, uniqueTags: 1 } },
    ])
    return (
        (tags[0]?.uniqueTags
            .sort((a: string, b: string) => a.localeCompare(b))
            .map((x: string) =>
                x
                    .split('-')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')
            ) as string[]) || []
    )
}