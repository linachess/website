import React from 'react'
import { useMutation } from 'react-query'
import axios, { AxiosError } from 'axios'

import { Button } from '@chakra-ui/react'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { trpc } from '@core/utils'

type BuyButtonProps = {
    disabled: boolean
}

export const BuyButton: React.FC<BuyButtonProps> = ({ disabled }) => {

    const createOrderMutation = trpc.paypal.createOrder.useMutation()
    const captureOrderQuery = trpc.paypal.captureOrder.useMutation()

    const createPaypalOrder = async (): Promise<string> => {
        const { orderID } = await createOrderMutation.mutateAsync({ discountCode: 'TEST' })
        return orderID
    }

    const onApprove = async ({ orderID }: OnApproveData): Promise<void> => { captureOrderQuery.mutateAsync({ orderID }) }

    return (<>

        {
            createOrderMutation.isError && <p>{createOrderMutation.error.message}</p>
        }

        <PayPalButtons 
            style={{ layout: 'horizontal' }}
            fundingSource={'paypal'}
            disabled={disabled}
            createOrder={createPaypalOrder}
            onApprove={onApprove}
        />        
    </>)
}