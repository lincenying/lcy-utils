import lincy from '@lincy/eslint-config'

const config = lincy(
    {
        vue: false,
        overrides: {
            ignores: [
                '**/assets',
                '**/static',
            ],
        },
    },
)

export default config
