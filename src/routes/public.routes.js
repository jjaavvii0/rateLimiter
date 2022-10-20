import {Router} from "express"
const router = Router()

import * as publicCtrl from "../controllers/public.controller" 
import * as rateLimit from "../middlewares/rateLimiter"


router.get("/", rateLimit.checkLimit("IP"), publicCtrl.getPublic)




export default router;