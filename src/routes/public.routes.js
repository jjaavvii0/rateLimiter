import {Router} from "express"
const router = Router()

import * as publicCtrl from "../controllers/public.controller" 

router.get("/", publicCtrl.getPublic)




export default router;