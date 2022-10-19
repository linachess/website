import type { NextPage } from 'next'

import { Heading, Text } from '@chakra-ui/react'
import { DefaultLayout } from '@components/layouts'

const HomePage: NextPage = () => {

	return (<>

		<DefaultLayout
			title='Home'
		>

			<Heading as='h1' fontSize='7.5rem'>Check mate.</Heading>

			<Text>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio recusandae adipisci tempora at accusantium, quia sit voluptatum! Ipsum vitae non soluta tempora corrupti consequuntur asperiores consequatur. Veritatis error odio quibusdam.</Text>

		</DefaultLayout>		
	
	</>)
}

export default HomePage