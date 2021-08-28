//  INFO:  LIB ROUTE

//  NOTE:  ESLINT FIX
/* global app */

//  NOTE:  IMPORT ROUTES
// ============================================================

//  NOTE:  BACKEND MODULE
import homeRouteBackEnd from "../../app/backend/routes/home.route.js"
// import usersRouteBackEnd from "../../app/backend/routes/users.route"
// import settingsRouteBackEnd from "../../app/backend/routes/settings.route"

//  NOTE:  FRONTEND MODULE
// import homeRouteFrontEnd from "../../app/frontend/routes/home.route"

//  NOTE:  CAPTCHA MODULE
import captchaRouteBackEnd from "../../app/backend/routes/captcha.route.js"
// import captchaRouteFrontEnd from "../../app/frontend/routes/captcha.route.js"

//  WARNING:  ERROR 404 MODULE
import errorsRouteBackEnd from "../../app/backend/routes/errors.route.js"
// import errorsRouteBackEnd from "../../app/frontend/routes/errors.route.js"

//  WARNING:  DO NOT PLACE MORE MODULE

//  NOTE:  CALL ROUTES
// ============================================================

//  NOTE:  BACKEND
app.use(homeRouteBackEnd)
// app.use(usersRouteBackEnd)
// app.use(settingsRouteBackEnd)

//  NOTE:  FRONTEND
// app.use(homeRouteFrontEnd)

//  NOTE:  CAPTCHA
app.use(captchaRouteBackEnd)
// app.use(captchaRouteFrontEnd)

//  WARNING:  ERRORS 404
// app.use(errorsRouteFrontEnd)
app.use(errorsRouteBackEnd)
//  WARNING:  DO NOT PLACE MORE ROUTES
