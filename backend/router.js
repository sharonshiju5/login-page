import { Router } from "express";
import * as rh from "./requsthandler/user.request.js"
import Auth from "./midileware/auth.js";


const router=Router();
router.route("/adduser").post(rh.adduser)
router.route("/login").post(rh.loginUser)
router.route("/home").get(Auth,rh.Home)
export default router