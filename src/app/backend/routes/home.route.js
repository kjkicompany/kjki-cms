//  INFO:  ROUTE HOME

//  NOTE:  IMPORT UTIL
// ============================================================
import authUtil from "../../../settings/utils/auth.util.js"

//  NOTE:  IMPORT MODULE CONTROLLER HOME
// ============================================================
import homeControllerBackEnd from "../controllers/home.controller.js"

//  NOTE:  ESLINT FIX
/* global router */

//  NOTE:  ROUTER GET HOME
// ============================================================
router.get("/panel", authUtil._checkAuthBackEnd("home"), homeControllerBackEnd.getHome)

//  NOTE:  ROUTER GET POST SIGN UP, ACTIVATE AND RESEND PARAM TOKEN ACCOUNT
// ============================================================
router.get("/panel/signup", authUtil._checkAuthBackEnd("off"), homeControllerBackEnd.getSignUp)
router.post("/panel/signup", authUtil._checkAuthBackEnd("off"), homeControllerBackEnd.postSignUp)
router.get("/panel/activate/:tokenAccount", authUtil._checkAuthBackEnd("off"), homeControllerBackEnd.getSignUpActivate)
router.post("/panel/activate/:tokenAccount", authUtil._checkAuthBackEnd("off"), homeControllerBackEnd.postSignUpActivate)
router.post("/panel/activate/resend/:tokenAccount", authUtil._checkAuthBackEnd("off"), homeControllerBackEnd.postSignUpActivateReSend)

//  NOTE:  ROUTER GET POST LOG IN, VERIFY AND RESEND PARAM TOKEN ACCOUNT
// ============================================================
router.get("/panel/login", authUtil._checkAuthBackEnd("off"), homeControllerBackEnd.getLogIn)
router.post("/panel/login", authUtil._checkAuthBackEnd("off"), homeControllerBackEnd.postLogIn)
router.get("/panel/login/verify/:tokenAccount", authUtil._checkAuthBackEnd("off"), homeControllerBackEnd.getLogInVerify)
router.post("/panel/login/verify/:tokenAccount", authUtil._checkAuthBackEnd("off"), homeControllerBackEnd.postLogInVerify)
router.post("/panel/login/verify/resend/:tokenAccount", authUtil._checkAuthBackEnd("off"), homeControllerBackEnd.postLogInVerifyReSend)

//  NOTE:  ROUTER GET POST RECOVERY AND RESET PARAM TOKEN RESET
// ============================================================
router.get("/panel/recovery", authUtil._checkAuthBackEnd("off"), homeControllerBackEnd.getRecovery)
router.post("/panel/recovery", authUtil._checkAuthBackEnd("off"), homeControllerBackEnd.postRecovery)
router.get("/panel/recovery/reset/:tokenReset", authUtil._checkAuthBackEnd("off"), homeControllerBackEnd.getRecoveryReset)
router.post("/panel/recovery/reset/:tokenReset", authUtil._checkAuthBackEnd("off"), homeControllerBackEnd.postRecoveryReset)

//  NOTE:  ROUTER GET LOG OUT
// ============================================================
router.get("/panel/logout", authUtil._checkAuthBackEnd("on"), homeControllerBackEnd.getLogOut)

//  NOTE:  EXPORT
// ============================================================
export default router
