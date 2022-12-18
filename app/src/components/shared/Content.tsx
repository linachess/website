import React from 'react'

import { Button, Heading, Text, ThemeTypings, VStack } from '@chakra-ui/react'

export type ContentProps = {
    text: string
    textAlign?: 'start' | 'center' | 'end' | 'justify'
    title?: string
    children?: React.ReactNode
    button?: {
        text: string
        link: string
        size?: 'sm' | 'md' | 'lg'
        variant?: ThemeTypings['components']['Button']['variants']
    }
}

export const Content: React.FC<ContentProps> = (props) => {

    const textAlign = props.textAlign || 'center'

	return (<>

        <VStack
            spacing={4}
            py={4}
            textAlign='center'
            maxW='960px'
            alignItems={{ base: 'center', md: textAlign }}
        >

            <Heading
                as='h3'
                fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
            >
                {props.title}
            </Heading>

            {props.text ? 
                <Text
                    fontSize={{ base: 'lg', lg: 'xl' }}
                    fontWeight='semibold'
                    color='white.200'
                    opacity='0.6'
                    lineHeight='125%'
                    w='full'
                    textAlign={textAlign === 'start' ? 'left' : textAlign === 'end' ? 'right' : textAlign}
                >
                    {props.text}
                </Text>
            : null}

            {props.button ?
                <Button as='a' href={props.button.link} 
                        variant={props.button.variant || 'primary'} size={props.button.size || 'lg'}
                        mt='2rem !important'
                >
                    {props.button.text}
                </Button>

            : null}

            {props.children}
            
        </VStack>
    </>)
}