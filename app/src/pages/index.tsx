import { strapi } from '@utils/lib'
import type { InferGetStaticPropsType, NextPage } from 'next'

import { Box, Button, Flex, Heading, Image, keyframes, Text, VStack } from '@chakra-ui/react'
import { DefaultLayout } from '@components/layouts'
import { Section } from '@components/shared'
import { Price } from '@components/shared'

const scrollButtonAnimation = keyframes`
	0% {
		transform: rotate(-45deg) translate(0, 0);
		opacity: 0;
	}
	50% {
		opacity: 1;
	}
	100% {
		transform: rotate(-45deg) translate(-20px, 20px);
		opacity: 0;
	}
`

export const getStaticProps = async () => {

	const homepageData = await strapi.findOne('homepage'),
		  buyData = await strapi.findOne('buy')

	return {
		props: {
			catchPhrase: homepageData.catchPhrase,
			description: homepageData.presentation,
			image: '/assets/chess_queen.svg',
			price: buyData.currentPrice,
			promotedPrice: buyData.currentDiscount?.newPrice || null,
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

			<Flex mt='2.5rem' w='100%' justifyContent='space-between'>

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
						size='lg'
					>
						Buy
					</Button>

				</VStack>

				<Flex justifyContent='end'>

					<Image 
						src={props.image}
						alt='Chess queen'
						width='125px'
						transform='rotate(-10deg)'
						filter='invert(32%) sepia(7%) saturate(1564%) hue-rotate(343deg) brightness(87%) contrast(84%)' // #5e4e42 -> https://codepen.io/sosuke/pen/Pjoqqp
					/>
				</Flex>
				
			</Flex>

			{/* Scroll arrow */}

			<Box 
				pt='70px'
				position='fixed'
				bottom='2rem'
				right='3rem'
			>
				<Box as='span'
					position='absolute'
					top='0'
					left='50%'
					width='24px'
					height='24px'
					ml='-12px'
					sx={{
						borderColor: 'text.primary',
						borderLeft: '1px solid',
						borderBottom: '1px solid'
					}}
					transform='rotate(-45deg)'
					animation={`${scrollButtonAnimation} 1.5s infinite`}
				/>
				Scroll
			</Box>

			{/* Separation */}

			<Box 
				mt='5em'
				mb='2.5em'
				bgColor='text.primary' opacity='0.3'
				h='2px' w='50%'
				borderRadius='10px'
			/>

			{/* Investors section */}

			<VStack spacing={{ base: '3em', lg: '5em' }} maxW='800px'>

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
							link: section.linkButton,
							size: 'md',
							variant: 'secondary'
						} : undefined}
					/>
				))}
			</VStack>

		</DefaultLayout>		
	
	</>)
}

export default HomePage