import client from '@lib/paypal'
import strapi from '@lib/strapi'
import paypal from '@paypal/checkout-server-sdk'
import { publicProcedure, router } from '@server/trpc'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

const paypalClient = client()

export const paypalRouter = router({

    createOrder: publicProcedure
        .input(
            z.object({
                discountCode: z.string(),
            }).optional()
        )
        .mutation(async ({ input }) => {
            

            if (input?.discountCode && !(await isDiscountCodeValid(input.discountCode))) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'The discount code is invalid',
                    cause: 'INVALID_DISCOUNT_CODE',
                })
            }

            const paypalRequest = new paypal.orders.OrdersCreateRequest()
            paypalRequest.headers['Prefer'] = 'return=representation'
            paypalRequest.requestBody({
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        amount: {
                            currency_code: 'USD',
                            value: '100.00',
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
            
            const paypalRequest = new paypal.orders.OrdersCaptureRequest(input.orderID)
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
                
            return { 
                ...paypalResponse.result 
            }
        })
})

const isDiscountCodeValid = async (discountCode: string) => {

	const data = await strapi.find('discounts', {
		params: {
			filters: {
				active: { $eq: true }
			}
		}
	})

    return data.find((discount: any) => discount.code === discountCode)
}