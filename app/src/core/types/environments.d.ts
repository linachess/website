declare global {
    namespace NodeJS {
        interface ProcessEnv {

            NODE_ENV: 'development' | 'production'

            EMAIL: string
            EMAIL_PASSWORD: string

            STRAPI_URL: string
            STRAPI_ADMIN_JWT: string

            LICENSE_GENERATOR_URL: string

            NEXT_PUBLIC_PAYPAL_CLIENT_ID: string
            NEXT_PUBLIC_SANDBOX_PAYPAL_CLIENT_ID: string
            PAYPAL_CLIENT_ID: string
            PAYPAL_CLIENT_SECRET: string
            SANDBOX_PAYPAL_CLIENT_ID: string
            SANDBOX_PAYPAL_CLIENT_SECRET: string
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}