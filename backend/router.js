import { Router } from "express";
import * as rh from "./requsthandler/user.request.js"


const router=Router();
router.route("/adduser").post(rh.adduser)
export default router