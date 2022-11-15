const styles = {

    global: (props: any) => ({

        // body
        'body': {
            padding: 0,
	        margin: 0,
	        fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
            backgroundColor: 'bg.primary',
            color: 'text.primary'
        },

        // resets
        '*': {
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
        },
        
        'a': {
            color: 'inherit',
            textDecoration: 'none',
        },
        
        '::-webkit-scrollbar': {
            width: '5px'
        },
        '::-webkit-scrollbar-thumb': {
            borderRadius: '10px',
            background: '#5f4e42',
        },
        '::-webkit-scrollbar-track': {
            background: 'rgba(0, 0, 0, 0)'
        }

    })
}

export default styles