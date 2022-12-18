import paypalSDK from '@paypal/checkout-server-sdk'
import { publicProcedure, router } from '@server/trpc'
import { TRPCError } from '@trpc/server'
import { generateHash, generateLicenseKey } from '@utils/functions'
import { strapi } from '@utils/lib'
import paypal from '@utils/lib/paypal'
import { z } from 'zod'

const paypalClient = paypal()

export const paypalRouter = router({

    createOrder: publicProcedure
        .input(
            z.object({
                discountCode: z.string().optional(),
            })
        )
        .mutation(async ({ input }) => {
            
            const price = await strapi.getPrice(input.discountCode).catch(() => {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'The discount code is invalid',
                    cause: 'INVALID_DISCOUNT_CODE',
                })
            })

            const paypalRequest = new paypalSDK.orders.OrdersCreateRequest()
            paypalRequest.headers['Prefer'] = 'return=representation'
            paypalRequest.requestBody({
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        amount: {
                            currency_code: 'EUR',
                            value: price.toFixed(2),
                        },
                    },
                ],
            })

            const paypalResponse = await paypalClient.execute(paypalRequest) as CreateOrderResponse
            if (paypalResponse.statusCode !== 201) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Something went wrong',
                    cause: 'PAYPAL_ERROR',
                })
            }

            return { 
                status: 'success', 
                orderID: paypalResponse.result.id
            }
        }),

    captureOrder: publicProcedure
        .input(
            z.object({
                orderID: z.string(),
                payer: z.object({
                    firstName: z.string().min(1),
                    lastName: z.string().min(1),
                    email: z.string().email(),
                }),
                discountCode: z.string().optional(),
            })
        )
        .mutation(async ({ input }) => {
            
            const paypalRequest = new paypalSDK.orders.OrdersCaptureRequest(input.orderID)
            // @ts-ignore
            paypalRequest.requestBody({})
        
            const paypalResponse = await paypalClient.execute(paypalRequest)
            if (!paypalResponse || !paypalResponse.result) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Something went wrong',
                    cause: 'PAYPAL_ERROR',
                })
            }

            // get the discount 
            let discountId: number | null = null
            if (input.discountCode) {

                const discountData = await strapi.findOne('discounts', {
                    filter: { code: { $eq: input.discountCode } }
                })
                discountId = discountData.id!

                // update the count of the discount
                await strapi.update('discounts', discountData.id!, {
                    count: discountData.count + 1,
                    active: discountData.type === 'oneTime' && discountData.count + 1 >= 1 ? false : true
                })

            }

            // create the license
            const { currentVersion, currentPrice } = await strapi.findOne('buy')

            const licenseData = await strapi.create('licenses', {
                key: generateLicenseKey(),
                downloadHash: generateHash(),
                version: currentVersion!.id
            })

            // create the invoice
            await strapi.create('invoices', {
                firstName: input.payer.firstName,
                lastName: input.payer.lastName,
                email: input.payer.email,
                paypalEmail: paypalResponse.result.payer.email_address,
                paypalTransactionId: paypalResponse.result.id,
                date: new Date(),
                buyPrice: paypalResponse.result.purchase_units[0].payments.captures[0].amount.value,
                originalPrice: currentPrice,
                discount: discountId,
                license: licenseData.id,
                versionBought: currentVersion?.version
            })
            
            return { 
                ...paypalResponse.result 
            }
        })
})