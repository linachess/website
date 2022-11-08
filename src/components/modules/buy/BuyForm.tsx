import React, { useEffect, useState } from 'react'

import { HStack, VStack } from '@chakra-ui/react'
import { BuyButton } from '@components/modules/buy'
import { InputField } from '@components/shared'
import { Form, useFormikContext } from 'formik'

type BuyFormProps = {
    disabled: boolean
    values: {
        firstName: string
        lastName: string
        email: string
        discountCode: string
    }
}

export const BuyForm: React.FC<BuyFormProps> = ({ disabled, values }) => {

    const { isValid, dirty } = useFormikContext()
	const [canBuy, setCanBuy] = useState(false)

	useEffect(() => {
		setCanBuy(isValid && dirty)
	}, [isValid, dirty])

	return (<>

        <Form>

            <VStack spacing={5}>

                <HStack spacing={5}>

                    <InputField name='firstName' placeholder='First name' validateOnChange={true}></InputField>
                    
                    <InputField name='lastName' placeholder='Last name' validateOnChange={true}></InputField>
                
                </HStack>

            <InputField name='email' placeholder='Email' validateOnChange={true}></InputField>

            <InputField name='discountCode' placeholder='Discount code' validateOnChange={true}></InputField>

            </VStack>

        </Form>

        <BuyButton 
            disabled={!canBuy} 
            discountCode={values.discountCode} 
            payer={{ 
                firstName: values.firstName, 
                lastName: values.lastName, 
                email: values.email 
            }}
        />


    </>)
}