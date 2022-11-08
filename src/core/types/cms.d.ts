namespace CMS {

    // UTILS

    type WithId<T> = T & { id?: string }

    type Correspondance = {
        'buy': Buy
        'homepage': Homepage
        'discounts': Discount
        'invoices': Invoice
        'licenses': License
        'versions': Version
    }

    // COLLECTION TYPES

    type Discount = WithId<{
        code: string
        percentage: number
        type: 'infinite' | 'oneTime'
        active: boolean
        count: number
    }>

    type Invoice = WithId<{
        firstName: string
        lastName: string
        email: string
        paypalEmail: string
        paypalTransactionId: string
        date: Date
        buyPrice: number
        file?: string
        license?: License
        discount?: Discount
    }>

    type License = WithId<{
        license: string
        version: Version
        invoice: Invoice
    }>

    type Version = WithId<{
        version: string
        binary: string
    }>

    // SINGLE TYPES

    type Buy = {
        currentPrice: number
        buyable: boolean
        currentVersion: Version
        currentDiscount: Discount
    }

    type Homepage = {
        catchPhrase: string
        presentation: string
    }
}