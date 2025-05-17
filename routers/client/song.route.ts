import { Router } from "express";
import * as controller from "../../controllers/client/song.controller";
const router: Router = Router();

router.get("/:slugTopic", controller.list);

router.get("/detail/:slugSong", controller.detail);

router.patch("/like/:typeLike/:idSong", controller.like as any);

router.patch("/favorite/:typeFavorite/:idSong", controller.favorite as any);


export const songRoutes: Router = router;
