import {Router} from "express"
const router = Router()

import * as privateCtrl from "../controllers/private.controller" 
import * as authJwt from "../middlewares/authJwt"
import * as rateLimit from "../middlewares/rateLimiter"


router.get("/", [authJwt.verifyToken, rateLimit.checkLimit("TOKEN")], privateCtrl.getPrivate)




export default router;