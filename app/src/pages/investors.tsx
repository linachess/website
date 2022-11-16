import { strapi } from '@utils/lib'
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'

import { Box, Button, Flex, Heading, Image, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react'
import { DefaultLayout } from '@components/layouts'

export const getStaticProps: GetStaticProps = async () => {
	
	const investorsData = await strapi.findOne('investor'),
		  sellerData = await strapi.findOne('seller')

	return {
		props: {
			...investorsData,
			contactEmail: sellerData.email
		}
	}
}

type InvestorsPageProps = InferGetStaticPropsType<typeof getStaticProps>

const InvestorsPage: NextPage<InvestorsPageProps> = (props) => {

	return (<>

		<DefaultLayout
			title='Investors'
		>

			<SimpleGrid
				columns={2}
				gap='20px'
				mt='3em'
			>

				<Flex justifyContent='start'>
					<Image 
						src={process.env['NEXT_PUBLIC_STRAPI_URL'] + props.image?.url} 
						alt={props.image?.alternativeText}
						width='80%'
					/>
				</Flex>

				<Flex alignItems='center'>

					<VStack spacing={10} alignItems='start'>
						
						<Heading as='h3'>{props.title}</Heading>

						<Text>{props.text}</Text>

						<Button
							as='a' href={`mailto:${props.contactEmail}`}
							variant='primary'
						>
							{props.contactEmail}
						</Button>

					</VStack>
				</Flex>

			</SimpleGrid>



		</DefaultLayout>		
	
	</>)
}

export default InvestorsPage