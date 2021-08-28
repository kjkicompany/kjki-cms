//  INFO:  CONTROLLER ERRORS

//  NOTE:  ESLINT FIX
/* global _l */

//  NOTE:  CONSTANT
// ============================================================
const errorsControllerBackEnd = {
	//  NOTE:  GET ERRORS
	getErrors: (req, res) => {
		const sessions = req.session

		res.render("backend/views/pages/errors/errors", {
			sessionStatus: sessions.status,

			appTitleDescription: _l.get("errors.appTitleDescription", "Error 404"),

			active_nav: "home",

			bodyTitle: _l.get("errors.bodyTitle", "Error 404 page not found"),

			layout: "backend/views/layouts/layout"
		})
	}
}

//  NOTE:  EXPORT
// ============================================================
export default errorsControllerBackEnd
