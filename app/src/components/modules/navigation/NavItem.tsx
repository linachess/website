import React from 'react'
import Link from 'next/link'

import { Box, Text } from '@chakra-ui/react'

type NavItemProps = {
    title: string
    to: string
} & Rest

export const NavItem: React.FC<NavItemProps> = ({ title, to = '/', ...rest }) => {

	return (<>

        <Link href={to}>
            <Box cursor='pointer'>
                <Text>{title}</Text>
            </Box>
        </Link>

    </>)
}