import { Button } from '@chakra-ui/react'
import React from 'react'

type BuyButtonProps = {
    disabled: boolean
}

export const BuyButton: React.FC<BuyButtonProps> = ({ disabled }) => {

	return (<>

        <Button
            variant='primary'
            disabled={disabled}
        >
            Buy
        </Button>
    </>)
}