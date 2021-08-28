//  INFO:  UTIL AUTH

//  NOTE:  IMPORT MODELS
import usersModel from "../../app/models/users.model.js"

//  NOTE:  CONSTANT
// ============================================================
const authUtil = {
	//  NOTE:  FUNCTION CHECK AUTH BACKEND
	_checkAuthBackEnd: type => async (req, res, next) => {
		const sessions = req.session
		const cookies = req.cookies

		const checkRoleAdmin = await usersModel.findOne({ role: "admin" })

		if (type === "home") {
			if (sessions.status === "on") {
				const checkAccount = await usersModel.findOne({ _id: sessions.id })

				if (checkAccount.get("tokenAccount") !== cookies[`token_account_${checkAccount.get("nickName")}`]) {
					if (req.originalUrl.includes("logout") === true) {
						next()
					} else {
						res.redirect("/panel/logout")
					}
				} else {
					next()
				}
			} else {
				if (checkRoleAdmin === null) {
					res.redirect("/panel/signup")
				} else {
					res.redirect("/panel/login")
				}
			}
		}

		if (type === "off") {
			if (sessions.status === "on") {
				const checkAccount = await usersModel.findOne({ _id: sessions.id })

				if (checkAccount.get("tokenAccount") !== cookies[`token_account_${checkAccount.get("nickName")}`]) {
					if (req.originalUrl.includes("logout") === true) {
						next()
					} else {
						res.redirect("/panel/logout")
					}
				} else {
					res.redirect("/panel")
				}
			} else {
				if (checkRoleAdmin === null) {
					if (req.originalUrl.includes("signup") === true) {
						next()
					} else {
						res.redirect("/panel")
					}
				} else {
					if (req.originalUrl.includes("signup") === true) {
						res.redirect("/panel")
					} else {
						next()
					}
				}
			}
		}

		if (type === "on") {
			if (sessions.status === "on") {
				const checkAccount = await usersModel.findOne({ _id: sessions.id })

				if (checkAccount.get("tokenAccount") !== cookies[`token_account_${checkAccount.get("nickName")}`]) {
					if (req.originalUrl.includes("logout") === true) {
						next()
					} else {
						res.redirect("/panel/logout")
					}
				} else {
					next()
				}
			} else {
				const pagesArray = ["articles", "media", "pages", "testimonials", "courses", "store", "users", "memberships", "subscriptions", "newsletter", "themes", "settings"]
				pagesArray.forEach(page => {
					if (req.originalUrl.includes(page) === true) {
						res.cookie("page_back", req.originalUrl, { maxAge: 365 * 24 * 60 * 60 * 1000 })
					}
				})
				res.redirect("/panel")
			}
		}
	},

	//  NOTE:  FUNCTION CHECK AUTH FRONTEND
	_checkAuthFrontEnd: type => (req, res, next) => {
		const sessions = req.session

		if (type === "off") {
			if (sessions.status !== "on") {
				next()
			} else {
				res.redirect("/users/login")
			}
		}

		if (type === "on") {
			if (sessions.status === "on") {
				next()
			} else {
				res.redirect("/users/login")
			}
		}
	}
}

//  NOTE:  EXPORT
// ============================================================
export default authUtil
