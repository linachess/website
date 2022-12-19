import { publicProcedure, router } from '@server/trpc'
import { strapi } from '@utils/lib'

export const linachessRouter = router({

    getVersion: publicProcedure
        .query(async () => {
            
            const data = await strapi.findOne('buy')

            return { 
                version: data.currentVersion?.version,
            }
        })
})