//  INFO:  UTIL ICON NETWORK

//  NOTE:  ESLINT FIX
/* global func colors __file __ext __line global app */

//  NOTE:  IMPORT MODELS
import usersModel from "../../app/models/users.model.js"

//  NOTE:  CONSTANT
// ============================================================
const iconNetworkUtil = {
	//  NOTE:  FUNCTION _DESIGN ICONS NETWORK
	_iconsNetwork: async (req, res, next) => {
		const sessions = req.session
		const cookies = req.cookies
		const id = sessions.id
		const currentDate = func.formatDateTime()

		if (cookies.mode_icon_network === null || cookies.mode_icon_network === undefined || cookies.mode_icon_network === "") {
			res.cookie("mode_icon_network", "1A", { maxAge: 365 * 24 * 60 * 60 * 1000 })
			return res.redirect(req.originalUrl)
		}

		if (sessions.status === "on") {
			if (cookies.icon_network_change !== null && cookies.icon_network_change !== undefined && cookies.icon_network_change !== "") {
				await usersModel
					.findByIdAndUpdate(
						{ _id: id },
						{
							"settings.iconNetwork": cookies.mode_icon_network
						},
						{ new: true }
					)
					.then(resultUpdate => {
						res.clearCookie("icon_network_change")
						sessions.mode_icon_network = resultUpdate.settings.iconNetwork
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

		global.appIconNetwork = sessions.mode_icon_network || cookies.mode_icon_network || app.get("appIconNetwork")

		next()
	}
}

//  NOTE:  EXPORT
// ============================================================
export default iconNetworkUtil
