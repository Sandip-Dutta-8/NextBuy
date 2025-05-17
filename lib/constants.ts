export const SENDER_NAME = process.env.SENDER_NAME || 'support'
export const SENDER_EMAIL = process.env.SENDER_EMAIL || 'onboarding@resend.dev'
export const SERVER_URL='https://next-buy-seven.vercel.app'

export const USER_ROLES = ['Admin', 'User']
export const COLORS = ['Gold', 'Green', 'Red']
export const THEMES = ['Light', 'Dark', 'System']

export const PAGE_SIZE = Number(9) 
export const FREE_SHIPPING_MIN_PRICE=Number(35)

export const AVAILABLE_PAYMENT_METHOD = [
    {
        name: "PayPal",
        commission: 0,
        isDefault: true
    },
    {
        name: "Stripe",
        commission: 0,
        isDefault: false
    },
    {
        name: "Cash on Delivery",
        commission: 0,
        isDefault: false
    },
]

export const DEFAULT_PAYEMENT_METHOD = 'PayPal'

export const AVAILABLE_DELIVERY_DATE = [
    {
        name: "Tomorrow",
        daysToDeliver: 1,
        shippingPrice: 12.9,
        freeShippingMinPrice: 0,
    },
    {
        name: "Next 3 days",
        daysToDeliver: 3,
        shippingPrice: 6.9,
        freeShippingMinPrice: 0,
    },
    {
        name: "Next 5 days",
        daysToDeliver: 5,
        shippingPrice: 4.9,
        freeShippingMinPrice: 35,
    }
]