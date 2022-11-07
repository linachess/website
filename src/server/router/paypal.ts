import paypalSDK from '@paypal/checkout-server-sdk'
import { publicProcedure, router } from '@server/trpc'
import { TRPCError } from '@trpc/server'
import { paypal, strapi } from '@utils/lib'
import { z } from 'zod'

const paypalClient = paypal()

export const paypalRouter = router({

    createOrder: publicProcedure
        .input(
            z.object({
                discountCode: z.string(),
            }).optional()
        )
        .mutation(async ({ input }) => {
            
            const price = await strapi.getPrice().catch(() => {
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
            })
        )
        .mutation(async ({ input }) => {
            
            const paypalRequest = new paypalSDK.orders.OrdersCaptureRequest(input.orderID)
            // @ts-ignore
            paypalRequest.requestBody({})
        
            const paypalResponse = await paypalClient.execute(paypalRequest)
            if (!paypalResponse) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Something went wrong',
                    cause: 'PAYPAL_ERROR',
                })
            }

            console.log('payment successful')
                
            return { 
                ...paypalResponse.result 
            }
        })
})