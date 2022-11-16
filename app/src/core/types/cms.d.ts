namespace CMS {

    // UTILS

    type GenericProps<T> = T & { 
        id?: number
        createdAt?: string
        updatedAt?: string
    }

    type Component<T> = T & {
        id: string
        __component: string
    }

    type ImageFormatData = {
        name: string
        hash: string
        url: string
        ext: string
        mime: string
        width: number
        height: number
        size: number
        path: string | null
    }

    type ImageFormats = 'thumbnail' | 'small' | 'medium' | 'large'

    type Image = {
        name: string
        alternativeText: string
        caption: string
        width: number
        height: number
        hash: string
        ext: string
        mime: string
        size: number
        url: string
        previewUrl: string | null
        provider: string
        provider_metadata: string | null
        createdAt: string
        updatedAt: string
        formats: {
            [key in ImageFormats]?: ImageFormatData
        }
    }

    type Correspondance = {

        'discounts': Discount
        'invoices': Invoice
        'licenses': License
        'versions': Version

        'homepage': Homepage
        'buy': Buy
        'investor': Investor
        'overview': Overview
        'seller': Seller
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
    
    type Homepage = {
        catchPhrase: string
        presentation: string
        sections: Section[]
    }

    type Buy = {
        
        currentPrice: number
        buyable: boolean

        currentVersion?: Version
        currentDiscount?: Discount
    }

    type Investor = {
        title: string
        text: string
        image: Image
    }

    type Overview = {
        sections: Section[]
    }

    type Seller = {
        name: string
        address: string
        email: string
        country: string
        phone: string
    }
    
    type Config = {
        downloadExpirationTime: number
    }

    // COMPONENTS

    type Section = Component<{
        text: string
        title?: string
        image?: Image
        linkButton?: string
    }>
}