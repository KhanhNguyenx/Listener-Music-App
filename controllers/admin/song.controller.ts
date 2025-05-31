import { Request, Response } from "express";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";
import { systemConfig } from "../../config/config";
// [GET] /admin/songs
export const index = async (req: Request, res: Response) => {
  const songs = await Song.find({
    deleted: false,
  })
  res.render("admin/pages/song/index", {
    pageTitle: "Tổng quan",
    songs: songs,
  });
};
// [GET] /admin/songs/create
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
// [POST] /admin/songs/create
export const createPost = async (req: Request, res: Response) => {
  let avatar = "";
  let audio = "";
  if (req.body.avatar) {
    avatar = req.body.avatar[0];
  }
  if (req.body.audio) {
    audio = req.body.audio[0];
  }
  const dataSong = {
    title: req.body.title,
    topicId: req.body.topicId,
    singerId: req.body.singerId,
    description: req.body.description,
    avatar: avatar,
    audio: audio,
    status: req.body.status,
    lyrics: req.body.lyrics,
  }
  const song = new Song(dataSong);
  await song.save();
  res.redirect(`/${systemConfig.prefixAdmin}/songs`);
};
