import {Router} from "express"
const router = Router()

import * as privateCtrl from "../controllers/private.controller" 
import * as authJwt from "../middlewares/authJwt"
import * as rateLimitByToken from "../middlewares/rateLimitByToken"


router.get("/", [authJwt.verifyToken, rateLimitByToken.checkLimit], privateCtrl.getPrivate)




export default router;