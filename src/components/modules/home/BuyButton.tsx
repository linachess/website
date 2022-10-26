import { Button } from '@chakra-ui/react'
import React from 'react'

type BuyButtonProps = {}

export const BuyButton: React.FC<BuyButtonProps> = () => {

	return (<>

        <Button
            variant='outline'
            size='lg'
            color='textPrimary'
            borderColor='textPrimary'
            fontFamily='Raleway'
            fontWeight='bolder'
            _hover={{
                bg: 'textPrimary',
                color: 'bgPrimary'
            }}
        >
            Buy
        </Button>
    </>)
}