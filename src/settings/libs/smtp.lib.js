//  INFO:  LIB SMTP

//  NOTE:  ESLINT FIX
/* global nodeMailer config */

//  NOTE:  FUNCTION SMTP SEND
// ============================================================
const smtpSend = async (type, mailOptions) => {
	const transport = nodeMailer.createTransport({
		host: config.get("smtp.host"),
		port: config.get("smtp.port"),
		secure: config.get("smtp.secure"),

		auth: {
			user: config.get(`smtp.${type}.user`),
			pass: config.get(`smtp.${type}.pass`)
		},

		tls: {
			ciphers: config.get("smtp.ciphers")
		},

		connectionTimeout: config.get("smtp.connectionTimeout"),
		socketTimeout: config.get("smtp.socketTimeout"),
		greetingTimeout: config.get("smtp.greetingTimeout")
	})

	await transport.sendMail(mailOptions)
}

//  NOTE:  EXPORT
export default smtpSend
