import { Box, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

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