import YouTube from "react-youtube";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { playerState, playlistState } from "../atom";

const YoutubePlayer = ({ videoId, opts, onStateChange, playerRef }) => {
  const player = useRecoilValue(playerState);
  const setPlayer = useSetRecoilState(playerState);
  const playlist = useRecoilValue(playlistState);

  return (
    <div>
      <YouTube
        videoId={player.ytId}
        opts={opts}
        onReady={(event) => {
          //노래가 바뀔 때 작동
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
