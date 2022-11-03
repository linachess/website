import client from '@lib/paypal'
import paypal from '@paypal/checkout-server-sdk'
import type { NextApiRequest, NextApiResponse } from 'next'

const paypalClient = client()

type Data = any

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

	const { orderID } = req.body

	const paypalRequest = new paypal.orders.OrdersCaptureRequest(orderID)
	// @ts-ignore
	paypalRequest.requestBody({})

	const paypalResponse = await paypalClient.execute(paypalRequest)
	if (!paypalResponse) {
		res.status(500)
	}

	console.log('[paypalResponse]', paypalResponse.result)

	res.status(200).json({ ...paypalResponse.result })
}

export default handler