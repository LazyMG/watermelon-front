import { useEffect, useState } from "react";
import YouTube from "react-youtube";

const YoutubePlayer = ({ ytId, pause }) => {
  const [player, setPlayer] = useState(null);
  const [videoId, setVideoId] = useState(ytId);
  const [loading, setLoading] = useState(false);

  const onPlayerReady = (event) => {
    if (videoId) {
      setLoading(false);
      // console.log("ready!");
      // console.log(ytId, videoId);
      setPlayer(event.target);
      event.target.playVideo();
      player.playVideo();
    }
  };

  const onPlayerStateChange = (event) => {
    // event.data 값 => 1 재생 중, 2 일시중지, 0 종료 https://developers.google.com/youtube/iframe_api_reference?hl=ko#onPlaybackRateChange
    // if (!event.data) {
    //   const player = event.target;
    //   player.seekTo(5);
    //   player.playVideo();
    // }
    //event.target.playVideo();
    // if (event.data) {
    //   player.playVideo();
    // } else if (event.data === 2) {
    //   player.pauseVideo();
    // }
    console.log("change");
  };

  useEffect(() => {
    console.log("player", player);
    console.log("ytId: ", ytId);
    setVideoId(ytId);
    if (!player) {
      return;
    } else {
      setLoading(true);
      setPlayer(null);
      //player.playVideo();
    }
    if (pause) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  }, [player, pause, ytId]);

  const opts = {
    height: "300",
    width: "600",
    playerVars: {
      autoPlay: 1,
    },
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={onPlayerReady}
          // onStateChange={onPlayerStateChange}
        />
      )}
    </>
  );
};

export default YoutubePlayer;
