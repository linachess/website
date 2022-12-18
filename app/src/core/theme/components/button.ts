import { defineStyleConfig } from "@chakra-ui/react"

const styles = defineStyleConfig({

    variants: {

        primary: (props: any) => ({
            size: 'lg',
            color: 'black',
            backgroundColor: 'text.primary',
            borderColor: 'text.primary',
            fontFamily: 'Raleway',
            fontWeight: 'bolder',
            transition: '.3s linear',
            _hover: {
                backgroundColor: '#cbb3a1',
                color: 'black'
            }
        }),

        secondary: (props: any) => ({
            size: 'lg',
            color: 'black',
            backgroundColor: 'text.primary',
            borderColor: 'text.primary',
            fontFamily: 'Raleway',
            fontWeight: 'bolder',
            transition: '.3s linear',
            _hover: {
                backgroundColor: '#cbb3a1',
                color: 'black'
            },
            opacity: '0.8'
        }),
    }
})

export default styles