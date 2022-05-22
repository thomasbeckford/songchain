const Button = {
    baseStyle: {
        fontSize: 'md',
        padding: '1rem',
        color: 'gray.800',
        borderRadius: 'md',
        _hover: {
            bg: 'blue.200',
            color: 'blue.800',
        },
        _active: {
            bg: 'blue.200',
            color: 'blue.800',
        },
    },

    sizes: {},

    variants: {
        primary: {
            bg: 'blue.200',
        },
        danger: {
            bg: 'red.400',
            color: 'white',
            _hover: {
                bg: 'red.200',
                color: 'gray.900',
            },
            _active: {
                bg: 'red.200',
                color: 'gray.900',
            },
        },
    },

    defaultProps: {
        size: '',
        variant: 'primary',
    },
};

export default Button;
