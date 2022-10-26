import type { InferGetStaticPropsType, NextPage } from 'next'
import { useToast } from '@chakra-ui/react'

import { Box, Flex, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react'
import { DefaultLayout } from '@components/layouts'
import { BuyButton } from '@components/modules'
import { useEffect } from 'react'

export const getStaticProps = async () => {

	return {
		props: {
			catchPhrase: 'Check mate.',
			description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio recusandae adipisci tempora at accusantium, quia sit voluptatum! Ipsum vitae non soluta tempora corrupti consequuntur asperiores consequatur. Veritatis error odio quibusdam.',
			image: '/assets/chess_queen.svg',
			price: '34.99',
			promotedPrice: '29.99' as string | null,
		}
	}
}

const HomePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {

	const toast = useToast()

	useEffect(() => {

		toast({
			position: 'top',
			render: () => (
				<Box>
					
				</Box>
			)
		})
	}, [])

	return (<>

		<DefaultLayout
			title='Home'
		>
				
				<Flex mt='5rem' w='100%' justifyContent='space-between'>

					<VStack maxW='50%' spacing={10} justifyContent='center' alignItems='start'>

						<Heading as='h1'
							fontSize='4rem'
						>
							{props.catchPhrase}
						</Heading>

						<Text>{props.description}</Text>

						<HStack spacing={10}>

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
										color='textSecondary'
										fontSize='1.5rem'
										ml='1.5rem'
									>
										39.99€
									</Box>
								}

							</Text>

						</HStack>

						<BuyButton />

					</VStack>

					<Flex justifyContent='end'>

						<Image 
							src={props.image}
							alt='Chess queen'
							width='40%'
							transform='rotate(-10deg)'
							filter='invert(32%) sepia(7%) saturate(1564%) hue-rotate(343deg) brightness(87%) contrast(84%)' // #5e4e42 -> https://codepen.io/sosuke/pen/Pjoqqp
						/>
					</Flex>
					
				</Flex>


		</DefaultLayout>		
	
	</>)
}

export default HomePage