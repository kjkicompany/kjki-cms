//  INFO:  CONTROLLER HOME

//  NOTE:  ESLINT FIX
/* global _l util geoIpCountry bcryptJs appDarkName appDesign appChangeColor appToggleMenu appIconNetwork ejs config process func path __dirname colors __file __ext __line app appLang */

//  NOTE:  IMPORT MODELS
// ============================================================
import usersModel from "../../models/users.model.js"

//  NOTE:  IMPORT LIBS
// ============================================================
import smtpSend from "../../../settings/libs/smtp.lib.js"

//  NOTE:  CONSTANT
// ============================================================
const homeControllerBackEnd = {
	//  NOTE:  GET HOME
	// ============================================================
	getHome: (req, res) => {
		const sessions = req.session

		res.render("backend/views/pages/home/home", {
			sessionStatus: sessions.status,
			sessionId: sessions.id,

			appTitleDescription: _l.get("home.appTitleDescription", "Home"),

			active_nav: "home",

			bodyTitle: _l.get("home.bodyTitle", "Home"),

			layout: "backend/views/layouts/layout"
		})
	},

	//  NOTE:  GET SIGN UP
	// ============================================================
	getSignUp: (req, res) => {
		const sessions = req.session

		if (sessions.csrf === undefined) {
			sessions.csrf = func.generateRandomAlphanumeric(32)
		}

		res.render("backend/views/pages/home/signUp", {
			sessionStatus: sessions.status,
			csrfToken: sessions.csrf,

			urlFormPost: "/panel/signup",

			appTitleDescription: _l.get("signUp.appTitleDescription", "Sign up"),

			bodyTitle: _l.get("signUp.bodyTitle", "Sign up"),
			bodyDescription: _l.get("signUp.bodyDescription", "Sign up, so you can manage the web"),

			placeholderFirstName: _l.get("signUp.placeholderFirstName", "Enter first name"),
			placeholderLastName: _l.get("signUp.placeholderLastName", "Enter last name"),
			placeholderNickName: _l.get("signUp.placeholderNickName", "Enter nick name"),
			placeholderEmail: _l.get("signUp.placeholderEmail", "Enter email"),
			placeholderRepeatEmail: _l.get("signUp.placeholderRepeatEmail", "Repeat email"),
			placeholderPassword: _l.get("signUp.placeholderPassword", "Enter password"),
			placeholderRepeatPassword: _l.get("signUp.placeholderRepeatPassword", "Repeat password"),
			placeholderCaptcha: _l.get("signUp.placeholderCaptcha", "Enter captcha"),

			labelFirstName: _l.get("signUp.labelFirstName", "First name"),
			labelLastName: _l.get("signUp.labelLastName", "Last name"),
			labelNickName: _l.get("signUp.labelNickName", "Nick name"),
			labelEmail: _l.get("signUp.labelEmail", "Email"),
			labelRepeatEmail: _l.get("signUp.labelRepeatEmail", "Repeat email"),
			labelPassword: _l.get("signUp.labelPassword", "Password"),
			labelRepeatPassword: _l.get("signUp.labelRepeatPassword", "Repeat password"),
			labelCaptcha: _l.get("signUp.labelCaptcha", "Captcha"),

			titleConfirmPasswordCopied: _l.get("signUp.titleConfirmPasswordCopied", "Password copied!"),

			acceptTermsPrivacy: util.format(
				_l.get("signUp.acceptTermsPrivacy", "Accept <a class='link-web' href='%s' target='_blank'>Terms</a> and <a class='link-web' href='%s' target='_blank'>Privacy</a>"),
				"/terms",
				"/privacy"
			),

			formButton: _l.get("signUp.formButton", "Sign up"),

			layout: "backend/views/layouts/layout"
		})
	},

	//  NOTE:  POST SIGN UP
	// ============================================================
	postSignUp: async (req, res) => {
		const sessions = req.session
		const cookies = req.cookies

		let check = false
		let focus = null
		let text = null
		let tokenAccount = null

		const csrfSession = sessions.csrf
		const captchaSession = sessions.captcha

		const { csrfToken, firstName, lastName, nickName, email, repeatEmail, password, repeatPassword, captcha, accept } = req.body

		const findNickName = await usersModel.findOne({ nickName })
		const findEmail = await usersModel.findOne({ repeatEmail })

		if (csrfToken === "") {
			text = _l.get("signUp.checkCsrf", "CSRF protection activated")
		} else if (csrfSession === undefined) {
			text = _l.get("signUp.checkCsrf", "CSRF protection activated")
		} else if (csrfSession === "") {
			text = _l.get("signUp.checkCsrf", "CSRF protection activated")
		} else if (csrfSession !== csrfToken) {
			text = _l.get("signUp.checkCsrf", "CSRF protection activated")
		} else if (firstName === "") {
			focus = "firstName"
			text = _l.get("signUp.checkFirstNameEmpty", "First name is empty")
		} else if (firstName.length < 3) {
			focus = "firstName"
			text = _l.get("signUp.checkFirstNameMin", "First name minimum 3 characters")
		} else if (firstName.length > 20) {
			focus = "firstName"
			text = _l.get("signUp.checkFirstNameMax", "First name maximum 20 characters")
		} else if (firstName.match(func.firstNameValidate)) {
			focus = "firstName"
			text = _l.get("signUp.checkFirstNameChar", "Wrong first name, accepted characters:<p class='text-warning'>a-z</p>")
		} else if (lastName === "") {
			focus = "lastName"
			text = _l.get("signUp.checkLastNameEmpty", "Last name is empty")
		} else if (lastName.length < 3) {
			focus = "lastName"
			text = _l.get("signUp.checkLastNameMin", "Last name minimum 3 characters")
		} else if (lastName.length > 20) {
			focus = "lastName"
			text = _l.get("signUp.checkLastNameMax", "Last name maximum 20 characters")
		} else if (lastName.match(func.lastNameValidate)) {
			focus = "lastName"
			text = _l.get("signUp.checkLastNameChar", "Wrong last name, accepted characters:<p class='text-warning'>a-z</p>")
		} else if (nickName === "") {
			focus = "nickName"
			text = _l.get("signUp.checkNickNameEmpty", "Nick name is empty")
		} else if (nickName.length < 3) {
			focus = "nickName"
			text = _l.get("signUp.checkNickNameMin", "Nick name minimum 3 characters")
		} else if (nickName.length > 20) {
			focus = "nickName"
			text = _l.get("signUp.checkNickNameMax", "Nick name maximum 20 characters")
		} else if (nickName.match(func.nickNameValidate)) {
			focus = "nickName"
			text = _l.get("signUp.checkNickNameChar", "Wrong nick name, accepted characters:<p class='text-warning'>a-z 0-9 - _</p>")
		} else if (nickName !== "admin") {
			focus = "nickName"
			text = _l.get("signUp.checkNickNameAdmin", "Nick name is not admin")
		} else if (findNickName) {
			focus = "nickName"
			text = _l.get("signUp.checkNickNameExist", "Nick name already exists")
		} else if (email === "") {
			focus = "email"
			text = _l.get("signUp.checkEmailEmpty", "Email is empty")
		} else if (email.length < 6) {
			focus = "email"
			text = _l.get("signUp.checkEmailMin", "Email minimum 6 characters")
		} else if (email.length > 100) {
			focus = "email"
			text = _l.get("signUp.checkEmailMax", "Email maximum 100 characters")
		} else if (!func.emailValidate(email)) {
			focus = "email"
			text = _l.get("signUp.checkEmailChar", "Wrong email, example:<p class='text-warning'>name@domain.com</p>")
		} else if (findEmail) {
			focus = "email"
			text = _l.get("signUp.checkEmailExist", "Email already exists")
		} else if (repeatEmail === "") {
			focus = "repeatEmail"
			text = _l.get("signUp.checkRepeatEmailEmpty", "Repeat Email is empty")
		} else if (repeatEmail.length < 6) {
			focus = "repeatEmail"
			text = _l.get("signUp.checkRepeatEmailMin", "Repeat Email minimum 6 characters")
		} else if (repeatEmail.length > 100) {
			focus = "repeatEmail"
			text = _l.get("signUp.checkRepeatEmailMax", "Repeat Email maximum 100 characters")
		} else if (!func.emailValidate(repeatEmail)) {
			focus = "repeatEmail"
			text = _l.get("signUp.checkRepeatEmailChar", "Wrong repeat email, example:<p class='text-warning'>name@domain.com</p>")
		} else if (email !== repeatEmail) {
			focus = "repeatEmail"
			text = _l.get("signUp.checkRepeatEmailCompare", "Email and repeat email do not match")
		} else if (password === "") {
			focus = "password"
			text = _l.get("signUp.checkPasswordEmpty", "Password is empty")
		} else if (password.length < 8) {
			focus = "password"
			text = _l.get("signUp.checkPasswordMin", "Password minimum 8 characters")
		} else if (password.length > 20) {
			focus = "password"
			text = _l.get("signUp.checkPasswordMax", "Password maximum 20 characters")
		} else if (password.match(func.passwordValidate)) {
			focus = "password"
			text = _l.get("signUp.checkPasswordChar", "Wrong password, accepted characters:<p class='text-warning'>a-z A-Z 0-9 @ * # _-</p>")
		} else if (password.search(func.passwordValidateUpperCase) === -1) {
			focus = "password"
			text = _l.get("signUp.checkPasswordUpperCase", "Incorrect password, at least one capital letter")
		} else if (password.search(func.passwordValidateLowerCase) === -1) {
			focus = "password"
			text = _l.get("signUp.checkPasswordLowerCase", "Incorrect password, at least one lowercase letter")
		} else if (password.search(func.passwordValidateNumber) === -1) {
			focus = "password"
			text = _l.get("signUp.checkPasswordNumber", "Incorrect password, at least one number")
		} else if (password.search(func.passwordValidateSpecial) === -1) {
			focus = "password"
			text = _l.get("signUp.checkPasswordSpecial", "Incorrect password, minimum one special character:<p class='text-warning'>* # @ _-</p>")
		} else if (repeatPassword === "") {
			focus = "repeatPassword"
			text = _l.get("signUp.checkRepeatPasswordEmpty", "Repeat password is empty")
		} else if (repeatPassword.length < 8) {
			focus = "repeatPassword"
			text = _l.get("signUp.checkRepeatPasswordMin", "Repeat password at least 8 characters")
		} else if (repeatPassword.length > 20) {
			focus = "repeatPassword"
			text = _l.get("signUp.checkRepeatPasswordMax", "Repeat password maximum 20 characters")
		} else if (repeatPassword.match(func.passwordValidate)) {
			focus = "repeatPassword"
			text = _l.get("signUp.checkRepeatPasswordChar", "Repeat wrong password, characters accepted:<p class='text-warning'>a-z A-Z 0-9 @ * # _-</p>")
		} else if (repeatPassword.search(func.passwordValidateMinUpperCase) === -1) {
			focus = "repeatPassword"
			text = _l.get("signUp.checkRepeatPasswordUpperCase", "Repeat wrong password, at least one capital letter")
		} else if (repeatPassword.search(func.passwordValidateMinLowerCase) === -1) {
			focus = "repeatPassword"
			text = _l.get("signUp.checkRepeatPasswordLowerCase", "Repeat wrong password, at least one lowercase letter")
		} else if (repeatPassword.search(func.passwordValidateNumber) === -1) {
			focus = "repeatPassword"
			text = _l.get("signUp.checkRepeatPasswordNumber", "Repeat wrong password, minimum one number")
		} else if (repeatPassword.search(func.passwordValidateSpecial) === -1) {
			focus = "repeatPassword"
			text = _l.get("signUp.checkRepeatPasswordSpecial", "Repeat wrong password, minimum one special character:<p class='text-warning'>* # @ _-</p>")
		} else if (password !== repeatPassword) {
			focus = "repeatPassword"
			text = _l.get("signUp.checkRepeatPasswordCompare", "Password and repeat password do not match")
		} else if (captcha === "") {
			focus = "captcha"
			text = _l.get("signUp.checkCaptchaEmpty", "Captcha is Empty")
		} else if (captchaSession === undefined) {
			focus = "captcha"
			text = _l.get("signUp.checkCaptchaEmpty", "Captcha is Empty")
		} else if (captchaSession === "") {
			focus = "captcha"
			text = _l.get("signUp.checkCaptchaEmpty", "Captcha is Empty")
		} else if (captcha.length < 7) {
			focus = "captcha"
			text = _l.get("signUp.checkCaptchaMin", "Captcha minimum 7 characters")
		} else if (captcha.length > 7) {
			focus = "captcha"
			text = _l.get("signUp.checkCaptchaMax", "Captcha maximum 7 characters")
		} else if (captcha.match(func.captchaValidate)) {
			focus = "captcha"
			text = _l.get("signUp.checkCaptchaChar", "Wrong captcha, accepted characters:<p class='text-warning'>A-Z 1-9</p>")
		} else if (captchaSession !== captcha) {
			focus = "captcha"
			text = _l.get("signUp.checkCaptchaIncorrect", "Captcha incorrect")
		} else if (Boolean(accept) === false) {
			focus = "accept"
			text = _l.get("signUp.checkAccept", "Accept Terms and privacy")
		} else {
			tokenAccount = `${func.generateRandomAlphanumeric(32)}_${nickName}`
			const tokenTemp = `${func.generateRandomAlphanumeric(6)}_${nickName}`
			const countryClient = geoIpCountry.lookup(await func.getIpPublic).country
			const browserClient = req.useragent.browser
			const versionClient = req.useragent.version
			const platformClient = req.useragent.platform
			const osClient = req.useragent.os
			const currentDate = func.formatDateTime()

			const userNew = new usersModel({
				firstName,
				lastName,
				nickName,
				email: repeatEmail,
				password: bcryptJs.hashSync(repeatPassword, 10),
				role: "admin",
				settings: {
					lang: appLang,
					dark: appDarkName,
					design: appDesign,
					changeColor: appChangeColor,
					toggleMenu: appToggleMenu,
					iconNetwork: appIconNetwork
				},
				tokenAccount,
				tokenTemp,
				acceptTermsPrivacy: true,
				logs: [
					`
					[INFO] [${currentDate}] [${await func.getIpPublic}] [${_l.get("signUp.log", "Account admin created correctly from the panel")}]
					`
				],
				checkSecurity: [
					{
						ip: await func.getIpPublic,
						country: countryClient,
						browser: browserClient,
						version: versionClient,
						platform: platformClient,
						os: osClient
					}
				],
				create: currentDate,
				update: currentDate
			})

			const templateMail = await ejs
				.renderFile(path.join(__dirname, "../../app/backend/views/templates/mails", "confirm.ejs"), {
					mailUrlLogo: app.get("appUrl") + "/assets/img/logo.png",
					mailBodyTitle: _l.get("signUp.mailBodyTitle", "Activation of the account"),
					mailContent: util.format(
						_l.get(
							"signUp.mailContent",
							`
								Hello <b>%s,</b> the account was created successfully.<br><br>
								It is necessary to activate.<br><br>
								Security code:
								<h1>%s</h1>
								Copy and paste code in form activate web.<br><br>
								Creation date: <b>%s</b><br><br>
								If you did not create this account, ignore this message, your email will be removed from our website in the next 48 hours, a thousand apologies.
							`
						),
						func.firstLetterUppercase(nickName),
						func.findSubStr(tokenTemp, 0, 6),
						currentDate
					),
					redSocials: func.getArrayRedSocials("none", app.get("appUrl"), false, "34", "34", cookies.mode_icon_network)
				})
				.then(dataTemplate => {
					return dataTemplate
				})
				.catch(errorTemplate => {
					const message = errorTemplate.message

					text = _l.get("signUp.mailError", "Error sending mail")

					console.log(
						colors.red("["),
						colors.red("ERROR"),
						colors.red("]"),
						colors.green("["),
						colors.green(currentDate),
						colors.green("]"),
						colors.red("["),
						colors.red("Smtp:"),
						colors.yellow(message),
						colors.red("]"),
						colors.red("["),
						colors.red("File:"),
						colors.yellow(`${__file}.${__ext}`),
						colors.red("|"),
						colors.red("Line:"),
						colors.yellow(`${__line}`),
						colors.red("]")
					)
				})

			if (templateMail !== undefined) {
				const mailOptions = {
					from: `"${config.get("app.title")} | ${_l.get("signUp.mailFrom", "Activation of the account")}" <${config.get("smtp.noReply.user")}>`,
					to: email,
					subject: util.format(_l.get("signUp.mailSubject", "Activate your account in: %s"), config.get("app.title")),
					html: templateMail
				}

				await smtpSend("noReply", mailOptions)
					.then(async () => {
						await userNew
							.save()
							.then(async () => {
								await res.cookie(`token_account_${nickName}`, tokenAccount, { maxAge: 365 * 24 * 60 * 60 * 1000 })
								check = true
								text = _l.get("signUp.success", "Account created successfully, it is necessary to activate<br>redirecting in:")
							})
							.catch(errorSave => {
								const message = errorSave.message

								text = _l.get("signUp.errorSave", "Error creating account")

								console.log(
									colors.red("["),
									colors.red("ERROR"),
									colors.red("]"),
									colors.green("["),
									colors.green(currentDate),
									colors.green("]"),
									colors.red("["),
									colors.red("Save DB:"),
									colors.yellow(message),
									colors.red("]"),
									colors.red("["),
									colors.red("File:"),
									colors.yellow(`${__file}.${__ext}`),
									colors.red("|"),
									colors.red("Line:"),
									colors.yellow(`${__line}`),
									colors.red("]")
								)
							})
					})
					.catch(erroMail => {
						const message = erroMail.message

						text = _l.get("signUp.mailError", "Error sending mail")

						console.log(
							colors.red("["),
							colors.red("ERROR"),
							colors.red("]"),
							colors.green("["),
							colors.green(currentDate),
							colors.green("]"),
							colors.red("["),
							colors.red("Smtp:"),
							colors.yellow(message),
							colors.red("]"),
							colors.red("["),
							colors.red("File:"),
							colors.yellow(`${__file}.${__ext}`),
							colors.red("|"),
							colors.red("Line:"),
							colors.yellow(`${__line}`),
							colors.red("]")
						)
					})
			} else {
				text = _l.get("signUp.mailError", "Error sending mail")
			}
		}

		if (check === false) {
			res.json({
				check,
				focus,
				text
			})
		} else {
			res.json({
				check,
				text,
				time: 5,
				redirect: `/panel/activate/${tokenAccount}`
			})
		}
	},

	// NOTE: GET SIGN UP ACTIVATE
	// ============================================================
	getSignUpActivate: async (req, res) => {
		const sessions = req.session

		let check = false
		let text = null

		const { tokenAccount } = req.params

		const findTokenAccount = await usersModel.findOne({ tokenAccount })

		if (sessions.csrf === undefined) {
			sessions.csrf = func.generateRandomAlphanumeric(32)
		}

		if (!findTokenAccount) {
			text = _l.get("securityCode.checkAccountNotFound", "The account does not exist")
		} else if (tokenAccount !== findTokenAccount.get("tokenAccount")) {
			text = _l.get("securityCode.checkAccountNotFound", "The account does not exist")
		} else if (findTokenAccount.get("tokenTemp") === "") {
			text = _l.get("securityCode.errorCode", "Activation error")
		} else if (findTokenAccount.get("activateAccount") === true) {
			text = _l.get("securityCode.accountActivate", "The account is already active")
		} else {
			check = true
		}

		res.render("backend/views/pages/home/securityCode", {
			sessionStatus: sessions.status,
			csrfToken: sessions.csrf,
			check,

			urlFormPost: `/panel/activate/${tokenAccount}`,
			urlReSend: `/panel/activate/resend/${tokenAccount}`,

			appTitleDescription: _l.get("securityCode.appTitleDescription", "Activating account"),

			bodyTitle: _l.get("securityCode.bodyTitle", "Activating account"),
			bodyDescription: _l.get("securityCode.bodyDescription", "We have sent your mail a code, copy and paste on this form to activate your account"),

			placeholderCode: _l.get("securityCode.placeholderCode", "Enter code"),
			placeholderCaptcha: _l.get("securityCode.placeholderCaptcha", "Enter captcha"),

			labelCode: _l.get("securityCode.labelCode", "Code"),
			labelCaptcha: _l.get("securityCode.labelCaptcha", "Captcha"),

			formButton: _l.get("securityCode.formButton", "Activate"),

			infoText: _l.get("securityCode.infoText", "Did not the code come to your email?"),
			infoButton: _l.get("securityCode.infoButton", "Resend code"),

			htmlContent: text,

			layout: "backend/views/layouts/layout"
		})
	},

	// NOTE: POST SIGN UP ACTIVATE
	// ============================================================
	postSignUpActivate: async (req, res) => {
		const sessions = req.session
		const cookies = req.cookies

		let check = false
		let focus = null
		let text = null

		const csrfSession = sessions.csrf
		const captchaSession = sessions.captcha

		const { tokenAccount } = req.params
		const { csrfToken, code, captcha } = req.body

		const findTokenAccount = await usersModel.findOne({ tokenAccount })

		if (csrfToken === "") {
			text = _l.get("securityCode.checkCsrf", "CSRF protection activated")
		} else if (csrfSession === undefined) {
			text = _l.get("securityCode.checkCsrf", "CSRF protection activated")
		} else if (csrfSession === "") {
			text = _l.get("securityCode.checkCsrf", "CSRF protection activated")
		} else if (csrfSession !== csrfToken) {
			text = _l.get("securityCode.checkCsrf", "CSRF protection activated")
		} else if (!findTokenAccount) {
			text = _l.get("securityCode.checkAccountNotFound", "The account does not exist")
		} else if (tokenAccount !== findTokenAccount.get("tokenAccount")) {
			text = _l.get("securityCode.checkAccountNotFound", "The account does not exist")
		} else if (findTokenAccount.get("activateAccount") === true) {
			text = _l.get("securityCode.accountActivate", "The account is already active")
		} else if (code === "") {
			focus = "code"
			text = _l.get("securityCode.checkCodeEmpty", "Code is empty")
		} else if (code.length < 6) {
			focus = "code"
			text = _l.get("securityCode.checkCodeMin", "Code minimum 6 characters")
		} else if (code.length > 6) {
			focus = "code"
			text = _l.get("securityCode.checkCodeMax", "Code maximum 6 characters")
		} else if (code.match(func.codeValidate)) {
			focus = "code"
			text = _l.get("securityCode.checkCodeChar", "Wrong code, accepted characters:<p class='text-warning'>a-z A-Z 0-9</p>")
		} else if (captcha === "") {
			focus = "captcha"
			text = _l.get("securityCode.checkCaptchaEmpty", "Captcha is Empty")
		} else if (captchaSession === undefined) {
			focus = "captcha"
			text = _l.get("securityCode.checkCaptchaEmpty", "Captcha is Empty")
		} else if (captchaSession === "") {
			focus = "captcha"
			text = _l.get("securityCode.checkCaptchaEmpty", "Captcha is Empty")
		} else if (captcha.length < 7) {
			focus = "captcha"
			text = _l.get("securityCode.checkCaptchaMin", "Captcha minimum 7 characters")
		} else if (captcha.length > 7) {
			focus = "captcha"
			text = _l.get("securityCode.checkCaptchaMax", "Captcha maximum 7 characters")
		} else if (captcha.match(func.captchaValidate)) {
			focus = "captcha"
			text = _l.get("securityCode.checkCaptchaChar", "Wrong captcha, accepted characters:<p class='text-warning'>A-Z 1-9</p>")
		} else if (captchaSession !== captcha) {
			focus = "captcha"
			text = _l.get("securityCode.checkCaptchaIncorrect", "Captcha incorrect")
		} else if (code !== func.findSubStr(findTokenAccount.get("tokenTemp"), 0, 6)) {
			focus = "code"
			text = _l.get("securityCode.checkCodeNotFound", "Code incorrect")
		} else {
			const nickName = findTokenAccount.get("nickName")
			const email = findTokenAccount.get("email")
			const currentDate = func.formatDateTime()

			const templateMail = await ejs
				.renderFile(path.join(__dirname, "../../app/backend/views/templates/mails", "confirm.ejs"), {
					mailUrlLogo: app.get("appUrl") + "/assets/img/logo.png",
					mailBodyTitle: _l.get("securityCode.mailBodyTitle", "Activated account"),
					mailContent: util.format(
						_l.get(
							"securityCode.mailContent",
							`
								Hello <b>%s,</b> the account was activated successfully.<br><br>
								Panel link:<br><br>
								<a class="template-button" href="%s" target="_blank"><span><b>PANEL</b></span></a><br><br>
								Activation date: <b>%s</b><br><br>
								If you did not create this account, ignore this message, your email will be removed from our website in the next 48 hours, a thousand apologies.
							`
						),
						func.firstLetterUppercase(nickName),
						`${app.get("appUrl")}/panel`,
						currentDate
					),
					redSocials: func.getArrayRedSocials("none", app.get("appUrl"), false, "34", "34", cookies.mode_icon_network)
				})
				.then(dataTemplate => {
					return dataTemplate
				})
				.catch(errorTemplate => {
					const message = errorTemplate.message

					text = _l.get("securityCode.mailError", "Error sending mail")

					console.log(
						colors.red("["),
						colors.red("ERROR"),
						colors.red("]"),
						colors.green("["),
						colors.green(currentDate),
						colors.green("]"),
						colors.red("["),
						colors.red("Smtp:"),
						colors.yellow(message),
						colors.red("]"),
						colors.red("["),
						colors.red("File:"),
						colors.yellow(`${__file}.${__ext}`),
						colors.red("|"),
						colors.red("Line:"),
						colors.yellow(`${__line}`),
						colors.red("]")
					)
				})

			if (templateMail !== undefined) {
				const mailOptions = {
					from: `"${config.get("app.title")} | ${_l.get("securityCode.mailFrom", "Activated account")}" <${config.get("smtp.noReply.user")}>`,
					to: email,
					subject: util.format(_l.get("securityCode.mailSubject", "Account successfully activated in: %s"), config.get("app.title")),
					html: templateMail
				}

				await smtpSend("noReply", mailOptions)
					.then(async () => {
						await usersModel
							.updateOne(
								{ tokenAccount },
								{
									tokenTemp: "",
									activateAccount: true,
									update: currentDate,
									$push: {
										logs: [
											`
												[INFO] [${currentDate}] [${await func.getIpPublic}] [${_l.get("securityCode.log", "Account admin activated correctly from the panel")}]
											`
										]
									}
								}
							)
							.then(() => {
								check = true
								text = _l.get("securityCode.success", "Activated account successfully<br>redirecting in:")
							})
							.catch(errorUpdate => {
								const message = errorUpdate.message

								text = _l.get("securityCode.errorUpdate", "Error updating account")

								console.log(
									colors.red("["),
									colors.red("ERROR"),
									colors.red("]"),
									colors.green("["),
									colors.green(currentDate),
									colors.green("]"),
									colors.red("["),
									colors.red("Updating DB:"),
									colors.yellow(message),
									colors.red("]"),
									colors.red("["),
									colors.red("File:"),
									colors.yellow(`${__file}.${__ext}`),
									colors.red("|"),
									colors.red("Line:"),
									colors.yellow(`${__line}`),
									colors.red("]")
								)
							})
					})
					.catch(erroMail => {
						const message = erroMail.message

						text = _l.get("securityCode.mailError", "Error sending mail")

						console.log(
							colors.red("["),
							colors.red("ERROR"),
							colors.red("]"),
							colors.green("["),
							colors.green(currentDate),
							colors.green("]"),
							colors.red("["),
							colors.red("Smtp:"),
							colors.yellow(message),
							colors.red("]"),
							colors.red("["),
							colors.red("File:"),
							colors.yellow(`${__file}.${__ext}`),
							colors.red("|"),
							colors.red("Line:"),
							colors.yellow(`${__line}`),
							colors.red("]")
						)
					})
			} else {
				text = _l.get("securityCode.mailError", "Error sending mail")
			}
		}

		if (check === false) {
			res.json({
				check,
				focus,
				text
			})
		} else {
			res.json({
				check,
				text,
				time: 5,
				redirect: "/panel/login"
			})
		}
	},

	// NOTE: POST SIGN UP ACTIVATE RESEND
	// ============================================================
	postSignUpActivateReSend: async (req, res) => {
		const sessions = req.session
		const cookies = req.cookies

		let check = false
		let time = null

		const csrfSession = sessions.csrf
		const { tokenAccount } = req.params
		const { csrfToken } = req.body

		const findTokenAccount = await usersModel.findOne({ tokenAccount })

		if (csrfToken === "") {
			check = false
		} else if (csrfSession === undefined) {
			check = false
		} else if (csrfSession === "") {
			check = false
		} else if (csrfSession !== csrfToken) {
			check = false
		} else if (!findTokenAccount) {
			check = false
		} else if (findTokenAccount.get("tokenTemp") === "") {
			check = false
		} else if (findTokenAccount.get("activateAccount") === true) {
			check = false
		} else {
			const nickName = findTokenAccount.get("nickName")

			const email = findTokenAccount.get("email")
			const tokenTemp = findTokenAccount.get("tokenTemp")
			const currentDate = func.formatDateTime()

			const templateMail = await ejs
				.renderFile(path.join(__dirname, "../../app/backend/views/templates/mails", "confirm.ejs"), {
					mailUrlLogo: app.get("appUrl") + "/assets/img/logo.png",
					mailBodyTitle: _l.get("signUp.mailBodyTitle", "Activation of the account"),
					mailContent: util.format(
						_l.get(
							"signUp.mailContent",
							`
								Hello <b>%s,</b> the account was created successfully.<br><br>
								It is necessary to activate.<br><br>
								Security code:
								<h1>%s</h1>
								Copy and paste code in form activate web.<br><br>
								Creation date: <b>%s</b><br><br>
								If you did not create this account, ignore this message, your email will be removed from our website in the next 48 hours, a thousand apologies.
							`
						),
						func.firstLetterUppercase(nickName),
						func.findSubStr(tokenTemp, 0, 6),
						currentDate
					),
					redSocials: func.getArrayRedSocials("none", app.get("appUrl"), false, "34", "34", cookies.mode_icon_network)
				})
				.then(dataTemplate => {
					return dataTemplate
				})
				.catch(errorTemplate => {
					const message = errorTemplate.message

					console.log(
						colors.red("["),
						colors.red("ERROR"),
						colors.red("]"),
						colors.green("["),
						colors.green(currentDate),
						colors.green("]"),
						colors.red("["),
						colors.red("Smtp:"),
						colors.yellow(message),
						colors.red("]"),
						colors.red("["),
						colors.red("File:"),
						colors.yellow(`${__file}.${__ext}`),
						colors.red("|"),
						colors.red("Line:"),
						colors.yellow(`${__line}`),
						colors.red("]")
					)
				})

			if (templateMail !== undefined) {
				const mailOptions = {
					from: `"${config.get("app.title")} | ${_l.get("signUp.mailFrom", "Activation of the account")}" <${config.get("smtp.noReply.user")}>`,
					to: email,
					subject: util.format(_l.get("signUp.mailSubject", "Activate your account in: %s"), config.get("app.title")),
					html: templateMail
				}

				await smtpSend("noReply", mailOptions)
					.then(() => {
						check = true
						time = 60
					})
					.catch(erroMail => {
						const message = erroMail.message

						check = false

						console.log(
							colors.red("["),
							colors.red("ERROR"),
							colors.red("]"),
							colors.green("["),
							colors.green(currentDate),
							colors.green("]"),
							colors.red("["),
							colors.red("Smtp:"),
							colors.yellow(message),
							colors.red("]"),
							colors.red("["),
							colors.red("File:"),
							colors.yellow(`${__file}.${__ext}`),
							colors.red("|"),
							colors.red("Line:"),
							colors.yellow(`${__line}`),
							colors.red("]")
						)
					})
			} else {
				check = false

				console.log(
					colors.red("["),
					colors.red("ERROR"),
					colors.red("]"),
					colors.green("["),
					colors.green(currentDate),
					colors.green("]"),
					colors.red("["),
					colors.red("Smtp:"),
					colors.yellow(_l.get("securityCode.mailError", "Error sending mail")),
					colors.red("]"),
					colors.red("["),
					colors.red("File:"),
					colors.yellow(`${__file}.${__ext}`),
					colors.red("|"),
					colors.red("Line:"),
					colors.yellow(`${__line}`),
					colors.red("]")
				)
			}
		}

		res.json({
			check,
			time
		})
	},

	//  NOTE:  GET LOG IN
	// ============================================================
	getLogIn: (req, res) => {
		const sessions = req.session

		if (sessions.csrf === undefined) {
			sessions.csrf = func.generateRandomAlphanumeric(32)
		}

		res.render("backend/views/pages/home/logIn", {
			sessionStatus: sessions.status,
			csrfToken: sessions.csrf,

			urlFormPost: "/panel/login",

			appTitleDescription: _l.get("logIn.appTitleDescription", "Log in"),

			bodyTitle: _l.get("logIn.bodyTitle", "Log in"),
			bodyDescription: _l.get("logIn.bodyDescription", "Log in, so you can manage the web"),

			placeholderEmail: _l.get("logIn.placeholderEmail", "Enter email"),
			placeholderPassword: _l.get("logIn.placeholderPassword", "Enter password"),
			placeholderCaptcha: _l.get("logIn.placeholderCaptcha", "Enter captcha"),

			labelEmail: _l.get("logIn.labelEmail", "Email"),
			labelPassword: _l.get("logIn.labelPassword", "Password"),
			labelCaptcha: _l.get("logIn.labelCaptcha", "Captcha"),

			rememberMe: _l.get("logIn.rememberMe", "Remember me"),

			formButton: _l.get("logIn.formButton", "Log in"),

			infoTermsPrivacyRecovery: util.format(
				_l.get(
					"logIn.infoTermsPrivacyRecovery",
					"By logging in you accept our <a class='link-web' href='%s' target='_blank'>Terms</a> and <a class='link-web' href='%s' target='_blank'>Privacy</a><br><br><a class='link-web' href='%s'>Forgot your password?</a>"
				),
				"/terms",
				"/privacy",
				"/panel/recovery"
			),

			layout: "backend/views/layouts/layout"
		})
	},

	//  NOTE:  POST LOG IN
	// ============================================================
	postLogIn: async (req, res) => {
		const sessions = req.session
		const cookies = req.cookies

		let check = false
		let focus = null
		let text = null
		let redirect = null

		const csrfSession = sessions.csrf
		const captchaSession = sessions.captcha

		const { csrfToken, email, password, captcha, rememberMe } = req.body

		const findEmail = await usersModel.findOne({ email })

		if (csrfToken === "") {
			text = _l.get("logIn.checkCsrf", "CSRF protection activated")
		} else if (csrfSession === undefined) {
			text = _l.get("logIn.checkCsrf", "CSRF protection activated")
		} else if (csrfSession === "") {
			text = _l.get("logIn.checkCsrf", "CSRF protection activated")
		} else if (csrfSession !== csrfToken) {
			text = _l.get("logIn.checkCsrf", "CSRF protection activated")
		} else if (email === "") {
			focus = "email"
			text = _l.get("logIn.checkEmailEmpty", "Email is empty")
		} else if (email.length < 6) {
			focus = "email"
			text = _l.get("logIn.checkEmailMin", "Email minimum 6 characters")
		} else if (email.length > 100) {
			focus = "email"
			text = _l.get("logIn.checkEmailMax", "Email maximum 100 characters")
		} else if (!func.emailValidate(email)) {
			focus = "email"
			text = _l.get("logIn.checkEmailChar", "Wrong email, example:<p class='text-warning'>name@domain.com</p>")
		} else if (password === "") {
			focus = "password"
			text = _l.get("logIn.checkPasswordEmpty", "Password is empty")
		} else if (password.length < 8) {
			focus = "password"
			text = _l.get("logIn.checkPasswordMin", "Password minimum 8 characters")
		} else if (password.length > 20) {
			focus = "password"
			text = _l.get("logIn.checkPasswordMax", "Password maximum 20 characters")
		} else if (password.match(func.passwordValidate)) {
			focus = "password"
			text = _l.get("logIn.checkPasswordChar", "Wrong password, accepted characters:<p class='text-warning'>a-z A-Z 0-9 @ * # _-</p>")
		} else if (password.search(func.passwordValidateUpperCase) === -1) {
			focus = "password"
			text = _l.get("logIn.checkPasswordUpperCase", "Incorrect password, at least one capital letter")
		} else if (password.search(func.passwordValidateLowerCase) === -1) {
			focus = "password"
			text = _l.get("logIn.checkPasswordLowerCase", "Incorrect password, at least one lowercase letter")
		} else if (password.search(func.passwordValidateNumber) === -1) {
			focus = "password"
			text = _l.get("logIn.checkPasswordNumber", "Incorrect password, at least one number")
		} else if (password.search(func.passwordValidateSpecial) === -1) {
			focus = "password"
			text = _l.get("logIn.checkPasswordSpecial", "Incorrect password, minimum one special character:<p class='text-warning'>* # @ _-</p>")
		} else if (captcha === "") {
			focus = "captcha"
			text = _l.get("logIn.checkCaptchaEmpty", "Captcha is Empty")
		} else if (captchaSession === undefined) {
			focus = "captcha"
			text = _l.get("logIn.checkCaptchaEmpty", "Captcha is Empty")
		} else if (captchaSession === "") {
			focus = "captcha"
			text = _l.get("logIn.checkCaptchaEmpty", "Captcha is Empty")
		} else if (captcha.length < 7) {
			focus = "captcha"
			text = _l.get("logIn.checkCaptchaMin", "Captcha minimum 7 characters")
		} else if (captcha.length > 7) {
			focus = "captcha"
			text = _l.get("logIn.checkCaptchaMax", "Captcha maximum 7 characters")
		} else if (captcha.match(func.captchaValidate)) {
			focus = "captcha"
			text = _l.get("logIn.checkCaptchaChar", "Wrong captcha, accepted characters:<p class='text-warning'>A-Z 1-9</p>")
		} else if (captchaSession !== captcha) {
			focus = "captcha"
			text = _l.get("logIn.checkCaptchaIncorrect", "Captcha incorrect")
		} else if (!findEmail) {
			text = _l.get("logIn.checkAccount", "Account incorrect")
		} else if (!bcryptJs.compareSync(password, findEmail.get("password"))) {
			text = _l.get("logIn.checkAccount", "Account incorrect")
		} else if (findEmail.get("role") !== "admin" && findEmail.get("role") !== "instructor") {
			text = _l.get("logIn.checkPrivilege", "Your account does not have privileges to connect in the panel")
		} else if (findEmail.get("banned") === true) {
			text = util.format(
				_l.get(
					"logIn.checkBanned",
					"Your account is blocked for violating the: <a class='link-warning' href='%s' target='_blank'>Terms</a> and <a class='link-warning' href='%s' target='_blank'>Privacy</a> of this website, click here to appeal: <a class='link-warning' href='%s' target='_blank'>Contact</a>"
				),
				"/terms",
				"/privacy",
				"/contact"
			)
		} else if (findEmail.get("activateAccount") === false) {
			text = util.format(
				_l.get("logIn.checkActivateAccount", "Your account is not active, click here: <a class='link-warning' href='%s'>Activate</a>"),
				`/panel/activate/${findEmail.get("tokenAccount")}`
			)
		} else {
			const id = findEmail.get("_id")
			const nickName = findEmail.get("nickName")
			const tokenAccount = findEmail.get("tokenAccount")
			const tokenTempDB = findEmail.get("tokenTemp")
			const tokenTempNew = `${func.generateRandomAlphanumeric(6)}_${nickName}`
			const currentDate = func.formatDateTime()

			if (tokenAccount !== cookies[`token_account_${nickName}`]) {
				if (tokenTempDB === null || tokenTempDB === undefined || tokenTempDB === "") {
					const templateMail = await ejs
						.renderFile(path.join(__dirname, "../../app/backend/views/templates/mails", "confirm.ejs"), {
							mailUrlLogo: app.get("appUrl") + "/assets/img/logo.png",
							mailBodyTitle: _l.get("logIn.mailBodyTitle", "Verification of the account"),
							mailContent: util.format(
								_l.get(
									"logIn.mailContent",
									`
								Hello <b>%s,</b> we must verify that you are.<br><br>
								Security code:
								<h1>%s</h1>
								Copy and paste code in form verify web.<br><br>
								Verification date: <b>%s</b><br><br>
								If you did not create this account, ignore this message, your email will be removed from our website in the next 48 hours, a thousand apologies.
							`
								),
								func.firstLetterUppercase(nickName),
								func.findSubStr(tokenTempNew, 0, 6),
								currentDate
							),
							redSocials: func.getArrayRedSocials("none", app.get("appUrl"), false, "34", "34", cookies.mode_icon_network)
						})
						.then(dataTemplate => {
							return dataTemplate
						})
						.catch(errorTemplate => {
							const message = errorTemplate.message

							text = _l.get("logIn.mailError", "Error sending mail")

							console.log(
								colors.red("["),
								colors.red("ERROR"),
								colors.red("]"),
								colors.green("["),
								colors.green(currentDate),
								colors.green("]"),
								colors.red("["),
								colors.red("Smtp:"),
								colors.yellow(message),
								colors.red("]"),
								colors.red("["),
								colors.red("File:"),
								colors.yellow(`${__file}.${__ext}`),
								colors.red("|"),
								colors.red("Line:"),
								colors.yellow(`${__line}`),
								colors.red("]")
							)
						})

					if (templateMail !== undefined) {
						const mailOptions = {
							from: `"${config.get("app.title")} | ${_l.get("logIn.mailFrom", "Verification of the account")}" <${config.get("smtp.noReply.user")}>`,
							to: email,
							subject: util.format(_l.get("logIn.mailSubject", "Verifying account in: %s"), config.get("app.title")),
							html: templateMail
						}

						await smtpSend("noReply", mailOptions)
							.then(async () => {
								await usersModel
									.updateOne(
										{ email: email },
										{
											tokenTemp: tokenTempNew,
											update: currentDate,
											$push: {
												logs: [
													`
												[INFO] [${currentDate}] [${await func.getIpPublic}] [${_l.get("logIn.log", "Verifying the account from the panel")}]
												`
												]
											}
										}
									)
									.then(() => {
										text = util.format(
											_l.get("logIn.verify", "You are logging in from another device, click here: <a class='link-warning' href='%s'>Verify</a>"),
											`/panel/login/verify/${tokenAccount}`
										)
									})
									.catch(errorUpdate => {
										const message = errorUpdate.message

										text = _l.get("logIn.errorUpdate", "Error updating account")

										console.log(
											colors.red("["),
											colors.red("ERROR"),
											colors.red("]"),
											colors.green("["),
											colors.green(currentDate),
											colors.green("]"),
											colors.red("["),
											colors.red("Updating DB:"),
											colors.yellow(message),
											colors.red("]"),
											colors.red("["),
											colors.red("File:"),
											colors.yellow(`${__file}.${__ext}`),
											colors.red("|"),
											colors.red("Line:"),
											colors.yellow(`${__line}`),
											colors.red("]")
										)
									})
							})
							.catch(erroMail => {
								const message = erroMail.message

								text = _l.get("logIn.mailError", "Error sending mail")

								console.log(
									colors.red("["),
									colors.red("ERROR"),
									colors.red("]"),
									colors.green("["),
									colors.green(currentDate),
									colors.green("]"),
									colors.red("["),
									colors.red("Smtp:"),
									colors.yellow(message),
									colors.red("]"),
									colors.red("["),
									colors.red("File:"),
									colors.yellow(`${__file}.${__ext}`),
									colors.red("|"),
									colors.red("Line:"),
									colors.yellow(`${__line}`),
									colors.red("]")
								)
							})
					} else {
						text = _l.get("logIn.mailError", "Error sending mail")
					}
				}
				{
					text = util.format(
						_l.get("logIn.verify", "You are logging in from another device, click here: <a class='link-warning' href='%s'>Verify</a>"),
						`/panel/login/verify/${tokenAccount}`
					)
				}
			} else {
				if (tokenTempDB) {
					await usersModel
						.updateOne(
							{ email: email },
							{
								tokenTemp: "",
								update: currentDate,
								$push: {
									logs: [
										`
											[INFO] [${currentDate}] [${await func.getIpPublic}] [${_l.get("logIn.logTokenTemp", "tokenTemp deleted correctly from the panel")}]
										`
									]
								}
							}
						)
						.catch(errorUpdate => {
							const message = errorUpdate.message

							text = _l.get("logIn.errorUpdate", "Error updating account")

							console.log(
								colors.red("["),
								colors.red("ERROR"),
								colors.red("]"),
								colors.green("["),
								colors.green(func.formatDateTime()),
								colors.green("]"),
								colors.red("["),
								colors.red("Updating DB:"),
								colors.yellow(message),
								colors.red("]"),
								colors.red("["),
								colors.red("File:"),
								colors.yellow(`${__file}.${__ext}`),
								colors.red("|"),
								colors.red("Line:"),
								colors.yellow(`${__line}`),
								colors.red("]")
							)
						})
				}

				sessions.status = "on"
				sessions.id = id
				sessions.mode_lang = findEmail.get("settings.lang")
				sessions.mode_dark = findEmail.get("settings.dark")
				sessions.mode_design = findEmail.get("settings.design")
				sessions.mode_icon_network = findEmail.get("settings.iconNetwork")
				sessions.mode_change_color = findEmail.get("settings.changeColor")
				sessions.mode_toggle_menu = findEmail.get("settings.toggleMenu")

				if (Boolean(rememberMe) === true) {
					req.sessionOptions.maxAge = 30 * 24 * 60 * 60 * 1000
				}

				check = true
				text = _l.get("logIn.success", "Log in success<br>redirecting in:")

				if (cookies.page_back !== null && cookies.page_back !== undefined && cookies.page_back !== "") {
					redirect = cookies.page_back
					res.clearCookie("page_back")
				} else {
					redirect = "/panel"
				}
			}
		}

		if (check === false) {
			res.json({
				check,
				focus,
				text
			})
		} else {
			res.json({
				check,
				text,
				time: 5,
				redirect
			})
		}
	},

	// NOTE: GET LOG IN VERIFY
	// ============================================================
	getLogInVerify: async (req, res) => {
		const sessions = req.session

		let check = false
		let text = null

		const { tokenAccount } = req.params

		const findTokenAccount = await usersModel.findOne({ tokenAccount })

		if (sessions.csrf === undefined) {
			sessions.csrf = func.generateRandomAlphanumeric(32)
		}

		if (!findTokenAccount) {
			text = _l.get("securityCode.checkAccountNotFound", "The account does not exist")
		} else if (tokenAccount !== findTokenAccount.get("tokenAccount")) {
			text = _l.get("securityCode.checkAccountNotFound", "The account does not exist")
		} else if (findTokenAccount.get("tokenTemp") === "") {
			text = _l.get("securityCode.errorCodeVerify", "Verification error")
		} else {
			check = true
		}

		res.render("backend/views/pages/home/securityCode", {
			sessionStatus: sessions.status,
			csrfToken: sessions.csrf,
			check,

			urlFormPost: `/panel/login/verify/${tokenAccount}`,
			urlReSend: `/panel/login/verify/resend/${tokenAccount}`,

			appTitleDescription: _l.get("securityCode.appTitleDescriptionVerify", "Verifying account"),

			bodyTitle: _l.get("securityCode.bodyTitleVerify", "Verifying account"),
			bodyDescription: _l.get("securityCode.bodyDescriptionVerify", "We have sent your mail a code, copy and paste on this form to verify your account"),

			placeholderCode: _l.get("securityCode.placeholderCode", "Enter code"),
			placeholderCaptcha: _l.get("securityCode.placeholderCaptcha", "Enter captcha"),

			labelCode: _l.get("securityCode.labelCode", "Code"),
			labelCaptcha: _l.get("securityCode.labelCaptcha", "Captcha"),

			formButton: _l.get("securityCode.formButtonVerify", "Verify"),

			infoText: _l.get("securityCode.infoText", "Did not the code come to your email?"),
			infoButton: _l.get("securityCode.infoButton", "Resend code"),

			htmlContent: text,

			layout: "backend/views/layouts/layout"
		})
	},

	// NOTE: POST LOG IN VERIFY
	// ============================================================
	postLogInVerify: async (req, res) => {
		const sessions = req.session
		const cookies = req.cookies

		let check = false
		let focus = null
		let text = null

		const csrfSession = sessions.csrf
		const captchaSession = sessions.captcha

		const { tokenAccount } = req.params
		const { csrfToken, code, captcha } = req.body

		const findTokenAccount = await usersModel.findOne({ tokenAccount })

		if (csrfToken === "") {
			text = _l.get("securityCode.checkCsrf", "CSRF protection activated")
		} else if (csrfSession === undefined) {
			text = _l.get("securityCode.checkCsrf", "CSRF protection activated")
		} else if (csrfSession === "") {
			text = _l.get("securityCode.checkCsrf", "CSRF protection activated")
		} else if (csrfSession !== csrfToken) {
			text = _l.get("securityCode.checkCsrf", "CSRF protection activated")
		} else if (!findTokenAccount) {
			text = _l.get("securityCode.checkAccountNotFound", "The account does not exist")
		} else if (tokenAccount !== findTokenAccount.get("tokenAccount")) {
			text = _l.get("securityCode.checkAccountNotFound", "The account does not exist")
		} else if (code === "") {
			focus = "code"
			text = _l.get("securityCode.checkCodeEmpty", "Code is empty")
		} else if (code.length < 6) {
			focus = "code"
			text = _l.get("securityCode.checkCodeMin", "Code minimum 6 characters")
		} else if (code.length > 6) {
			focus = "code"
			text = _l.get("securityCode.checkCodeMax", "Code maximum 6 characters")
		} else if (code.match(func.codeValidate)) {
			focus = "code"
			text = _l.get("securityCode.checkCodeChar", "Wrong code, accepted characters:<p class='text-warning'>a-z A-Z 0-9</p>")
		} else if (captcha === "") {
			focus = "captcha"
			text = _l.get("securityCode.checkCaptchaEmpty", "Captcha is Empty")
		} else if (captchaSession === undefined) {
			focus = "captcha"
			text = _l.get("securityCode.checkCaptchaEmpty", "Captcha is Empty")
		} else if (captchaSession === "") {
			focus = "captcha"
			text = _l.get("securityCode.checkCaptchaEmpty", "Captcha is Empty")
		} else if (captcha.length < 7) {
			focus = "captcha"
			text = _l.get("securityCode.checkCaptchaMin", "Captcha minimum 7 characters")
		} else if (captcha.length > 7) {
			focus = "captcha"
			text = _l.get("securityCode.checkCaptchaMax", "Captcha maximum 7 characters")
		} else if (captcha.match(func.captchaValidate)) {
			focus = "captcha"
			text = _l.get("securityCode.checkCaptchaChar", "Wrong captcha, accepted characters:<p class='text-warning'>A-Z 1-9</p>")
		} else if (captchaSession !== captcha) {
			focus = "captcha"
			text = _l.get("securityCode.checkCaptchaIncorrect", "Captcha incorrect")
		} else if (code !== func.findSubStr(findTokenAccount.get("tokenTemp"), 0, 6)) {
			focus = "code"
			text = _l.get("securityCode.checkCodeNotFound", "Code incorrect")
		} else {
			const nickName = findTokenAccount.get("nickName")
			const email = findTokenAccount.get("email")
			const currentDate = func.formatDateTime()

			const countryClient = geoIpCountry.lookup(await func.getIpPublic).country
			const browserClient = req.useragent.browser
			const versionClient = req.useragent.version
			const platformClient = req.useragent.platform
			const osClient = req.useragent.os

			const templateMail = await ejs
				.renderFile(path.join(__dirname, "../../app/backend/views/templates/mails", "confirm.ejs"), {
					mailUrlLogo: app.get("appUrl") + "/assets/img/logo.png",
					mailBodyTitle: _l.get("securityCode.mailBodyTitleVerify", "Verified account"),
					mailContent: util.format(
						_l.get(
							"securityCode.mailContentVerify",
							`
								Hello <b>%s,</b> the account was successfully verified.<br><br>
								Panel link:<br><br>
								<a class="template-button" href="%s" target="_blank"><span><b>PANEL</b></span></a><br><br>
								Verification date: <b>%s</b><br><br>
								If you did not create this account, ignore this message, your email will be removed from our website in the next 48 hours, a thousand apologies.
							`
						),
						func.firstLetterUppercase(nickName),
						`${app.get("appUrl")}/panel`,
						currentDate
					),

					redSocials: func.getArrayRedSocials("none", app.get("appUrl"), false, "34", "34", cookies.mode_icon_network)
				})
				.then(dataTemplate => {
					return dataTemplate
				})
				.catch(errorTemplate => {
					const message = errorTemplate.message

					text = _l.get("securityCode.mailError", "Error sending mail")

					console.log(
						colors.red("["),
						colors.red("ERROR"),
						colors.red("]"),
						colors.green("["),
						colors.green(currentDate),
						colors.green("]"),
						colors.red("["),
						colors.red("Smtp:"),
						colors.yellow(message),
						colors.red("]"),
						colors.red("["),
						colors.red("File:"),
						colors.yellow(`${__file}.${__ext}`),
						colors.red("|"),
						colors.red("Line:"),
						colors.yellow(`${__line}`),
						colors.red("]")
					)
				})

			if (templateMail !== undefined) {
				const mailOptions = {
					from: `"${config.get("app.title")} | ${_l.get("securityCode.mailFromVerify", "Verified account")}" <${config.get("smtp.noReply.user")}>`,
					to: email,
					subject: util.format(_l.get("securityCode.mailSubjectVerify", "Account was successfully verified in: %s"), config.get("app.title")),
					html: templateMail
				}

				await smtpSend("noReply", mailOptions)
					.then(async () => {
						await usersModel
							.updateOne(
								{ tokenAccount },
								{
									tokenTemp: "",

									update: currentDate,
									$push: {
										logs: [
											`
												[INFO] [${currentDate}] [${await func.getIpPublic}] [${_l.get("securityCode.logVerify", "Account verified correctly from the panel")}]
											`
										],
										checkSecurity: [
											{
												ip: await func.getIpPublic,
												country: countryClient,
												browser: browserClient,
												version: versionClient,
												platform: platformClient,
												os: osClient
											}
										]
									}
								}
							)
							.then(async () => {
								await res.cookie(`token_account_${nickName}`, tokenAccount, { maxAge: 365 * 24 * 60 * 60 * 1000 })
								check = true
								text = _l.get("securityCode.successVerify", "Account was successfully verified<br>redirecting in:")
							})
							.catch(errorUpdate => {
								const message = errorUpdate.message

								text = _l.get("securityCode.errorUpdate", "Error updating account")

								console.log(
									colors.red("["),
									colors.red("ERROR"),
									colors.red("]"),
									colors.green("["),
									colors.green(currentDate),
									colors.green("]"),
									colors.red("["),
									colors.red("Updating DB:"),
									colors.yellow(message),
									colors.red("]"),
									colors.red("["),
									colors.red("File:"),
									colors.yellow(`${__file}.${__ext}`),
									colors.red("|"),
									colors.red("Line:"),
									colors.yellow(`${__line}`),
									colors.red("]")
								)
							})
					})
					.catch(erroMail => {
						const message = erroMail.message

						text = _l.get("securityCode.mailError", "Error sending mail")

						console.log(
							colors.red("["),
							colors.red("ERROR"),
							colors.red("]"),
							colors.green("["),
							colors.green(currentDate),
							colors.green("]"),
							colors.red("["),
							colors.red("Smtp:"),
							colors.yellow(message),
							colors.red("]"),
							colors.red("["),
							colors.red("File:"),
							colors.yellow(`${__file}.${__ext}`),
							colors.red("|"),
							colors.red("Line:"),
							colors.yellow(`${__line}`),
							colors.red("]")
						)
					})
			} else {
				text = _l.get("securityCode.mailError", "Error sending mail")
			}
		}

		if (check === false) {
			res.json({
				check,
				focus,
				text
			})
		} else {
			res.json({
				check,
				text,
				time: 5,
				redirect: "/panel/login"
			})
		}
	},

	// NOTE: POST LOG IN VERIFY RESEND
	// ============================================================
	postLogInVerifyReSend: async (req, res) => {
		const sessions = req.session
		const cookies = req.cookies

		let check = false
		let time = null

		const csrfSession = sessions.csrf
		const { tokenAccount } = req.params
		const { csrfToken } = req.body

		const findTokenAccount = await usersModel.findOne({ tokenAccount })

		if (csrfToken === "") {
			check = false
		} else if (csrfSession === undefined) {
			check = false
		} else if (csrfSession === "") {
			check = false
		} else if (csrfSession !== csrfToken) {
			check = false
		} else if (!findTokenAccount) {
			check = false
		} else if (findTokenAccount.get("tokenTemp") === "") {
			check = false
		} else {
			const nickName = findTokenAccount.get("nickName")

			const email = findTokenAccount.get("email")
			const tokenTemp = findTokenAccount.get("tokenTemp")
			const currentDate = func.formatDateTime()

			const templateMail = await ejs
				.renderFile(path.join(__dirname, "../../app/backend/views/templates/mails", "confirm.ejs"), {
					mailUrlLogo: app.get("appUrl") + "/assets/img/logo.png",
					mailBodyTitle: _l.get("logIn.mailBodyTitle", "Verification of the account"),
					mailContent: util.format(
						_l.get(
							"logIn.mailContent",
							`
								Hello <b>%s,</b> we must verify that you are.<br><br>
								Security code:
								<h1>%s</h1>
								Copy and paste code in form verify web.<br><br>
								Verification date: <b>%s</b><br><br>
								If you did not create this account, ignore this message, your email will be removed from our website in the next 48 hours, a thousand apologies.
							`
						),
						func.firstLetterUppercase(nickName),
						func.findSubStr(tokenTemp, 0, 6),
						currentDate
					),
					redSocials: func.getArrayRedSocials("none", app.get("appUrl"), false, "34", "34", cookies.mode_icon_network)
				})
				.then(dataTemplate => {
					return dataTemplate
				})
				.catch(errorTemplate => {
					const message = errorTemplate.message

					console.log(
						colors.red("["),
						colors.red("ERROR"),
						colors.red("]"),
						colors.green("["),
						colors.green(currentDate),
						colors.green("]"),
						colors.red("["),
						colors.red("Smtp:"),
						colors.yellow(message),
						colors.red("]"),
						colors.red("["),
						colors.red("File:"),
						colors.yellow(`${__file}.${__ext}`),
						colors.red("|"),
						colors.red("Line:"),
						colors.yellow(`${__line}`),
						colors.red("]")
					)
				})

			if (templateMail !== undefined) {
				const mailOptions = {
					from: `"${config.get("app.title")} | ${_l.get("logIn.mailFrom", "Verification of the account")}" <${config.get("smtp.noReply.user")}>`,
					to: email,
					subject: util.format(_l.get("logIn.mailSubject", "Verifying account in: %s"), config.get("app.title")),
					html: templateMail
				}

				await smtpSend("noReply", mailOptions)
					.then(() => {
						check = true
						time = 60
					})
					.catch(erroMail => {
						const message = erroMail.message

						check = false

						console.log(
							colors.red("["),
							colors.red("ERROR"),
							colors.red("]"),
							colors.green("["),
							colors.green(currentDate),
							colors.green("]"),
							colors.red("["),
							colors.red("Smtp:"),
							colors.yellow(message),
							colors.red("]"),
							colors.red("["),
							colors.red("File:"),
							colors.yellow(`${__file}.${__ext}`),
							colors.red("|"),
							colors.red("Line:"),
							colors.yellow(`${__line}`),
							colors.red("]")
						)
					})
			} else {
				check = false

				console.log(
					colors.red("["),
					colors.red("ERROR"),
					colors.red("]"),
					colors.green("["),
					colors.green(currentDate),
					colors.green("]"),
					colors.red("["),
					colors.red("Smtp:"),
					colors.yellow(_l.get("securityCode.mailError", "Error sending mail")),
					colors.red("]"),
					colors.red("["),
					colors.red("File:"),
					colors.yellow(`${__file}.${__ext}`),
					colors.red("|"),
					colors.red("Line:"),
					colors.yellow(`${__line}`),
					colors.red("]")
				)
			}
		}

		res.json({
			check,
			time
		})
	},

	// NOTE: GET RECOVERY
	// ============================================================
	getRecovery: (req, res) => {
		const sessions = req.session

		if (sessions.csrf === undefined) {
			sessions.csrf = func.generateRandomAlphanumeric(32)
		}

		res.render("backend/views/pages/home/recovery", {
			sessionStatus: sessions.status,
			csrfToken: sessions.csrf,

			urlFormPost: "/panel/recovery",

			appTitleDescription: _l.get("recovery.appTitleDescription", "Recovery your account"),

			bodyTitle: _l.get("recovery.bodyTitle", "Recovery your account"),
			bodyDescription: _l.get("recovery.bodyDescription", "Recovery your account, so you can manage the web"),

			placeholderEmail: _l.get("recovery.placeholderEmail", "Enter email"),
			placeholderCaptcha: _l.get("recovery.placeholderCaptcha", "Enter captcha"),

			labelEmail: _l.get("recovery.labelEmail", "Email"),
			labelCaptcha: _l.get("recovery.labelCaptcha", "Captcha"),

			formButton: _l.get("recovery.formButton", "Recovery"),

			infoTermsPrivacyLogIn: util.format(
				_l.get(
					"recovery.infoTermsPrivacyLogIn",
					"When recovering the account in you accept our <a class='link-web' href='%s' target='_blank'>Terms</a> and <a class='link-web' href='%s' target='_blank'>Privacy</a><br><br><a class='link-web' href='%s'>Log in</a>"
				),
				"/terms",
				"/privacy",
				"/panel/login"
			),

			layout: "backend/views/layouts/layout"
		})
	},

	// NOTE: POST RECOVERY
	// ============================================================
	postRecovery: async (req, res) => {
		const sessions = req.session
		const cookies = req.cookies

		let check = false
		let focus = null
		let text = null

		const csrfSession = sessions.csrf
		const captchaSession = sessions.captcha

		const { csrfToken, email, captcha } = req.body

		const findEmail = await usersModel.findOne({ email })

		if (csrfToken === "") {
			text = _l.get("recovery.checkCsrf", "CSRF protection activated")
		} else if (csrfSession === undefined) {
			text = _l.get("recovery.checkCsrf", "CSRF protection activated")
		} else if (csrfSession === "") {
			text = _l.get("recovery.checkCsrf", "CSRF protection activated")
		} else if (csrfSession !== csrfToken) {
			text = _l.get("recovery.checkCsrf", "CSRF protection activated")
		} else if (email === "") {
			focus = "email"
			text = _l.get("recovery.checkEmailEmpty", "Email is empty")
		} else if (email.length < 6) {
			focus = "email"
			text = _l.get("recovery.checkEmailMin", "Email minimum 6 characters")
		} else if (email.length > 100) {
			focus = "email"
			text = _l.get("recovery.checkEmailMax", "Email maximum 100 characters")
		} else if (!func.emailValidate(email)) {
			focus = "email"
			text = _l.get("recovery.checkEmailChar", "Wrong email, example:<p class='text-warning'>name@domain.com</p>")
		} else if (captcha === "") {
			focus = "captcha"
			text = _l.get("recovery.checkCaptchaEmpty", "Captcha is Empty")
		} else if (captchaSession === undefined) {
			focus = "captcha"
			text = _l.get("recovery.checkCaptchaEmpty", "Captcha is Empty")
		} else if (captchaSession === "") {
			focus = "captcha"
			text = _l.get("recovery.checkCaptchaEmpty", "Captcha is Empty")
		} else if (captcha.length < 7) {
			focus = "captcha"
			text = _l.get("recovery.checkCaptchaMin", "Captcha minimum 7 characters")
		} else if (captcha.length > 7) {
			focus = "captcha"
			text = _l.get("recovery.checkCaptchaMax", "Captcha maximum 7 characters")
		} else if (captcha.match(func.captchaValidate)) {
			focus = "captcha"
			text = _l.get("recovery.checkCaptchaChar", "Wrong captcha, accepted characters:<p class='text-warning'>A-Z 1-9</p>")
		} else if (captchaSession !== captcha) {
			focus = "captcha"
			text = _l.get("recovery.checkCaptchaIncorrect", "Captcha incorrect")
		} else if (!findEmail) {
			focus = "email"
			text = _l.get("recovery.checkAccount", "Email not exists")
		} else if (findEmail.get("banned") === true) {
			focus = "email"
			text = util.format(
				_l.get(
					"recovery.checkBanned",
					"Your account is blocked for violating the: <a class='link-warning' href='%s' target='_blank'>Terms</a> and <a class='link-warning' href='%s' target='_blank'>Privacy</a> of this website, click here to appeal: <a class='link-warning' href='%s' target='_blank'>Contact</a>"
				),
				"/terms",
				"/privacy",
				"/contact"
			)
		} else if (findEmail.get("activateAccount") === false) {
			focus = "email"
			text = util.format(
				_l.get("recovery.checkActivateAccount", "Your account is not active, click here: <a class='link-warning' href='%s'>Activate</a>"),
				`/panel/activate/${findEmail.get("tokenAccount")}`
			)
		} else {
			const nickName = findEmail.get("nickName")
			const tokenResetDB = findEmail.get("tokenReset")
			const tokenResetNew = `${func.generateRandomAlphanumeric(24)}_${nickName}`
			const currentDate = func.formatDateTime()

			if (tokenResetDB === null || tokenResetDB === undefined || tokenResetDB === "") {
				const templateMail = await ejs
					.renderFile(path.join(__dirname, "../../app/backend/views/templates/mails", "confirm.ejs"), {
						mailUrlLogo: app.get("appUrl") + "/assets/img/logo.png",
						mailBodyTitle: _l.get("recovery.mailBodyTitle", "Recovering the account"),
						mailContent: util.format(
							_l.get(
								"recovery.mailContent",
								`
								Hello <b>%s,</b> we are recovering your account.<br><br>
								Recovery link:<br><br>
								<a class="template-button" href="%s" target="_blank"><span><b>RESET PASSWORD</b></span></a><br><br>
								Recovering date: <b>%s</b><br><br>
								If you did not create this account, ignore this message, your email will be removed from our website in the next 48 hours, a thousand apologies.
							`
							),
							func.firstLetterUppercase(nickName),
							`${app.get("appUrl")}/panel/recovery/reset/${tokenResetNew}`,
							currentDate
						),
						redSocials: func.getArrayRedSocials("none", app.get("appUrl"), false, "34", "34", cookies.mode_icon_network)
					})
					.then(dataTemplate => {
						return dataTemplate
					})
					.catch(errorTemplate => {
						const message = errorTemplate.message

						text = _l.get("recovery.mailError", "Error sending mail")

						console.log(
							colors.red("["),
							colors.red("ERROR"),
							colors.red("]"),
							colors.green("["),
							colors.green(currentDate),
							colors.green("]"),
							colors.red("["),
							colors.red("Smtp:"),
							colors.yellow(message),
							colors.red("]"),
							colors.red("["),
							colors.red("File:"),
							colors.yellow(`${__file}.${__ext}`),
							colors.red("|"),
							colors.red("Line:"),
							colors.yellow(`${__line}`),
							colors.red("]")
						)
					})

				if (templateMail !== undefined) {
					const mailOptions = {
						from: `"${config.get("app.title")} | ${_l.get("recovery.mailFrom", "Recovering the account")}" <${config.get("smtp.noReply.user")}>`,
						to: email,
						subject: util.format(_l.get("recovery.mailSubject", "Recover your account at: %s"), config.get("app.title")),
						html: templateMail
					}

					await smtpSend("noReply", mailOptions)
						.then(async () => {
							await usersModel
								.updateOne(
									{ email: email },
									{
										tokenReset: tokenResetNew,
										update: currentDate,
										$push: {
											logs: [
												`
												[INFO] [${currentDate}] [${await func.getIpPublic}] [${_l.get("recovery.log", "Recovering the account from the panel")}]
												`
											]
										}
									}
								)
								.then(() => {
									check = true
									text = _l.get("recovery.success", "we are recovering your account, check your email<br>redirecting in:")
								})
								.catch(errorUpdate => {
									const message = errorUpdate.message

									text = _l.get("recovery.errorUpdate", "Error updating account")

									console.log(
										colors.red("["),
										colors.red("ERROR"),
										colors.red("]"),
										colors.green("["),
										colors.green(currentDate),
										colors.green("]"),
										colors.red("["),
										colors.red("Updating DB:"),
										colors.yellow(message),
										colors.red("]"),
										colors.red("["),
										colors.red("File:"),
										colors.yellow(`${__file}.${__ext}`),
										colors.red("|"),
										colors.red("Line:"),
										colors.yellow(`${__line}`),
										colors.red("]")
									)
								})
						})
						.catch(erroMail => {
							const message = erroMail.message

							text = _l.get("recovery.mailError", "Error sending mail")

							console.log(
								colors.red("["),
								colors.red("ERROR"),
								colors.red("]"),
								colors.green("["),
								colors.green(currentDate),
								colors.green("]"),
								colors.red("["),
								colors.red("Smtp:"),
								colors.yellow(message),
								colors.red("]"),
								colors.red("["),
								colors.red("File:"),
								colors.yellow(`${__file}.${__ext}`),
								colors.red("|"),
								colors.red("Line:"),
								colors.yellow(`${__line}`),
								colors.red("]")
							)
						})
				} else {
					text = _l.get("recovery.mailError", "Error sending mail")
				}
			}
			{
				check = true
				text = _l.get("recovery.success", "we are recovering your account, check your email<br>redirecting in:")
			}
		}

		if (check === false) {
			res.json({
				check,
				focus,
				text
			})
		} else {
			res.json({
				check,
				text,
				time: 5,
				redirect: "/panel/login"
			})
		}
	},

	// NOTE: GET RECOVERY RESET
	// ============================================================
	getRecoveryReset: async (req, res) => {
		const sessions = req.session

		let check = false
		let text = null

		const { tokenReset } = req.params

		const findTokenReset = await usersModel.findOne({ tokenReset })

		if (sessions.csrf === undefined) {
			sessions.csrf = func.generateRandomAlphanumeric(32)
		}

		if (!findTokenReset) {
			text = _l.get("reset.checkResetCompare", "Option deactivated")
		} else if (tokenReset !== findTokenReset.get("tokenReset")) {
			text = _l.get("reset.checkResetCompare", "Option deactivated")
		} else {
			check = true
		}

		res.render("backend/views/pages/home/reset", {
			sessionStatus: sessions.status,
			csrfToken: sessions.csrf,
			check,

			urlFormPost: `/panel/recovery/reset/${tokenReset}`,

			appTitleDescription: _l.get("reset.appTitleDescription", "Reset password"),

			bodyTitle: _l.get("reset.bodyTitle", "Reset password"),
			bodyDescription: _l.get("reset.bodyDescription", "Reset password, so you can manage the web"),

			placeholderPassword: _l.get("reset.placeholderPassword", "Enter password"),
			placeholderRepeatPassword: _l.get("reset.placeholderRepeatPassword", "Repeat password"),
			placeholderCaptcha: _l.get("reset.placeholderCaptcha", "Enter captcha"),

			labelPassword: _l.get("reset.labelPassword", "Password"),
			labelRepeatPassword: _l.get("reset.labelRepeatPassword", "Repeat Password"),
			labelCaptcha: _l.get("reset.labelCaptcha", "Captcha"),

			titleConfirmPasswordCopied: _l.get("reset.titleConfirmPasswordCopied", "Password copied!"),

			formButton: _l.get("reset.formButton", "Reset password"),

			htmlContent: text,

			layout: "backend/views/layouts/layout"
		})
	},

	// NOTE: POST RECOVERY RESET
	// ============================================================
	postRecoveryReset: async (req, res) => {
		const sessions = req.session
		const cookies = req.cookies

		let check = false
		let focus = null
		let text = null

		const csrfSession = sessions.csrf
		const captchaSession = sessions.captcha

		const { tokenReset } = req.params

		const { csrfToken, password, repeatPassword, captcha } = req.body

		const findTokenReset = await usersModel.findOne({ tokenReset })

		if (csrfToken === "") {
			text = _l.get("reset.checkCsrf", "CSRF protection activated")
		} else if (csrfSession === undefined) {
			text = _l.get("reset.checkCsrf", "CSRF protection activated")
		} else if (csrfSession === "") {
			text = _l.get("reset.checkCsrf", "CSRF protection activated")
		} else if (csrfSession !== csrfToken) {
			text = _l.get("reset.checkCsrf", "CSRF protection activated")
		} else if (!findTokenReset) {
			text = _l.get("reset.checkResetCompare", "Option deactivated")
		} else if (tokenReset !== findTokenReset.get("tokenReset")) {
			text = _l.get("reset.checkResetCompare", "Option deactivated")
		} else if (password === "") {
			focus = "password"
			text = _l.get("reset.checkPasswordEmpty", "Password is empty")
		} else if (password.length < 8) {
			focus = "password"
			text = _l.get("reset.checkPasswordMin", "Password minimum 8 characters")
		} else if (password.length > 20) {
			focus = "password"
			text = _l.get("reset.checkPasswordMax", "Password maximum 20 characters")
		} else if (password.match(func.passwordValidate)) {
			focus = "password"
			text = _l.get("reset.checkPasswordChar", "Wrong password, accepted characters:<p class='text-warning'>a-z A-Z 0-9 @ * # _-</p>")
		} else if (password.search(func.passwordValidateUpperCase) === -1) {
			focus = "password"
			text = _l.get("reset.checkPasswordUpperCase", "Incorrect password, at least one capital letter")
		} else if (password.search(func.passwordValidateLowerCase) === -1) {
			focus = "password"
			text = _l.get("reset.checkPasswordLowerCase", "Incorrect password, at least one lowercase letter")
		} else if (password.search(func.passwordValidateNumber) === -1) {
			focus = "password"
			text = _l.get("reset.checkPasswordNumber", "Incorrect password, at least one number")
		} else if (password.search(func.passwordValidateSpecial) === -1) {
			focus = "password"
			text = _l.get("reset.checkPasswordSpecial", "Incorrect password, minimum one special character:<p class='text-warning'>* # @ _-</p>")
		} else if (repeatPassword === "") {
			focus = "repeatPassword"
			text = _l.get("reset.checkRepeatPasswordEmpty", "Repeat password is empty")
		} else if (repeatPassword.length < 8) {
			focus = "repeatPassword"
			text = _l.get("reset.checkRepeatPasswordMin", "Repeat password at least 8 characters")
		} else if (repeatPassword.length > 20) {
			focus = "repeatPassword"
			text = _l.get("reset.checkRepeatPasswordMax", "Repeat password maximum 20 characters")
		} else if (repeatPassword.match(func.passwordValidate)) {
			focus = "repeatPassword"
			text = _l.get("reset.checkRepeatPasswordChar", "Repeat wrong password, characters accepted:<p class='text-warning'>a-z A-Z 0-9 @ * # _-</p>")
		} else if (repeatPassword.search(func.passwordValidateMinUpperCase) === -1) {
			focus = "repeatPassword"
			text = _l.get("reset.checkRepeatPasswordUpperCase", "Repeat wrong password, at least one capital letter")
		} else if (repeatPassword.search(func.passwordValidateMinLowerCase) === -1) {
			focus = "repeatPassword"
			text = _l.get("reset.checkRepeatPasswordLowerCase", "Repeat wrong password, at least one lowercase letter")
		} else if (repeatPassword.search(func.passwordValidateNumber) === -1) {
			focus = "repeatPassword"
			text = _l.get("reset.checkRepeatPasswordNumber", "Repeat wrong password, minimum one number")
		} else if (repeatPassword.search(func.passwordValidateSpecial) === -1) {
			focus = "repeatPassword"
			text = _l.get("reset.checkRepeatPasswordSpecial", "Repeat wrong password, minimum one special character:<p class='text-warning'>* # @ _-</p>")
		} else if (password !== repeatPassword) {
			focus = "repeatPassword"
			text = _l.get("reset.checkRepeatPasswordCompare", "Password and repeat password do not match")
		} else if (bcryptJs.compareSync(repeatPassword, findTokenReset.get("password"))) {
			text = _l.get("reset.checkPasswordPrevious", "Password should not be equal to the previous")
		} else if (captcha === "") {
			focus = "captcha"
			text = _l.get("reset.checkCaptchaEmpty", "Captcha is Empty")
		} else if (captchaSession === undefined) {
			focus = "captcha"
			text = _l.get("reset.checkCaptchaEmpty", "Captcha is Empty")
		} else if (captchaSession === "") {
			focus = "captcha"
			text = _l.get("reset.checkCaptchaEmpty", "Captcha is Empty")
		} else if (captcha.length < 7) {
			focus = "captcha"
			text = _l.get("reset.checkCaptchaMin", "Captcha minimum 7 characters")
		} else if (captcha.length > 7) {
			focus = "captcha"
			text = _l.get("reset.checkCaptchaMax", "Captcha maximum 7 characters")
		} else if (captcha.match(func.captchaValidate)) {
			focus = "captcha"
			text = _l.get("reset.checkCaptchaChar", "Wrong captcha, accepted characters:<p class='text-warning'>A-Z 1-9</p>")
		} else if (captchaSession !== captcha) {
			focus = "captcha"
			text = _l.get("reset.checkCaptchaIncorrect", "Captcha incorrect")
		} else {
			const nickName = findTokenReset.get("nickName")
			const email = findTokenReset.get("email")
			const tokenAccount = `${func.generateRandomAlphanumeric(32)}_${nickName}`
			const countryClient = geoIpCountry.lookup(await func.getIpPublic).country
			const browserClient = req.useragent.browser
			const versionClient = req.useragent.version
			const platformClient = req.useragent.platform
			const osClient = req.useragent.os
			const currentDate = func.formatDateTime()

			const templateMail = await ejs
				.renderFile(path.join(__dirname, "../../app/backend/views/templates/mails", "confirm.ejs"), {
					mailUrlLogo: app.get("appUrl") + "/assets/img/logo.png",
					mailBodyTitle: _l.get("reset.mailBodyTitle", "Account recovered"),
					mailContent: util.format(
						_l.get(
							"reset.mailContent",
							`
								Hello <b>%s,</b> the account was recovered successfully.<br><br>
								Panel link:<br><br>
								<a class="template-button" href="%s" target="_blank"><span><b>PANEL</b></span></a><br><br>
								Recovering date: <b>%s</b><br><br>
								If you did not create this account, ignore this message, your email will be removed from our website in the next 48 hours, a thousand apologies.
							`
						),
						func.firstLetterUppercase(nickName),
						`${app.get("appUrl")}/panel`,
						currentDate
					),
					redSocials: func.getArrayRedSocials("none", app.get("appUrl"), false, "34", "34", cookies.mode_icon_network)
				})
				.then(dataTemplate => {
					return dataTemplate
				})
				.catch(errorTemplate => {
					const message = errorTemplate.message

					text = _l.get("reset.mailError", "Error sending mail")

					console.log(
						colors.red("["),
						colors.red("ERROR"),
						colors.red("]"),
						colors.green("["),
						colors.green(currentDate),
						colors.green("]"),
						colors.red("["),
						colors.red("Smtp:"),
						colors.yellow(message),
						colors.red("]"),
						colors.red("["),
						colors.red("File:"),
						colors.yellow(`${__file}.${__ext}`),
						colors.red("|"),
						colors.red("Line:"),
						colors.yellow(`${__line}`),
						colors.red("]")
					)
				})

			if (templateMail !== undefined) {
				const mailOptions = {
					from: `"${config.get("app.title")} | ${_l.get("reset.mailFrom", "Account recovered")}" <${config.get("smtp.noReply.user")}>`,
					to: email,
					subject: util.format(_l.get("reset.mailSubject", "Account successfully recovered in: %s"), config.get("app.title")),
					html: templateMail
				}

				await smtpSend("noReply", mailOptions)
					.then(async () => {
						await usersModel
							.updateOne(
								{ tokenReset },
								{
									password: bcryptJs.hashSync(repeatPassword, 10),
									tokenReset: "",
									tokenAccount,
									checkSecurity: [
										{
											ip: await func.getIpPublic,
											country: countryClient,
											browser: browserClient,
											version: versionClient,
											platform: platformClient,
											os: osClient
										}
									],

									update: currentDate,
									$push: {
										logs: [
											`
												[INFO] [${currentDate}] [${await func.getIpPublic}] [${_l.get("reset.log", "Account recovered correctly from the panel")}]
											`
										]
									}
								}
							)
							.then(async () => {
								await res.cookie(`token_account_${nickName}`, tokenAccount, { maxAge: 365 * 24 * 60 * 60 * 1000 })
								check = true
								text = _l.get("reset.success", "Recovered account successfully<br>redirecting in:")
							})
							.catch(errorUpdate => {
								const message = errorUpdate.message

								text = _l.get("reset.errorUpdate", "Error updating account")

								console.log(
									colors.red("["),
									colors.red("ERROR"),
									colors.red("]"),
									colors.green("["),
									colors.green(currentDate),
									colors.green("]"),
									colors.red("["),
									colors.red("Updating DB:"),
									colors.yellow(message),
									colors.red("]"),
									colors.red("["),
									colors.red("File:"),
									colors.yellow(`${__file}.${__ext}`),
									colors.red("|"),
									colors.red("Line:"),
									colors.yellow(`${__line}`),
									colors.red("]")
								)
							})
					})
					.catch(erroMail => {
						const message = erroMail.message

						text = _l.get("reset.mailError", "Error sending mail")

						console.log(
							colors.red("["),
							colors.red("ERROR"),
							colors.red("]"),
							colors.green("["),
							colors.green(currentDate),
							colors.green("]"),
							colors.red("["),
							colors.red("Smtp:"),
							colors.yellow(message),
							colors.red("]"),
							colors.red("["),
							colors.red("File:"),
							colors.yellow(`${__file}.${__ext}`),
							colors.red("|"),
							colors.red("Line:"),
							colors.yellow(`${__line}`),
							colors.red("]")
						)
					})
			} else {
				text = _l.get("reset.mailError", "Error sending mail")
			}
		}

		if (check === false) {
			res.json({
				check,
				focus,
				text
			})
		} else {
			res.json({
				check,
				text,
				time: 5,
				redirect: "/panel/login"
			})
		}
	},

	// NOTE: GET LOGOUT
	// ============================================================
	getLogOut: (req, res) => {
		process.env.NODE_ENV === "development" ? res.clearCookie("SSID_DEV") : res.clearCookie("SSID")
		req.session = null
		res.redirect("/panel")
	}
}

//  NOTE:  EXPORT
// ============================================================
export default homeControllerBackEnd
