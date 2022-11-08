import { InvalidDiscountCodeError } from '@utils/errors'
import { applyDiscountPercentage, formatStrapiResponse } from '@utils/functions'
import axios from 'axios'

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

    // CRUD

    async find<K extends keyof CMS.Correspondance>(url: K, params?: any): Promise<Array<CMS.Correspondance[K]>> {

        const res = await this.axios.get(this.sanitizeUrl(url), { params })
        return formatStrapiResponse(res.data)
    }

    async findOne<K extends keyof CMS.Correspondance>(url: K, params?: any): Promise<CMS.Correspondance[K]> {

        const res = await this.axios.get(this.sanitizeUrl(url), { params })
        const data = formatStrapiResponse(res.data)

        return Array.isArray(data) ? data[0] || null : data
    }

    async create<K extends keyof CMS.Correspondance>(url: K, data: any): Promise<CMS.Correspondance[K]> {

        const res = await this.axios.post(this.sanitizeUrl(url), { data })
        return formatStrapiResponse(res.data)
    }

    // utils

    private sanitizeUrl(url: string) {
        return '/' + url.replace(/^\//, '')
    }

    // business logic

    async getPrice(discountCode?: string) {

        const basePrice = (await this.findOne('buy')).currentPrice

        if (discountCode) {

            const discount = await strapi.findOne('discounts', {
                filters: {
                    code: { $eq: discountCode }
                }
            })

            if (!discount) {
                throw new InvalidDiscountCodeError()
            } else {
                return applyDiscountPercentage(basePrice, discount.percentage)
            }

        } else {

            const baseDiscount = (await this.findOne('buy')).currentDiscount

            if (baseDiscount && baseDiscount.active) {
                return applyDiscountPercentage(basePrice, baseDiscount.percentage)
            } else {
                return basePrice
            }
        }
    }
}

export const strapi = new Strapi()