import { defineStyleConfig } from "@chakra-ui/react"

const styles = defineStyleConfig({

    variants: {

        error: (props: any) => ({
            color: 'red.400',
            minHeight: '1.5em'
        })
    }
})

export default styles