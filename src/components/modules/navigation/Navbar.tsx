import React from 'react'

import { Flex, HStack } from '@chakra-ui/react'
import { Logo, NavItem, BuyButton } from '@components/modules/navigation'

type NavbarProps = {}

export const Navbar: React.FC<NavbarProps> = () => {

	return (<>

        <Flex 
            justifyContent='space-between' 
            padding='1em 3em'
            marginBottom='1em'
        >

            {/* left */}
            <Logo />

            {/* right */}
            <HStack spacing='3em'>
                
                <NavItem title="Test1" href="#"/>
                <NavItem title="Test2" href="#"/>
                <NavItem title="Test3" href="#"/>

                <BuyButton />

            </HStack>

        </Flex>
    </>)
}