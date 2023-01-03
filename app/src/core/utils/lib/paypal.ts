import checkoutNodeJssdk from '@paypal/checkout-server-sdk'

const configureEnvironment = () => {

	return process.env.NODE_ENV === 'production'
		? new checkoutNodeJssdk.core.LiveEnvironment(process.env['PAYPAL_CLIENT_ID'], process.env['PAYPAL_CLIENT_SECRET'])
		: new checkoutNodeJssdk.core.SandboxEnvironment(process.env['SANDBOX_PAYPAL_CLIENT_ID'], process.env['SANDBOX_PAYPAL_CLIENT_SECRET'])
}

const paypal = () => {
	return new checkoutNodeJssdk.core.PayPalHttpClient(configureEnvironment())
}

export default paypal