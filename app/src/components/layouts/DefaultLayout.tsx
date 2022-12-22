import React from 'react'

import { Flex } from '@chakra-ui/react'
import { Navbar } from '@components/modules'
import Head from 'next/head'

type DefaultLayoutProps = {
    title: string 
    version?: string
    iconHref?: string
    children: React.ReactNode
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ 
    title,
    version,
    iconHref,
    children 
}) => {

	return (<>
    
        <Head>
			<title>{ title }</title>
            <link rel="icon" href={ iconHref ?? '/assets/icon.png' } />
		</Head>

        <Navbar version={version}/>

        <Flex justifyContent='center' px={{ base: '2rem', md: '2rem', lg: '5rem' }} pb='10rem'>

            <Flex 
                flexDir='column' alignItems='center' 
                maxWidth='960px'
            >
                { children }
            </Flex>

        </Flex>

    </>)
}