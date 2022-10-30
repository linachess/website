import React from 'react'

import { Text, Box, Container, GridItem, Heading, SimpleGrid, VStack, Flex, Img, Button } from "@chakra-ui/react"
import { PopBox, ImageResolver } from "@components/shared"

type LandingSectionProps = {
    title: string
    image: string | React.ReactNode
    alt?: string
    isImgFirst?: boolean
    text?: string
    button?: {
        text: string
        link: string
    }
    children?: React.ReactNode
}

export const LandingSection: React.FC<LandingSectionProps> = ({ title, image, alt, isImgFirst, text, button, children }) => {

	return (<>
        <Box as="section" zIndex="banner">
            <Container position="relative" maxW="container.lg" px={{ base: 8, md: 12 }}>
                <PopBox>

                    <Flex flexDir={{ base: 'column-reverse', sm: 'column-reverse', md: isImgFirst ? 'row-reverse' : 'row' }} justifyContent='center' w='100%'>

                        <VStack
                            spacing={4}
                            py={4}
                            textAlign='center'
                            maxW="330px"
                            alignItems={{ md: "center" }}
                            marginLeft={{ md: isImgFirst ? 'auto' : '0' }}
                            marginRight={{ md: isImgFirst ? '0' : 'auto' }}
                            // mx={{ base: "auto", md: "unset" }}
                        >

                            <Heading
                                as="h3"
                                fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                            >
                                {title}
                            </Heading>

                            {text ? 
                                <Text
                                    fontSize={{ base: "lg", lg: "xl" }}
                                    fontWeight="semibold"
                                    color='white.200'
                                    opacity='0.6'
                                    lineHeight="125%"
                                    w="full"
                                >
                                    {text}
                                </Text>
                            : null}

                            {button ?
                                <Button as='a' href={button.link} 
                                        variant='primary' size='sm'
                                        mt='2rem !important'
                                >
                                    {button.text}
                                </Button>

                            : null}

                            {children}
                        </VStack>


                        <Flex justifyContent='center'>
                        {typeof image === 'string' ?
                            <Img
                                src={image}
                                alt={alt || title}
                                borderRadius='12px'
                                boxShadow='var(--chakra-shadows-xl)'
                            />
                            :
                            image
                        }
                        </Flex>

                    </Flex>
                </PopBox>
            </Container>
        </Box>
    </>)
}