import client from '@lib/paypal'
import strapi from '@lib/strapi'
import paypal from '@paypal/checkout-server-sdk'
import type { NextApiRequest, NextApiResponse } from 'next'

const paypalClient = client()

type Data = {
	status: string,
	orderID: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

	const { discountCode } = req.body

	if (discountCode && !(await isDiscountCodeValid(discountCode))) {
		// return res.status(400).send({
		// 	code: 'INVALID_DISCOUNT_CODE',
		// 	message: 'The discount code is invalid',
		// })
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

	const paypalResponse = await paypalClient.execute(paypalRequest)
	if (paypalResponse.statusCode !== 201) {
		res.status(500)
	}

	res.status(200).json({ status: 'success', orderID: paypalResponse.result.id })
}

const isDiscountCodeValid = async (discountCode: string) => {

	const res = await strapi.get('/discounts', {
		params: {
			filters: {
				active: { $eq: true }
			}
		}
	})

	console.log('[activeDiscountCodes]', res)

	return false
}

export default handler