import { Request, Response } from "express";
import Song from "../../models/song.model";
// [GET] /admin/topic
export const index = async (req: Request, res: Response) => {
  const songs = await Song.find({
    deleted: false,
  })
  res.render("admin/pages/song/index", {
    pageTitle: "Tổng quan",
    songs: songs,
  });
};
// [GET] /admin/topic/create
export const create = async (req: Request, res: Response) => {

  res.render("admin/pages/song/create", {
    pageTitle: "Tạo mới bài hát",
  });
};
