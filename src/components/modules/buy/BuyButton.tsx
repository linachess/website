import { trpc } from '@utils/lib'
import React, { useRef } from 'react'

import { HStack, Text } from '@chakra-ui/react'
import { PayPalButtons } from '@paypal/react-paypal-js'

type BuyButtonProps = {
    disabled: boolean
    discountCode?: string
    payer: {
        firstName: string
        lastName: string
        email: string
    }
}

export const BuyButton: React.FC<BuyButtonProps> = ({ disabled, discountCode, payer }) => {

    const createOrderMutation = trpc.paypal.createOrder.useMutation()
    const captureOrderQuery = trpc.paypal.captureOrder.useMutation()

    const payloadRef = useRef<{ discountCode: BuyButtonProps['discountCode'], payer: BuyButtonProps['payer'] } | null>(null)
    payloadRef.current = { discountCode, payer }

    const createPaypalOrder = async (): Promise<string> => {
        
        const input = {
            discountCode: payloadRef.current?.discountCode
        }

        const { orderID } = await createOrderMutation.mutateAsync(input)
        return orderID
    }

    const onApprove = async ({ orderID }: OnApproveData): Promise<void> => {

        const input = {
            orderID,
            payer: payloadRef.current!.payer,
            discountCode: payloadRef.current?.discountCode
        }

        captureOrderQuery.mutateAsync(input) 
    }

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