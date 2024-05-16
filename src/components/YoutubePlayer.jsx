import YouTube from "react-youtube";

const YoutubePlayer = ({ videoId, opts, onStateChange, playerRef }) => {
  return (
    <div>
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={(event) => event.target.playVideo()}
        onStateChange={onStateChange}
        ref={playerRef}
      />
    </div>
  );
};

export default YoutubePlayer;
