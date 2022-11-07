import React from 'react'
import Link from 'next/link'

import { Box, Text } from '@chakra-ui/react'

type NavItemProps = {
    title: string
    href: string
}

export const NavItem: React.FC<NavItemProps> = ({ title, href }) => {

	return (<>

        <Link href={href}>
            <Box cursor='pointer'>
                <Text>{title}</Text>
            </Box>
        </Link>

    </>)
}