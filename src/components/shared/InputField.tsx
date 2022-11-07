import React from 'react'

import { Field, FieldProps } from 'formik'
import { Box, Input, Text, useStyleConfig } from '@chakra-ui/react'

type InputFieldProps = {
    name: string
    validateOnChange?: boolean
    className?: string
    placeholder?: string
} & Rest

export const InputField: React.FC<InputFieldProps> = ({ className, name, placeholder, validateOnChange = false, ...rest }) => {
    
    return (
        <Field
            name={name}
            {...rest}
            render={({ field, form: { touched, errors, validateField } }: FieldProps) => {

                const error =
                    (validateOnChange && touched[name]) && typeof errors[name] === "string"
                    ? errors[name] : null

                const onChange = validateOnChange
                    ? (e: any) => {
                        if (validateOnChange) validateField(field.name)
                        return field?.onChange(e)
                    }
                    : field.onChange

                return (

                    <Box as='div' 
                        className={className}
                        w='100%'
                    >
                    
                        <Input 
                            placeholder={placeholder} 
                            {...field}     
                            onChange={onChange} 
                            borderColor={error ? 'red.500' : 'text.primary'}
                            bgColor='bg.secondary'
                            _placeholder={{ color: 'text.primary', opacity: '0.5' }}
                            w='100%'
                        />

                        <Text 
                            variant='error'
                        >
                            {error && typeof error === 'string' && <>
                                {placeholder ? error.replace(name, placeholder) : error}
                            </>}   
                        </Text>    
                        

                    </Box>
                )
            }}
        />
    )
}