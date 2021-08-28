//  INFO:  ROUTE CAPTCHA

//  NOTE:  ESLINT FIX
/* global router */

//  NOTE:  IMPORT MODULE CONTROLLER CAPTCHA
// ============================================================
import captchaControllerBackEnd from "../controllers/captcha.controller.js"

//  NOTE:  ROUTER GET CAPTCHA
// ============================================================
router.get("/panel/captcha", captchaControllerBackEnd.getCaptcha)

//  NOTE:  EXPORT
// ============================================================
export default router
