import { Box, Flex } from '@chakra-ui/react'
import { Navbar } from '@components/modules'
import Head from 'next/head'
import React from 'react'

type DefaultLayoutProps = {
    title: string 
    iconHref?: string
    children: React.ReactNode
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ 
    title,
    iconHref,
    children 
}) => {

	return (<>
    
        <Head>
			<title>{ title }</title>
            <link rel="icon" href={ iconHref } />
		</Head>

        <Navbar />

        <Flex justifyContent='center' px='5rem' pb='10rem'>

            <Flex 
                flexDir='column' alignItems='center' 
                maxWidth='960px'
            >
                { children }
            </Flex>

        </Flex>

    </>)
}