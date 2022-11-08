import { getPromotedPrice } from '@utils/functions'
import { strapi } from '@utils/lib'
import type { InferGetStaticPropsType, NextPage } from 'next'

import { Box, Button, Flex, Heading, Image, Text, VStack } from '@chakra-ui/react'
import { DefaultLayout } from '@components/layouts'
import { LandingSection } from '@components/modules'
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
			buyable: buyData.buyable
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

			<VStack spacing={{ base: '4em', lg: '10em' }}>

				<LandingSection 
					title='Investors'
					text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.'
					image={
						<Image 
							src='/assets/investors.svg'
							alt='Chess queen'
							width='30%'
							filter='invert(32%) sepia(7%) saturate(1564%) hue-rotate(343deg) brightness(87%) contrast(84%)' // #5e4e42 -> https://codepen.io/sosuke/pen/Pjoqqp
						/>
					}
					isImgFirst={true}
					button={{
						text: 'Learn more',
						link: '/investors'
					}}
				/>

				<LandingSection 
					title='Overview'
					text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.'
					image={
						<Image 
							src='/assets/gear.svg'
							alt='Chess queen'
							width='30%'
							filter='invert(32%) sepia(7%) saturate(1564%) hue-rotate(343deg) brightness(87%) contrast(84%)' // #5e4e42 -> https://codepen.io/sosuke/pen/Pjoqqp
						/>
					}
					button={{
						text: 'Learn more',
						link: '/overview'
					}}
				/>
			</VStack>

		</DefaultLayout>		
	
	</>)
}

export default HomePage