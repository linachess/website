import { publicProcedure, router } from '@server/trpc'

import { paypalRouter } from './paypal'

export const appRouter = router({
    paypal: paypalRouter
})
   
export type AppRouter = typeof appRouter