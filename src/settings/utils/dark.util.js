//  INFO:  UTIL DARK

//  NOTE:  ESLINT FIX
/* global func colors __file __ext __line global app appDark */

//  NOTE:  IMPORT MODELS
import usersModel from "../../app/models/users.model.js"

//  NOTE:  CONSTANT
// ============================================================
const darkUtil = {
	//  NOTE:  FUNCTION _DARK
	_dark: async (req, res, next) => {
		const sessions = req.session
		const cookies = req.cookies
		const id = sessions.id
		const currentDate = func.formatDateTime()

		if (cookies.mode_dark === null || cookies.mode_dark === undefined || cookies.mode_dark === "") {
			res.cookie("mode_dark", app.get("appDark"), { maxAge: 365 * 24 * 60 * 60 * 1000 })
			return res.redirect(req.originalUrl)
		}

		if (sessions.status === "on") {
			if (cookies.dark_change !== null && cookies.dark_change !== undefined && cookies.dark_change !== "") {
				await usersModel
					.findByIdAndUpdate(
						{ _id: id },
						{
							"settings.dark": cookies.mode_dark
						},
						{ new: true }
					)
					.then(resultUpdate => {
						res.clearCookie("dark_change")
						sessions.mode_dark = resultUpdate.settings.dark
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

		global.appDark = sessions.mode_dark || cookies.mode_dark || app.get("appDark")

		if (global.appDark === "automatic") {
			if (func.formatDateTime("hour") >= 6 && func.formatDateTime("hour") < 18) {
				global.appDarkName = "automatic"
				global.appDark = "light"
			}
			if (func.formatDateTime("hour") >= 18 && func.formatDateTime("hour") < 24) {
				global.appDarkName = "automatic"
				global.appDark = "dark"
			}
			if (func.formatDateTime("hour") >= 0 && func.formatDateTime("hour") < 6) {
				global.appDarkName = "automatic"
				global.appDark = "dark"
			}
		} else {
			global.appDarkName = appDark
			global.appDark = appDark
		}

		next()
	}
}

//  NOTE:  EXPORT
// ============================================================
export default darkUtil
