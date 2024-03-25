const tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;
let playerReady = false;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "0",
    width: "0",
    videoId: ytId,
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
  playerReady = true;
}

function updateCurrentTime() {
  if (player && typeof player.getCurrentTime === "function") {
    // const currentTimeFormatted = new Date(player.getCurrentTime() * 1000)
    //   .toISOString()
    //   .substring(14, 19);
    //if (!isEnd) currentTime.innerText = currentTimeFormatted;
  }
  requestAnimationFrame(updateCurrentTime);
}

function updatePlayerWithNewId(newYtId) {
  if (
    typeof player.stopVideo !== "function" ||
    typeof player.destroy !== "function"
  ) {
    return;
  }
  player.stopVideo();
  player.destroy();

  ytId = newYtId;

  player = new YT.Player("player", {
    height: "0",
    width: "0",
    videoId: ytId,
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });

  playBar.classList.remove("hide");
  playBar.classList.add("show");
  isEnd = false;
}

function onPlayerReady(event) {
  event.target.playVideo();
  event.target.setVolume(volumeValue);
  if (isMute) {
    event.target.mute();
  } else {
    event.target.unMute();
  }
  if (event.target.videoTitle) {
    const formatedTime = new Date(event.target.getDuration() * 1000)
      .toISOString()
      .substring(14, 19);
    totalTime.innerText = formatedTime;
    durationRange.max = Math.floor(event.target.getDuration());
  }
  requestAnimationFrame(updateCurrentTime);
  loading = false;
}

let intervalId;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    clearInterval(intervalId);

    intervalId = setInterval(() => {
      const playerCurrentTime = event.target.getCurrentTime();
      if (!loading) {
        durationRange.value = playerCurrentTime;
      }
      //console.log("Interval", durationRange.value);
    }, 1000);
    event.target.setVolume(volumeValue);
  } else {
    clearInterval(intervalId);
  }
  if (event.data == YT.PlayerState.ENDED) {
    durationRange.value = event.target.getDuration();
    currentTime.innerText = totalTime.innerText;
    if (isRepeat) {
      updatePlayerWithNewId(ytId);
      return;
    }
    setMusicNumber();
    //리스트의 곡이 아니거나 리스트의 마지막 곡일 때
    if (musicNumber === -1 || playListMusics.length === musicNumber + 1) {
      playBtn.classList.add("fa-play");
      playBtn.classList.remove("fa-pause");
      isEnd = true;
      return;
    }
    //리스트의 다음곡 재생
    handleForward();
  }
}
