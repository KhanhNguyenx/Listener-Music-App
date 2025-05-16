// Aplayer
const aplayer = document.querySelector("#aplayer");
if(aplayer) {
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
        lrc: dataSong.lyrics
      }
    ],
    autoplay: true
  });

  const avatar = document.querySelector(".singer-detail .inner-avatar");

  ap.on('play', function () {
    avatar.style.animationPlayState = "running";
  });

  ap.on('pause', function () {
    avatar.style.animationPlayState = "paused";
  });

  ap.on('ended', function () {
    fetch(`/songs/listen/${dataSong._id}`, {
      method: "PATCH"
    })
      .then(res => res.json())
      .then(data => {
        if(data.code == "success") {
          document.querySelector(".singer-detail .inner-listen span").innerHTML = data.listen;
        }
      })
  });
}
// End Aplayer