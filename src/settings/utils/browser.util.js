//  INFO:  UTIL BROWSER

//  NOTE:  ESLINT FIX
/* global func path __dirname */

//  NOTE:  CONSTANT
// ============================================================
const browserUtil = {
	//  NOTE:  FUNCTION _BROWSER
	_browser: (req, res, next) => {
		const browserClient = req.useragent.browser
		const versionClient = req.useragent.version

		if (browserClient === "Chrome" && func.findSubStr(versionClient, 0, 2) >= 90) {
			next()
		} else if (browserClient === "Firefox" && func.findSubStr(versionClient, 0, 2) >= 88) {
			next()
		} else if (browserClient === "Opera" && func.findSubStr(versionClient, 0, 2) >= 76) {
			next()
		} else if (browserClient === "Edge" && func.findSubStr(versionClient, 0, 2) >= 90) {
			next()
		} else if (browserClient === "Safari" && func.findSubStr(versionClient, 0, 2) >= 10) {
			next()
		} else {
			res.sendFile(path.join(__dirname, "../../public/pages/browser.html"))
		}
	}
}

//  NOTE:  EXPORT
// ============================================================
export default browserUtil
