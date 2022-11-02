import type { InferGetStaticPropsType, NextPage } from 'next'

import { Box, Flex, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react'
import { DefaultLayout } from '@components/layouts'
import { BuyButton, LandingSection } from '@components/modules'

export const getStaticProps = async () => {

	return {
		props: {
			catchPhrase: 'Check mate.',
			description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio recusandae adipisci tempora at accusantium, quia sit voluptatum! Ipsum vitae non soluta tempora corrupti consequuntur asperiores consequatur. Veritatis error odio quibusdam.',
			image: '/assets/chess_queen.svg',
			price: '34.99',
			promotedPrice: '29.99' as string | null,
			buyable: true
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

					<HStack spacing={10}>

						{props.buyable ?
							<Text 
								fontSize='2rem' fontWeight='100'
								fontFamily='Raleway'
							>
								{props.promotedPrice || props.price}€

								{/* original price if case of promotion */}
								{
									props.promotedPrice && 
									<Box as='span' 
										textDecoration='line-through'
										color='text.secondary'
										fontSize='1.5rem'
										ml='1.5rem'
									>
										{props.price}€
									</Box>
								}

							</Text>

							:

							<Text
								fontSize='1.5rem' fontWeight='100'
								color='text.secondary'
								fontFamily='Raleway'
							>
								LinaChess is not buyable for now.
							</Text>
						}

					</HStack>

					<BuyButton disabled={!props.buyable}/>

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