import React from 'react'
import { useMutation } from 'react-query'
import axios, { AxiosError } from 'axios'

import { Button } from '@chakra-ui/react'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'

type BuyButtonProps = {
    disabled: boolean
}

export const BuyButton: React.FC<BuyButtonProps> = ({ disabled }) => {

    const createMutation = useMutation<{ data: any }, AxiosError, any, Response>(
        (): any => axios.post('/api/paypal/createOrder'),
    )

    const captureMutation = useMutation<string, AxiosError, any, Response>(
        (data): any => axios.post('/api/paypal/captureOrder', data),
    )

    const createPaypalOrder = async (): Promise<string> => {
        const response = await createMutation.mutateAsync({})
        return response.data.orderID
    }

    const onApprove = async (data: OnApproveData): Promise<void> => {
        return captureMutation.mutate({ orderID: data.orderID })
    }

    return (<>

        <PayPalButtons 
            style={{ layout: 'horizontal' }}
            fundingSource={'paypal'}
            disabled={disabled}
            createOrder={createPaypalOrder}
            onApprove={onApprove}
        />        
    </>)
}