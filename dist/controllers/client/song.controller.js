"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listen = exports.favorite = exports.like = exports.detail = exports.list = void 0;
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const song_model_1 = __importDefault(require("../../models/song.model"));
const favorite_song_model_1 = __importDefault(require("../../models/favorite-song.model"));
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slugTopic = req.params.slugTopic;
    const topic = yield topic_model_1.default.findOne({
        slug: slugTopic,
        deleted: false,
        status: "active"
    }).select("title");
    const songs = yield song_model_1.default.find({
        topicId: topic._id,
        deleted: false,
        status: "active"
    }).select("avatar title singerId like slug");
    for (const item of songs) {
        const singer = yield singer_model_1.default.findOne({
            _id: item.singerId,
            deleted: false
        }).select("fullName");
        item["singer"] = singer;
    }
    res.render("client/pages/songs/list", {
        pageTitle: topic.title,
        topic: topic,
        songs: songs
    });
});
exports.list = list;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slugSong = req.params.slugSong;
    const song = yield song_model_1.default.findOne({
        slug: slugSong,
        deleted: false,
        status: "active"
    });
    const singer = yield singer_model_1.default.findOne({
        _id: song.singerId
    }).select("fullName");
    const topic = yield topic_model_1.default.findOne({
        _id: song.topicId
    }).select("title");
    const existSongInFavorite = yield favorite_song_model_1.default.findOne({
        songId: song.id,
    });
    song["isFavoriteSong"] = existSongInFavorite ? true : false;
    res.render("client/pages/songs/detail", {
        pageTitle: "Chi tiết bài hát",
        song: song,
        singer: singer,
        topic: topic
    });
});
exports.detail = detail;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const typeLike = req.params.typeLike;
    const song = yield song_model_1.default.findOne({
        _id: idSong,
        deleted: false,
        status: "active"
    });
    if (!song) {
        return res.status(404).json({
            message: "Bài hát không tồn tại"
        });
    }
    const newLike = typeLike == "like" ? song.like + 1 : song.like - 1;
    yield song_model_1.default.updateOne({ _id: idSong }, { like: newLike });
    res.json({
        code: 200,
        message: "Thích bài hát thành công",
        like: newLike
    });
});
exports.like = like;
const favorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const typeFavorite = req.params.typeFavorite;
    switch (typeFavorite) {
        case "favorite":
            const existSongInFavorite = yield favorite_song_model_1.default.findOne({
                songId: idSong,
            });
            if (!existSongInFavorite) {
                const record = new favorite_song_model_1.default({
                    songId: idSong,
                    user: ""
                });
                yield record.save();
            }
            break;
        case "unfavorite":
            yield favorite_song_model_1.default.deleteOne({
                songId: idSong,
            });
            break;
        default:
            break;
    }
    res.json({
        code: 200,
        message: "Thích bài hát thành công",
    });
});
exports.favorite = favorite;
const listen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const song = yield song_model_1.default.findOne({
        _id: idSong,
    });
    if (!song) {
        return res.status(404).json({
            message: "Bài hát không tồn tại"
        });
    }
    const newListen = song.listen + 1;
    yield song_model_1.default.updateOne({ _id: idSong }, { listen: newListen });
    const songNew = yield song_model_1.default.findOne({
        _id: idSong,
    }).select("listen");
    res.json({
        code: 200,
        message: "Nghe bài hát thành công",
        listen: songNew
    });
});
exports.listen = listen;
