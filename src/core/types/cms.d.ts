namespace CMS {

    // UTILS

    type GenericProps<T> = T & { 
        id?: number
        createdAt?: string
        updatedAt?: string
    }

    type Correspondance = {

        'discounts': Discount
        'invoices': Invoice
        'licenses': License
        'versions': Version

        'buy': Buy
        'homepage': Homepage
        'config': Config
    }

    // COLLECTION TYPES

    type Discount = GenericProps<{
        code: string
        percentage: number
        type: 'infinite' | 'oneTime' = 'infinite'
        active: boolean = true
        count: number = 0
    }>

    type Invoice = GenericProps<{
        
        firstName: string
        lastName: string
        email: string
        buyPrice: number
        originalPrice: number
        date: string

        paypalEmail?: string
        paypalTransactionId?: string

        file?: any
        license?: License
        discount?: Discount
    }>

    type License = GenericProps<{

        key: string
        downloadHash: string
        
        version?: Version
        invoice?: Invoice
    }>

    type Version = GenericProps<{
        version: string
        binary: any
    }>

    // SINGLE TYPES

    type Buy = {
        
        currentPrice: number
        buyable: boolean

        currentVersion?: Version
        currentDiscount?: Discount
    }

    type Homepage = {
        catchPhrase: string
        presentation: string
    }

    type Config = {
        downloadExpirationTime: number
    }
}