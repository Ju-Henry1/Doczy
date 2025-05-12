import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Configure ton transporteur (exemple avec Gmail)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'contact.henryjulien@gmail.com',
      pass: 'vosx qpjk jvge hfem' // ⚠️ mot de passe d'application, pas ton vrai mot de passe !
    }
  })

  // Contenu de l'e-mail
  const mailOptions = {
    from: `"${body.name}" <${body.email}>`,
    to: 'contact.henryjulien@gmail.com',
    subject: body.subject,
    text: body.message
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('Erreur email:', error)
    return { success: false, error: 'Erreur lors de l’envoi du message' }
  }
})
