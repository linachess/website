import checkoutNodeJssdk from '@paypal/checkout-server-sdk'

const configureEnvironment = () => {

	const clientId = process.env['PAYPAL_CLIENT_ID']
	const clientSecret = process.env['PAYPAL_CLIENT_SECRET']

	return process.env.NODE_ENV === 'production'
		? new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret)
		: new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret)
}

export const paypal = () => {
	return new checkoutNodeJssdk.core.PayPalHttpClient(configureEnvironment())
}