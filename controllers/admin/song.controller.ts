import { Request, Response } from "express";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";
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
  const topics = await Topic.find({
    deleted: false,
    status: "active",
  }).select("title");

  const singers = await Singer.find({
    deleted: false,
    status: "active",
  }).select("fullName");

  res.render("admin/pages/song/create", {
    pageTitle: "Tạo mới bài hát",
    topics: topics,
    singers: singers,
  });
};
