import React, { useState } from 'react'

import { Box, Button, Flex, HStack, Stack } from '@chakra-ui/react'
import { Logo, NavItem, NavToggle } from '@components/modules/navigation'

type NavbarProps = {
    version?: string
}

export const Navbar: React.FC<NavbarProps> = ({ version }) => {

    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(!isOpen)

	return (<>

        <Flex
            as='nav'
            align='center' justify='space-between' wrap='wrap'
            w='100%' mb={8} p={8}
        >

            {/* left */}
            <Logo version={version}/>

            {/* toggle */}
            <NavToggle isOpen={isOpen} toggle={toggle}/>

            {/* right */}
            <Box
                display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
                flexBasis={{ base: '100%', md: 'auto' }}
            >
                <Stack
                    spacing={8}
                    align='center'
                    justify={['center', 'space-between', 'flex-end', 'flex-end']}
                    direction={['column', 'row', 'row', 'row']}
                    pt={[4, 4, 0, 0]}
                >
                    <NavItem title='Home' to='/' />
                    <NavItem title='Investors' to='/investors' />
                    <NavItem title='Overview' to='/overview' />

                    <Button 
                        as='a' href='/buy'
                        variant='primary'
                    >
                        Buy
                    </Button>
                    
                </Stack>
            </Box>

        </Flex>
    </>)
}