import { Router } from "express";
import multer from "multer";
import * as controller from "../../controllers/admin/song.controller";
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware";
const router: Router = Router();
const upload = multer();

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", upload.single("avatar"), uploadCloud.uploadSingle, controller.createPost);

export const songRoutes: Router = router;
