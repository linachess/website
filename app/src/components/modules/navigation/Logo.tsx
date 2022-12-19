import React from 'react'

import { Box, Heading, Link } from '@chakra-ui/react'

type LogoProps = {
    version?: string
}

export const Logo: React.FC<LogoProps> = ({ version }) => {

	return (<>
        <Link href='/' _hover={{ textDecoration: 'none' }}>
            <Heading as='h2' userSelect='none'>
                Lina<Box as='span' color='#c0c0c0'>Chess</Box>
                <Box as='span' ml='1em' fontSize='.6em'>v{version}</Box>    
            </Heading>
        </Link>
    </>)
}