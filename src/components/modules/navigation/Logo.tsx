import React from 'react'

import { Box, Heading } from '@chakra-ui/react'

type LogoProps = {}

export const Logo: React.FC<LogoProps> = () => {

	return (<>
        <Heading as='h2'>Lina<Box as='span' color='#c0c0c0'>Chess</Box></Heading>
    </>)
}