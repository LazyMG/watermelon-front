import { useEffect, useState } from "react";
import YouTube from "react-youtube";

const YoutubePlayer = ({ ytId, pause }) => {
  const [player, setPlayer] = useState();

  const onPlayerReady = (event) => {
    if (ytId) {
      console.log("ready!");
      event.target.playVideo();
      setPlayer(event.target);
    }

    if (pause) {
      //console.log(pause);
      player.pauseVideo();
    }

    //console.log(event.target);
  };

  const onPlayerStateChange = (event) => {
    // event.data 값 => 1 재생 중, 2 일시중지, 0 종료 https://developers.google.com/youtube/iframe_api_reference?hl=ko#onPlaybackRateChange
    //console.log(event.data);
    if (!event.data) {
      const player = event.target;
      player.seekTo(5);
      player.playVideo();
    }
    //event.target.playVideo();
  };

  useEffect(() => {
    console.log("player", player);
    if (!player) return;
    player?.playVideo();
  }, [player, pause, ytId]);

  const opts = {
    height: "300",
    width: "600",
    // playerVars: {
    //   autoPlay: 1,
    // },
  };

  return (
    <YouTube
      videoId={ytId}
      opts={opts}
      onReady={onPlayerReady}
      onStateChange={onPlayerStateChange}
    />
  );
};

export default YoutubePlayer;
