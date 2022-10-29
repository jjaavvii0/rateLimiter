import * as authCtrl from "../controllers/auth.controller" 
import {Router} from "express"
const router = Router()


router.post("/signin", authCtrl.signIn)




export default router;