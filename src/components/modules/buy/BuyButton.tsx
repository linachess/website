import React from 'react'
import { useMutation } from 'react-query'
import axios, { AxiosError } from 'axios'

import { Box, Button, HStack, Text } from '@chakra-ui/react'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { trpc } from '@core/utils'

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