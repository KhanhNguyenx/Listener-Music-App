import { Response, Request } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import { convertToSlug } from "../../helpers/convertToSlug";

//[GET] /search/result
export const result = async (req: Request, res: Response) => {
  const keyword: string = `${req.query.keyword}`;

  let searchSongs = [];

  if (keyword) {
    const regex = new RegExp(keyword, "i");

    //Tạo slug từ keyword, thêm - ngăn cách
    const stringSlug = convertToSlug(keyword);
    const stringSlugRegex = new RegExp(stringSlug, "i");

    const songs = await Song.find({
      $or: [
        {title: regex},
        {slug: stringSlugRegex},
      ],
    })
    for (const item of songs) {
      const singer = await Singer.findOne({
        _id: item.singerId,
      });
      item["singer"] = singer;
    }
    searchSongs = songs;
  }

  res.render("client/pages/search/result", {
    pageTitle: `Kết quả tìm kiếm từ: ${keyword}`,
    songs: searchSongs,
    keyword: keyword,
  });
};