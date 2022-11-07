import React from 'react'

import { HStack, Text } from '@chakra-ui/react'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { trpc } from '@utils/lib'

type BuyButtonProps = {
    disabled: boolean
    discountCode?: string
}

export const BuyButton: React.FC<BuyButtonProps> = ({ disabled, discountCode }) => {

    const createOrderMutation = trpc.paypal.createOrder.useMutation()
    const captureOrderQuery = trpc.paypal.captureOrder.useMutation()

    const createPaypalOrder = async (): Promise<string> => {
        const { orderID } = await createOrderMutation.mutateAsync(discountCode ? { discountCode } : undefined)
        return orderID
    }

    const onApprove = async ({ orderID }: OnApproveData): Promise<void> => { captureOrderQuery.mutateAsync({ orderID }) }

    return (<>

        <Text variant='error'>
            {createOrderMutation.isError && <>
                {createOrderMutation.error.message}
            </>}
        </Text>

        <HStack>

            <PayPalButtons 
                style={{ layout: 'horizontal' }}
                fundingSource={'paypal'}
                disabled={disabled}
                createOrder={createPaypalOrder}
                onApprove={onApprove}
            />       

            {/* <PayPalButtons 
                style={{ layout: 'horizontal' }}
                fundingSource={'card'}
                disabled={disabled}
                createOrder={createPaypalOrder}
                onApprove={onApprove}
            />        */}

        </HStack>


    </>)
}