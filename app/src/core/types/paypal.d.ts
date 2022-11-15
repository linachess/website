type OnApproveData = {
    billingToken?: string | null
    facilitatorAccessToken: string
    orderID: string
    payerID?: string | null
    paymentID?: string | null
    subscriptionID?: string | null
    authCode?: string | null
}

type CreateOrderResponse = {
    headers: any
    statusCode: number

    result: {
        create_time: string
        id: string
        links: {
            href: string
            method: string
            rel: string
        }[]
        intent: string
        purchase_units: {
            amount: {
                currency_code: string
                value: string
            }
            payee: {
                email_address: string
                merchant_id: string
            }
            reference_id: string
        }[]
        status: string
    }
}