import client from '@lib/paypal'
import paypal from '@paypal/checkout-server-sdk'
import type { NextApiRequest, NextApiResponse } from 'next'

const paypalClient = client()

type Data = {
	status: string,
	orderID: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

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

export default handler