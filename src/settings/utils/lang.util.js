//  INFO:  UTIL BROWSER

//  NOTE:  ESLINT FIX
/* global func fs path __dirname colors __file __ext __line global app appLang editJsonFile */

//  NOTE:  IMPORT MODELS
import usersModel from "../../app/models/users.model.js"

//  NOTE:  CONSTANT
// ============================================================
const langUtil = {
	//  NOTE:  FUNCTION _LANG
	_lang: async (req, res, next) => {
		const sessions = req.session
		const cookies = req.cookies
		const id = sessions.id
		const currentDate = func.formatDateTime()

		const langBrowser = req.acceptsLanguages()
		const langBrowserDefault = func.findSubStr(langBrowser[0], 0, 2)

		if (fs.existsSync(path.join(__dirname, "../../app", "frontend" && "backend", "lang", langBrowserDefault))) {
			if (cookies.mode_lang === null || cookies.mode_lang === undefined || cookies.mode_lang === "") {
				res.cookie("mode_lang", langBrowserDefault, { maxAge: 365 * 24 * 60 * 60 * 1000 })
				return res.redirect(req.originalUrl)
			}

			if (sessions.status === "on") {
				if (cookies.lang_change !== null && cookies.lang_change !== undefined && cookies.lang_change !== "") {
					await usersModel
						.findByIdAndUpdate(
							{ _id: id },
							{
								"settings.lang": cookies.mode_lang
							},
							{ new: true }
						)
						.then(resultUpdate => {
							res.clearCookie("lang_change")
							sessions.mode_lang = resultUpdate.settings.lang
						})
						.catch(errorUpdate => {
							const message = errorUpdate.message

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
				}
			}

			global.appLang = sessions.mode_lang || cookies.mode_lang || langBrowserDefault
		} else {
			global.appLang = app.get("appLang")

			console.log(
				colors.red("["),
				colors.red("ERROR"),
				colors.red("]"),
				colors.green("["),
				colors.green(currentDate),
				colors.green("]"),
				colors.red("["),
				colors.red("Lang:"),
				colors.yellow(langBrowserDefault),
				colors.red("|"),
				colors.red("Status:"),
				colors.yellow("not found"),
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

		global._l = {
			get: (str, optional) => {
				let getLang = null
				let lang = null

				for (const pathLang of func.getDirFiles(path.join(__dirname, "../../app", "frontend" && "backend", "lang", appLang))) {
					if (func.getFileExt(pathLang)) {
						lang = editJsonFile(pathLang, {
							stringify_width: 4
						})

						if (lang.get(str) !== undefined && lang.get(str) !== null && lang.get(str) !== "undefined") {
							getLang = lang.get(str)
						}
					}
				}

				return getLang || optional
			},

			set: (path, key, value) => {
				const lang = editJsonFile(path, {
					stringify_width: 4
				})

				lang.set(key, value)
				return lang.save()
			},

			unset: (path, key) => {
				if (fs.existsSync(path)) {
					const lang = editJsonFile(path, {
						stringify_width: 4
					})

					lang.unset(key)
					return lang.save()
				}
			}
		}

		next()
	}
}

//  NOTE:  EXPORT
// ============================================================
export default langUtil
