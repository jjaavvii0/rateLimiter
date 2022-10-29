import * as publicCtrl from "../controllers/public.controller" 
import * as rateLimit from "../middlewares/rateLimiter"
import {Router} from "express"
const router = Router()



router.get("/", rateLimit.rateLimitCheck("IP"), publicCtrl.getPublic)




export default router;