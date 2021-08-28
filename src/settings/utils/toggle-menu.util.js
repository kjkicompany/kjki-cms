//  INFO:  UTIL TOGGLE MENU

//  NOTE:  ESLINT FIX
/* global func colors __file __ext __line global app */

//  NOTE:  IMPORT MODELS
import usersModel from "../../app/models/users.model.js"

//  NOTE:  CONSTANT
// ============================================================
const toggleMenuUtil = {
	//  NOTE:  FUNCTION _TOGGLE MENU
	_toggleMenu: async (req, res, next) => {
		const sessions = req.session
		const cookies = req.cookies
		const id = sessions.id

		const currentDate = func.formatDateTime()

		if (cookies.mode_toggle_menu === null || cookies.mode_toggle_menu === undefined || cookies.mode_toggle_menu === "") {
			res.cookie("mode_toggle_menu", "show", { maxAge: 365 * 24 * 60 * 60 * 1000 })
			return res.redirect(req.originalUrl)
		}

		if (sessions.status === "on") {
			if (cookies.toggle_menu_change !== null && cookies.toggle_menu_change !== undefined && cookies.toggle_menu_change !== "") {
				await usersModel
					.findByIdAndUpdate(
						{ _id: id },
						{
							"settings.toggleMenu": cookies.mode_toggle_menu
						},
						{ new: true }
					)
					.then(resultUpdate => {
						res.clearCookie("toggle_menu_change")
						sessions.mode_toggle_menu = resultUpdate.settings.toggleMenu
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

		global.appToggleMenu = sessions.mode_toggle_menu || cookies.mode_toggle_menu || app.get("appToggleMenu")

		next()
	}
}

//  NOTE:  EXPORT
// ============================================================
export default toggleMenuUtil
