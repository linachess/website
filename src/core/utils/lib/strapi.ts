import { InvalidDiscountCodeError } from '@utils/errors'
import { formatStrapiResponse } from '@utils/functions'
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

    async getPrice(discountCode?: string) {

        const basePrice = (await this.find('buy')).currentPrice

        if (discountCode) {

            const discount = await strapi.find('discounts', {
                params: {
                    filters: {
                        code: { $eq: discountCode }
                    }
                }
            })

            if (!discount) {
                throw new InvalidDiscountCodeError()
            } else {
                return basePrice - (discount.percentage * basePrice) / 100
            }

        } else {

            const baseDiscount = (await this.find('buy')).currentDiscount

            if (baseDiscount && baseDiscount.active) {
                return basePrice - (baseDiscount.percentage * basePrice) / 100
            } else {
                return basePrice
            }
        }
    }
}

export const strapi = new Strapi()