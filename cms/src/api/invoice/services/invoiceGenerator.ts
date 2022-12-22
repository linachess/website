/**
 * invoiceGenerator service
 */

import MicroInvoice from 'microinvoice'
import { rm, stat } from 'fs/promises'
import path from 'path'

export class Invoice {

    data: any

    constructor(invoiceData, sellerData) {

      this.data = new MicroInvoice({

        style : {
            header : {
              image: {
                path: './public/assets/logo.png',
                width: 200,
                height: 31,
              }
            }
        },

        data : {
          invoice : {

            name : 'Invoice',

            header : [
              { label : 'Invoice ID', value : invoiceData.id },
              { label : 'Status', value : 'Paid' },
              { label : 'Date', value : new Date(invoiceData.date).toLocaleDateString('fr-FR') }
            ],

            currency : 'EUR',

            customer : [
              {
                label : 'Bill To',
                value : [
                  `${invoiceData.firstName} ${invoiceData.lastName}`,
                  invoiceData.email
                ]
              },
            ],

            seller : [
              {
                label : 'Bill From',
                value : [
                  sellerData.name,
                  sellerData.address,
                  sellerData.country,
                  sellerData.phone,
                  sellerData.email
                ]
              },
            ],

            legal : [

            ],

            details : {

              header : [
                { value : 'Description' },
                { value : 'Quantity' },
                { value : 'Subtotal' }
              ],

              parts : [

                [
                  { value : `LinaChess v${invoiceData.versionBought}` },
                  { value : 1 }, { value : invoiceData.originalPrice, price : true }
                ],

              ],

              total : [

                ...(invoiceData.originalPrice !== invoiceData.buyPrice ? [{
                  label : 'Discount',
                  value : `-${(invoiceData.originalPrice - invoiceData.buyPrice).toFixed(2)}€`,
                }] : []),

                {
                  label : 'Total',
                  value : invoiceData.buyPrice,
                  price : true
                },
              ]
            }
          }
        }
      })
    }

    async generate(name: string) {

      try {
        await this.data.generate(name)
        return true
      } catch (err) {
        return false
      }
    }


}

export default () => ({

  async generateInvoice(invoiceId: string) {

    const invoiceData = await strapi.entityService.findOne('api::invoice.invoice', invoiceId, {
      populate: '*'
    })
    const sellerData = await strapi.entityService.findOne('api::seller.seller', 1)

    if (!invoiceData) {
      throw new Error('Invoice not found')
    }

    // generate the pdf
    const pdfName = `invoice_${invoiceData.id}_${new Date(invoiceData.date).getTime()}.pdf`
    const pdfTempPath = path.join(__dirname, '..', '..', '..', '..', '..', 'tmp', pdfName)

    const invoice = new Invoice(invoiceData, sellerData)
    const pdf = await invoice.generate(pdfTempPath)

    // upload the generated pdf into the media library
    if (pdf) {

      // get the size of the pdf file via fs
      const { size } = await stat(pdfTempPath)

      await strapi.plugins.upload.services.upload.upload({
          data: {
            refId: invoiceId,
            ref: 'api::invoice.invoice',
            field: 'file',
          },
          files: {
            path: pdfTempPath,
            name: pdfName,
            type: 'application/pdf',
            size: size || 0,
          }
      })

      // delete the original pdf
      await rm(pdfTempPath)

    }
  }
})
