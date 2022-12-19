import { publicProcedure, router } from '@server/trpc'

import { paypalRouter } from './paypal'
import { linachessRouter } from './linachess'

export const appRouter = router({

    paypal: paypalRouter,
    linachess: linachessRouter
})
   
export type AppRouter = typeof appRouter