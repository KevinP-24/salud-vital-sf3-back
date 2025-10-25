import dotenv from 'dotenv'
dotenv.config()

import nodemailer from 'nodemailer'

// Configuración del transportador SMTP de Gmail
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

/**
 * Envía un correo con formato HTML bonito (VitalApp)
 * @param {Object} options
 * @param {string|string[]} options.to - Destinatarios
 * @param {string} options.subject - Asunto del correo
 * @param {string} options.text - Cuerpo en texto plano
 * @param {string} [options.title='Notificación VitalApp'] - Título principal visible en el correo
 * @param {string} [options.accent='#2c7be5'] - Color principal del encabezado (azul por defecto, verde para resultados)
 * @returns {Promise<Object>} Información del envío
 */
export async function sendEmail({
  to,
  subject,
  text,
  title = 'Notificación VitalApp',
  accent = '#2c7be5', // azul por defecto
}) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('EMAIL_USER/EMAIL_PASS no están definidos')
  }

  const htmlTemplate = `
  <div style="
      font-family: Arial, sans-serif;
      background-color: #f6f8fb;
      padding: 24px;
  ">
    <div style="
        max-width: 600px;
        background-color: white;
        margin: 0 auto;
        border-radius: 10px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        overflow: hidden;
    ">
      <!-- Encabezado -->
      <div style="background-color: ${accent}; padding: 16px 24px;">
        <h2 style="color: #fff; margin: 0; font-size: 22px;">VitalApp</h2>
      </div>

      <!-- Cuerpo -->
      <div style="padding: 24px;">
        <h3 style="color: ${accent}; margin-top: 0;">${title}</h3>
        <p style="color: #333; font-size: 15px; white-space: pre-line;">
          ${text}
        </p>
      </div>

      <!-- Pie -->
      <div style="background-color: #f0f2f5; text-align: center; padding: 16px;">
        <p style="margin: 0; color: #555; font-size: 13px;">
          Este mensaje fue enviado automáticamente por <strong>VitalApp</strong>.<br/>
          Por favor no responda a este correo.
        </p>
      </div>
    </div>
  </div>`

  const info = await transporter.sendMail({
    from: `"VitalApp Notificador" <${process.env.EMAIL_USER}>`,
    to: Array.isArray(to) ? to.join(',') : to,
    subject,
    text,
    html: htmlTemplate,
  })

  return info
}
