import { getPromotedPrice } from '@utils/functions'
import { strapi } from '@utils/lib'
import type { InferGetStaticPropsType, NextPage } from 'next'

import { Box, Button, Flex, Heading, Image, Text, VStack } from '@chakra-ui/react'
import { DefaultLayout } from '@components/layouts'
import { Section } from '@components/shared'
import { Price } from '@components/shared'

export const getStaticProps = async () => {

	const homepageData = await strapi.findOne('homepage'),
		  buyData = await strapi.findOne('buy')

	return {
		props: {
			catchPhrase: homepageData.catchPhrase,
			description: homepageData.presentation,
			image: '/assets/chess_queen.svg',
			price: buyData.currentPrice,
			promotedPrice: getPromotedPrice(buyData.currentPrice, buyData.currentDiscount) || null,
			buyable: buyData.buyable,
			sections: homepageData.sections
		}
	}
}

type HomePageProps = InferGetStaticPropsType<typeof getStaticProps>

const HomePage: NextPage<HomePageProps> = (props) => {
	
	return (<>

		<DefaultLayout
			title='Home'
		>

			{/* Hero section */}

			<Flex mt='5rem' w='100%' justifyContent='space-between'>

				<VStack maxW='50%' spacing={10} justifyContent='center' alignItems='start'>

					<Heading as='h1'
						fontSize='4rem'
					>
						{props.catchPhrase}
					</Heading>

					<Text>{props.description}</Text>

					<Price 
						buyable={props.buyable}
						price={props.price}
						promotedPrice={props.promotedPrice}
					/>

					<Button 
						as='a' href='/buy'
						variant='primary'
					>
						Buy
					</Button>

				</VStack>

				<Flex justifyContent='end'>

					<Image 
						src={props.image}
						alt='Chess queen'
						width='35%'
						transform='rotate(-10deg)'
						filter='invert(32%) sepia(7%) saturate(1564%) hue-rotate(343deg) brightness(87%) contrast(84%)' // #5e4e42 -> https://codepen.io/sosuke/pen/Pjoqqp
					/>
				</Flex>
				
			</Flex>

			{/* Separator */}

			<Box 
				my='10rem'
				bgColor='text.primary' opacity='0.3'
				h='2px' w='50%'
				borderRadius='10px'
			/>

			{/* Investors section */}

			<VStack spacing={{ base: '4em', lg: '10em' }} maxW='800px'>

				{props.sections?.map((section, index) => (
					<Section
						key={index}
						isImgFirst={index % 2 === 0}
						title={section.title}
						text={section.text}
						image={section.image ? 
							<Image
								src={process.env['NEXT_PUBLIC_STRAPI_URL'] + section.image.url}
								alt={section.image.alternativeText}
								width='65%'
							/> : undefined
						}
						button={section.linkButton ? {
							text: 'Learn more',
							link: section.linkButton
						} : undefined}
					/>
				))}
			</VStack>

		</DefaultLayout>		
	
	</>)
}

export default HomePage