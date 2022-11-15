import React from 'react'

import { Box, Heading, Link } from '@chakra-ui/react'

type LogoProps = {}

export const Logo: React.FC<LogoProps> = () => {

	return (<>
        <Link href='/' _hover={{ textDecoration: 'none' }}>
            <Heading as='h2' userSelect='none'>Lina<Box as='span' color='#c0c0c0'>Chess</Box></Heading>
        </Link>
    </>)
}