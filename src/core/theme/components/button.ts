const styles = {

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
        })
    }
}

export default styles