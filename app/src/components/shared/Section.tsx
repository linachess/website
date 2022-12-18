import type { ContentProps } from '@components/shared'
import React from 'react'

import { Box, Container, Flex, Img } from '@chakra-ui/react'
import { Content } from '@components/shared'

type SectionProps = {
    image?: string | React.ReactNode
    alt?: string
    isImgFirst?: boolean
} & ContentProps

export const Section: React.FC<SectionProps> = (props) => {

    return (<>
    
        <Container maxW='container.xl' px={{ base: 8, md: 12 }}>

            {props.image ?

                <Flex
                    direction={{ base: 'column', md: props.isImgFirst ? 'row' : 'row-reverse' }}
                    alignItems='center'
                    justifyContent='center'
                    py={8}
                >
                    <Box
                        flex='1'
                        maxW={{ base: 'full', md: '50%' }}
                        mb={{ base: 8, md: 0 }}
                    >
                        <Content
                            {...props}
                        />

                    </Box>
                    <Flex
                        // flex='1'
                        maxW={{ base: 'full', md: '50%' }}
                        mb={{ base: 8, md: 0 }}
                        justifyContent={{ base: 'center', md: !props.isImgFirst ? 'start' : 'end' }}
                    >
                        {typeof props.image === 'string' ?
                            <Img
                                src={props.image}
                                alt={props.alt}
                                w='75%'
                                objectFit='cover'
                            />
                            : props.image}
                    </Flex>
                </Flex>
            :             
                <Content
                    {...props}
                />
        }
        </Container>
    </>)

}