const Accordion = {
    parts: ['container', 'item', 'button', 'panel', 'icon'],
    baseStyle: {
        container: {
            bg: 'grayDarker',
            _focus: {
                boxShadow: 'none',
            },
        },
        item: {
            _focus: {
                boxShadow: 'none',
            },
        },
        panel: {
            _focus: {
                boxShadow: 'none',
            },
        },

        _focus: {
            boxShadow: 'none',
        },
    },

    sizes: {},

    variants: {
        primary: {
            container: {
                bg: 'bgBox',
                color: 'white',
                borderRadius: '10px',
                margin: '5px',
                boxSizing: 'border-box',
                border: '1px solid #374151',
            },
        },
    },

    defaultProps: {
        variant: 'primary',
    },
};

export default Accordion;
