import * as privateCtrl from "../controllers/private.controller" 
import * as authJwt from "../middlewares/authJwt"
import * as rateLimit from "../middlewares/rateLimiter"
import {Router} from "express"
const router = Router()




router.get("/", [authJwt.verifyToken, rateLimit.rateLimitCheck("TOKEN")], privateCtrl.getPrivate)




export default router;