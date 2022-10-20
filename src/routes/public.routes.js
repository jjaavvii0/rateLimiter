import {Router} from "express"
const router = Router()

import * as publicCtrl from "../controllers/public.controller" 
import * as rateLimitByIP from "../middlewares/rateLimitByIP"

router.get("/", rateLimitByIP.checkLimit, publicCtrl.getPublic)




export default router;