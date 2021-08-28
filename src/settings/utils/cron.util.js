//  INFO:  UTIL CRON

//  NOTE:  ESLINT FIX
/* global func colors __file __ext __line */

//  NOTE:  IMPORT MODELS
import usersModel from "../../app/models/users.model.js"

//  NOTE:  CONSTANT
// ============================================================
const cronUtil = {
	//  NOTE:  FUNCTION _CRON
	_cron: async (req, res, next) => {
		const checkAccount = await usersModel.find({})
		const currentDate = func.formatDateTime()

		if (checkAccount !== null) {
			checkAccount.forEach(async check => {
				if (check.activateAccount === false) {
					if (func.subtractDates(func.findSubStr(check.create, 0, 10), func.formatDateTime("date")) >= 2) {
						await usersModel
							.deleteMany({ activateAccount: false })
							.then(() => {
								console.log(
									colors.cyan("["),
									colors.cyan("SUCCESS CRON JOB"),
									colors.cyan("]"),
									colors.green("["),
									colors.green(currentDate),
									colors.green("]"),
									colors.cyan("["),
									colors.cyan("Deleting all DB:"),
									colors.yellow("activateAccount = false"),
									colors.cyan("]"),
									colors.cyan("["),
									colors.cyan("File:"),
									colors.yellow(`${__file}.${__ext}`),
									colors.cyan("|"),
									colors.cyan("Line:"),
									colors.yellow(`${__line}`),
									colors.cyan("]")
								)
							})
							.catch(errorDelete => {
								const message = errorDelete.message

								console.log(
									colors.red("["),
									colors.red("ERROR CRON JOB"),
									colors.red("]"),
									colors.green("["),
									colors.green(currentDate),
									colors.green("]"),
									colors.red("["),
									colors.red("Deleting all DB:"),
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

				if (check.activateAccount === true && check.tokenTemp !== "") {
					if (func.subtractDates(func.findSubStr(check.update, 0, 10), func.formatDateTime("date")) >= 2) {
						await usersModel
							.updateMany(
								{ activateAccount: true },
								{
									tokenTemp: ""
								}
							)
							.then(() => {
								console.log(
									colors.cyan("["),
									colors.cyan("SUCCESS CRON JOB"),
									colors.cyan("]"),
									colors.green("["),
									colors.green(currentDate),
									colors.green("]"),
									colors.cyan("["),
									colors.cyan("Updating All DB:"),
									colors.yellow("tokenTemp = empty"),
									colors.cyan("]"),
									colors.cyan("["),
									colors.cyan("File:"),
									colors.yellow(`${__file}.${__ext}`),
									colors.cyan("|"),
									colors.cyan("Line:"),
									colors.yellow(`${__line}`),
									colors.cyan("]")
								)
							})
							.catch(errorUpdate => {
								const message = errorUpdate.message

								console.log(
									colors.red("["),
									colors.red("ERROR CRON JOB"),
									colors.red("]"),
									colors.green("["),
									colors.green(currentDate),
									colors.green("]"),
									colors.red("["),
									colors.red("Updating all DB:"),
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

				if (check.activateAccount === true && check.tokenReset !== "") {
					if (func.subtractDates(func.findSubStr(check.update, 0, 10), func.formatDateTime("date")) >= 2) {
						await usersModel
							.updateMany(
								{ activateAccount: true },
								{
									tokenReset: ""
								}
							)
							.then(() => {
								console.log(
									colors.cyan("["),
									colors.cyan("SUCCESS CRON JOB"),
									colors.cyan("]"),
									colors.green("["),
									colors.green(currentDate),
									colors.green("]"),
									colors.cyan("["),
									colors.cyan("Updating All DB:"),
									colors.yellow("tokenReset = empty"),
									colors.cyan("]"),
									colors.cyan("["),
									colors.cyan("File:"),
									colors.yellow(`${__file}.${__ext}`),
									colors.cyan("|"),
									colors.cyan("Line:"),
									colors.yellow(`${__line}`),
									colors.cyan("]")
								)
							})
							.catch(errorUpdate => {
								const message = errorUpdate.message

								console.log(
									colors.red("["),
									colors.red("ERROR CRON JOB"),
									colors.red("]"),
									colors.green("["),
									colors.green(currentDate),
									colors.green("]"),
									colors.red("["),
									colors.red("Updating all DB:"),
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
			})
		}
		next()
	}
}

//  NOTE:  EXPORT
// ============================================================
export default cronUtil
