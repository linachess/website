import { strapi } from '@utils/lib'
import type { InferGetServerSidePropsType, NextPage } from 'next'
import { useRouter } from 'next/router'

import { Flex, Text } from '@chakra-ui/react'
import { DefaultLayout } from '@components/layouts'

export const getServerSideProps = async () => {

	return {
		props: {
			version: await strapi.getCurrentVersion()
		}
	}
}

type BuySuccessProps = InferGetServerSidePropsType<typeof getServerSideProps>

const BuySuccessPage: NextPage<BuySuccessProps> = (props) => {

	const { query } = useRouter()

	return (<>

		<DefaultLayout
			title='Buy Success'
			version={props.version}
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