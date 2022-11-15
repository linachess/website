/**
 * mailSender service
 */

import nodemailer from 'nodemailer'

export default () => ({

  parseTemplate(template, data) {
    const templateData = template.replace(/{{\s*([a-zA-Z0-9_]+)\s*}}/g, (match, key) => {
      return data[key] || ''
    })
    return templateData
  },

  async send(to: string, mailOptions: Omit<nodemailer.SendMailOptions, 'from' | 'to'>) {

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env['EMAIL'],
        pass: process.env['EMAIL_PASSWORD'],
      },
    })

    try {

      await transporter.sendMail({
        from: process.env['EMAIL'],
        to,
        ...mailOptions,
      })
      return true

    } catch (err) {

      console.error(err)
      return false
    }
  }
})
