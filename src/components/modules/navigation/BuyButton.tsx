import { Button } from '@chakra-ui/react'
import React from 'react'

type BuyButtonProps = {}

export const BuyButton: React.FC<BuyButtonProps> = () => {

	return (<>
        <Button
            backgroundColor='textPrimary'
            color='black'
        >
            Buy
        </Button>
    </>)
}