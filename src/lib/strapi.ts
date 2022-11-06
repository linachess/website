import { formatStrapiResponse } from '@utils'
import axios, { AxiosRequestConfig } from 'axios'

class Strapi {

    axios = axios.create({
        baseURL: process.env['STRAPI_URL'] + '/api',
        headers: {
            Authorization: `Bearer ${process.env['STRAPI_ADMIN_JWT']}`
        },
        params: {
            populate: '*'
        }
    })

    async find<K extends string>(url: K, config?: AxiosRequestConfig<any> | undefined) {

        const sanitizedUrl = '/' + url.replace(/^\//, '')

        const res = await this.axios.get(sanitizedUrl, config)
        return formatStrapiResponse(res.data)
    }
}

const strapi = new Strapi()

export default strapi