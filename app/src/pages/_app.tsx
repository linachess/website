import '@fontsource/open-sans/700.css'
import '@fontsource/poppins/900.css'
import '@fontsource/raleway/400.css'

import { ChakraProvider, ScaleFade } from '@chakra-ui/react'
import { theme } from '@core/theme'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { trpc } from '@utils/lib'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps, router }: AppProps) {
	
  	return (
		<ChakraProvider theme={theme}>
			<QueryClientProvider client={queryClient}>				
				<PayPalScriptProvider options={{
					'client-id': process.env['NEXT_PUBLIC_PAYPAL_CLIENT_ID'],
					currency: 'EUR'
				}}>
					<ScaleFade
						key={router.route}
						initialScale={0.9}
						in={true}
					>
						<Component {...pageProps} />
					</ScaleFade>
				</PayPalScriptProvider>
			</QueryClientProvider>
		</ChakraProvider>
	)
}

export default trpc.withTRPC(MyApp)
