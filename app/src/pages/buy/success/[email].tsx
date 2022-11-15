import type { NextPage } from 'next'

import { Box, Flex, Text } from '@chakra-ui/react'
import { DefaultLayout } from '@components/layouts'
import { useRouter } from 'next/router'

const BuySuccessPage: NextPage = () => {

	const { query } = useRouter()

	return (<>

		<DefaultLayout
			title='BuySuccess'
		>

			<Flex h='60vh' flexDir='column' justifyContent='center'>
				<Text fontSize='2em' textAlign='center' mb={10}>
					Purchase successful!	
				</Text>
				<Text fontSize='1.5em' textAlign='center'>
					You will receive an email shortly at <strong>{query.email}</strong> with your receipt and the installation instructions.
				</Text>
			</Flex>


		</DefaultLayout>		
	
	</>)
}

export default BuySuccessPage