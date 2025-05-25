import { Response, Request } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import { convertToSlug } from "../../helpers/convertToSlug";

//[GET] /search/result
export const result = async (req: Request, res: Response) => {
  const type = req.params.type;
  const keyword: string = `${req.query.keyword}`;

  let searchSongs = [];

  if (keyword) {
    const regex = new RegExp(keyword, "i");

    //Tạo slug từ keyword, thêm - ngăn cách
    const stringSlug = convertToSlug(keyword);
    const stringSlugRegex = new RegExp(stringSlug, "i");

    const songs = await Song.find({
      $or: [
        { title: regex },
        { slug: stringSlugRegex },
      ],
    })

    for (const item of songs) {
      const singer = await Singer.findOne({
        _id: item.singerId,
      });
      searchSongs.push({
        id: item._id,
        title: item.title,
        slug: item.slug,
        avatar: item.avatar,
        like: item.like,
        singer: {
          fullName: singer.fullName,
        },
      });
      // item["singer"] = singer;
    }
    // searchSongs = songs;
  }
  switch (type) {
    case "result":
      res.render("client/pages/search/result", {
        pageTitle: `Kết quả tìm kiếm từ: ${keyword}`,
        songs: searchSongs,
        keyword: keyword,
      });
      break;
    case "suggest":
      res.json({
        status: 200,
        message: "success",
        songs: searchSongs,
      });
      break;
    default:
      break;
  }
};

