import { Router } from "express";
import {launchController} from "../controllers/launchController.js";

const router = Router();

router.get("/", launchController.getLaunchs)
router.get("/totais", launchController.getLaunchs)
router.get("/chart", launchController.getChart)
router.post("/", launchController.create)

export default router;