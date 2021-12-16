import { mailConfig } from '../config/mail'
import { createTransport, TransportOptions } from 'nodemailer'

const transporter = createTransport(mailConfig as TransportOptions)

export { transporter }
