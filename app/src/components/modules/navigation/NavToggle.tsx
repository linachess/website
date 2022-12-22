import React from 'react'

import { Box, Text } from '@chakra-ui/react'
import { IoIosClose } from 'react-icons/io'
import { TiThMenu } from 'react-icons/ti'

type NavToggleProps = {
    isOpen: boolean
    toggle: () => void
}

export const NavToggle: React.FC<NavToggleProps> = (props) => {

	return (<>
        <Box display={{ base: "block", md: "none" }} onClick={props.toggle}>
            <Text color='text.primary'>{props.isOpen ? <IoIosClose size='2em'/> : <TiThMenu />}</Text>
        </Box>
    </>)
}