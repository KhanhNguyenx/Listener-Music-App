// Aplayer
const aplayer = document.querySelector("#aplayer");
if (aplayer) {
  const dataSong = JSON.parse(aplayer.getAttribute("data-song"));
  const dataSinger = JSON.parse(aplayer.getAttribute("data-singer"));

  const ap = new APlayer({
    container: aplayer,
    lrcType: 1,
    audio: [
      {
        name: dataSong.title,
        artist: dataSinger.fullName,
        url: dataSong.audio,
        cover: dataSong.avatar,
        lrc: dataSong.lyrics,
      },
    ],
    autoplay: true,
  });

  const avatar = document.querySelector(".singer-detail .inner-avatar");

  ap.on("play", function () {
    avatar.style.animationPlayState = "running";
  });

  ap.on("pause", function () {
    avatar.style.animationPlayState = "paused";
  });

  ap.on("ended", function () {
    fetch(`/songs/listen/${dataSong._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code == "success") {
          document.querySelector(
            ".singer-detail .inner-listen span"
          ).innerHTML = data.listen;
        }
      });
  });
}
// End Aplayer

//Like
const likeBtn = document.querySelector("[button-like]");

if (likeBtn) {
  likeBtn.addEventListener("click", function () {
    const idSong = likeBtn.getAttribute("button-like");
    const isActive = likeBtn.classList.contains("active");

    const typeLike = isActive ? "dislike" : "like";

    const link = `/songs/like/${typeLike}/${idSong}`;

    const options = {
      method: "PATCH",
    };

    fetch(link, options)
      .then((res) => res.json())
      .then((data) => {
        if (data.code == 200) {
          const likeCount = likeBtn.querySelector("span");
          likeCount.innerHTML = `${data.like}`;

          likeBtn.classList.toggle("active");
        }
      });
  });
}
//End Like

//Favorite
const listFavoriteBtn = document.querySelectorAll("[button-favorite]");
if (listFavoriteBtn.length > 0) {
  listFavoriteBtn.forEach((favoriteBtn) => {
    favoriteBtn.addEventListener("click", function () {
      const idSong = favoriteBtn.getAttribute("button-favorite");
      const isActive = favoriteBtn.classList.contains("active");

      const typeFavorite = isActive ? "unfavorite" : "favorite";

      const link = `/songs/favorite/${typeFavorite}/${idSong}`;

      const options = {
        method: "PATCH",
      };

      fetch(link, options)
        .then((res) => res.json())
        .then((data) => {
          if (data.code == 200) {
            favoriteBtn.classList.toggle("active");
          }
        });
    });
  });
}
//End Favorite

//Search Suggest
const searchInput = document.querySelector(".box-search");
if (searchInput) {
  const input = searchInput.querySelector("input[name='keyword']");
  const boxSuggest = searchInput.querySelector(".inner-suggest");

  input.addEventListener("keyup", () => {
    const keyword = input.value;

    const link = `/search/suggest?keyword=${keyword}`;

    fetch(link)
      .then((res) => res.json())
      .then((data) => {
        const songs = data.songs;
        if (songs.length > 0) {
          boxSuggest.classList.add("show");

          const htmls = songs.map((song) => {
            return `
              <a class="inner-item" href="/songs/detail/${song.slug}">
                <div class="inner-image"><img src="${song.avatar}" /></div>
                <div class="inner-info">
                  <div class="inner-title">${song.title}</div>
                  <div class="inner-singer">
                    <i class="fa-solid fa-microphone-lines"></i> ${song.singer.fullName}
                  </div>
                </div>
              </a>
            `;
          });

          const boxList = boxSuggest.querySelector(".inner-list");
          boxList.innerHTML = htmls.join("");
        } else {
          boxSuggest.classList.remove("show");
        }
      });
  });
}
