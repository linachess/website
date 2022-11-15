import React from 'react'

import { Box, HStack, Text } from '@chakra-ui/react'

type PriceProps = {
    buyable: boolean
    price: number
    promotedPrice: number | null
}

export const Price: React.FC<PriceProps> = ({ buyable, price, promotedPrice }) => {
    

	return (<>
        <HStack spacing={10}>

        {buyable ?
            <Text 
                fontSize='2rem' fontWeight='100'
                fontFamily='Raleway'
            >
                {promotedPrice?.toFixed(2) || price.toFixed(2)}€

                {/* original price if case of promotion */}
                {promotedPrice && 
                    <Box as='span' 
                        textDecoration='line-through'
                        color='text.secondary'
                        fontSize='1.5rem'
                        ml='1.5rem'
                    >
                        {price.toFixed(2)}€
                    </Box>
                }

            </Text>

            :

            <Text
                fontSize='1.5rem' fontWeight='100'
                color='text.secondary'
                fontFamily='Raleway'
            >
                LinaChess is not buyable for now.
            </Text>
        }

        </HStack>
    </>)
}