//  INFO:  LIB UTIL

//  NOTE:  ESLINT FIX
/* global app */

//  NOTE:  IMPORT UTILS MODULES
// ============================================================
import browserUtil from "../utils/browser.util.js"
import langUtil from "../utils/lang.util.js"
import darkUtil from "../utils/dark.util.js"
import changeColorUtil from "../utils/change-color.util.js"
import designUtil from "../utils/design.util.js"
import cronUtil from "../utils/cron.util.js"
import toggleMenuUtil from "../utils/toggle-menu.util.js"
import iconNetworkUtil from "../utils/icon-network.util.js"

//  NOTE:  GLOBAL VARIABLES
// ============================================================
app.use(browserUtil._browser)
app.use(langUtil._lang)
app.use(darkUtil._dark)
app.use(changeColorUtil._changeColor)
app.use(designUtil._design)
app.use(cronUtil._cron)
app.use(toggleMenuUtil._toggleMenu)
app.use(iconNetworkUtil._iconsNetwork)
