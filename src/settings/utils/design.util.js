//  INFO:  UTIL DESIGN

//  NOTE:  ESLINT FIX
/* global func colors __file __ext __line global app */

//  NOTE:  IMPORT MODELS
import usersModel from "../../app/models/users.model.js"

//  NOTE:  CONSTANT
// ============================================================
const designUtil = {
	//  NOTE:  FUNCTION _DESIGN
	_design: async (req, res, next) => {
		const sessions = req.session
		const cookies = req.cookies
		const id = sessions.id
		const currentDate = func.formatDateTime()

		if (cookies.mode_design === null || cookies.mode_design === undefined || cookies.mode_design === "") {
			res.cookie("mode_design", app.get("appDesign"), { maxAge: 365 * 24 * 60 * 60 * 1000 })
			return res.redirect(req.originalUrl)
		}

		if (sessions.status === "on") {
			if (cookies.design_change !== null && cookies.design_change !== undefined && cookies.design_change !== "") {
				await usersModel
					.findByIdAndUpdate(
						{ _id: id },
						{
							"settings.design": cookies.mode_design
						},
						{ new: true }
					)
					.then(resultUpdate => {
						res.clearCookie("design_change")
						sessions.mode_design = resultUpdate.settings.design
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

		global.appDesign = sessions.mode_design || cookies.mode_design || app.get("appDesign")

		next()
	}
}

//  NOTE:  EXPORT
// ============================================================
export default designUtil
