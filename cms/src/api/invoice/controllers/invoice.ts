/**
 * invoice controller
 */

import { factories } from '@strapi/strapi'
import nodemailer from 'nodemailer'
import path from 'path'

export default factories.createCoreController('api::invoice.invoice', ({ strapi }) => ({

  async create(ctx) {

    // calling the default core action
    const originalInvoiceData = await super.create(ctx)

    if (ctx.req.url.includes('workflow=true')) {

      await strapi.service('api::invoice.invoice-generator').generateInvoice(originalInvoiceData.data.id)

      const invoiceData = await strapi.entityService.findOne('api::invoice.invoice', originalInvoiceData.data.id, {
        populate: 'deep'
      })

      const config = await strapi.entityService.findOne('api::config.config', 1)

      const mailOptions: Omit<nodemailer.SendMailOptions, 'from' | 'to'> = {
        subject: 'Invoice',
        text: strapi.service('api::invoice.mail-sender').parseTemplate(config.emailTemplate, {
          firstName: invoiceData.firstName,
          lastName: invoiceData.lastName,
          licenseKey: invoiceData.license.key,
          downloadExpirationTime: config.downloadExpirationTime,
          downloadLink: `${process.env['APP_URL']}/download/${invoiceData.license.downloadHash}`,
        }),
        attachments: [
          {
            filename: invoiceData.file.name,
            path: path.join(`${__dirname}`, '../../../../../public' + invoiceData.file.url)
          },
        ]
      }

      await strapi.service('api::invoice.mail-sender').send(invoiceData.email, mailOptions)
    }

    return originalInvoiceData
  },

}))
