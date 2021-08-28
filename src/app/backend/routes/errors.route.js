//  INFO:  ROUTE ERRORS

//  NOTE:  ESLINT FIX
/* global router */

//  NOTE:  IMPORT UTIL
// ============================================================
import authUtil from "../../../settings/utils/auth.util.js"

//  NOTE:  IMPORT MODULE CONTROLLER ERRORS
// ============================================================
import errorsControllerBackEnd from "../controllers/errors.controller.js"

//  NOTE:  ROUTER GET ERRORS
// ============================================================
router.get("/panel/*", authUtil._checkAuthBackEnd("on"), errorsControllerBackEnd.getErrors)

//  NOTE:  EXPORT
// ============================================================
export default router
