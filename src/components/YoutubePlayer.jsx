import YouTube from "react-youtube";
import { useRecoilValue } from "recoil";
import { playerState } from "../atom";

const YoutubePlayer = ({ videoId, opts, onStateChange, playerRef }) => {
  const player = useRecoilValue(playerState);
  return (
    <div>
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={(event) => {
          if (!player.isMuted) {
            event.target.setVolume(player.volume);
          } else {
            event.target.mute();
          }
          event.target.playVideo();
        }} //여기서 볼륨 mute 설정
        onStateChange={onStateChange}
        ref={playerRef}
      />
    </div>
  );
};

export default YoutubePlayer;
