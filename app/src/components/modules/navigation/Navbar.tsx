import React from 'react'

import { Button, Flex, HStack } from '@chakra-ui/react'
import { Logo, NavItem } from '@components/modules/navigation'

type NavbarProps = {}

export const Navbar: React.FC<NavbarProps> = () => {

	return (<>

        <Flex 
            justifyContent='space-between' 
            padding='1.5em 3em'
            marginBottom='1em'
        >

            {/* left */}
            <Logo />

            {/* right */}
            <HStack spacing='3em'>
                
                <NavItem title="Home" href="/"/>
                <NavItem title="Investors" href="/investors"/>
                <NavItem title="Overview" href="/overview"/>

                <Button 
                    as='a' href='/buy'
                    variant='primary'
                >
                    Buy
                </Button>

            </HStack>

        </Flex>
    </>)
}