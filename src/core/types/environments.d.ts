declare global {
    namespace NodeJS {
        interface ProcessEnv {

            NODE_ENV: 'development' | 'production'

            EMAIL: string
            EMAIL_PASSWORD: string

            STRAPI_URL: string
            STRAPI_ADMIN_JWT: string

            NEXT_PUBLIC_PAYPAL_CLIENT_ID: string
            PAYPAL_CLIENT_ID: string
            PAYPAL_CLIENT_SECRET: string
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}