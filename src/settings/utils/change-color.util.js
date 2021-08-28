//  INFO:  UTIL CHANGE COLOR

//  NOTE:  ESLINT FIX
/* global func colors __file __ext __line global app */

//  NOTE:  IMPORT MODELS
import usersModel from "../../app/models/users.model.js"

//  NOTE:  CONSTANT
// ============================================================
const changeColorHelper = {
	//  NOTE:  FUNCTION _CHANGE COLOR
	_changeColor: async (req, res, next) => {
		const sessions = req.session
		const cookies = req.cookies
		const id = sessions.id
		const currentDate = func.formatDateTime()

		if (cookies.mode_change_color === null || cookies.mode_change_color === undefined || cookies.mode_change_color === "") {
			res.cookie("mode_change_color", app.get("appChangeColor"), { maxAge: 365 * 24 * 60 * 60 * 1000 })
			return res.redirect(req.originalUrl)
		}

		if (sessions.status === "on") {
			if (cookies.change_color_change !== null && cookies.change_color_change !== undefined && cookies.change_color_change !== "") {
				await usersModel
					.findByIdAndUpdate(
						{ _id: id },
						{
							"settings.changeColor": cookies.mode_change_color
						},
						{ new: true }
					)
					.then(resultUpdate => {
						res.clearCookie("change_color_change")
						sessions.mode_change_color = resultUpdate.settings.changeColor
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

		global.appChangeColor = sessions.mode_change_color || cookies.mode_change_color || app.get("appChangeColor")

		next()
	}
}

//  NOTE:  EXPORT
// ============================================================
export default changeColorHelper
