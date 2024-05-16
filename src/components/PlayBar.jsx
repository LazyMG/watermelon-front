const PlayBar = ({
  handlePlayPauseToggle,
  playerState,
  handleStop,
  loading,
}) => {
  return (
    <div>
      <button onClick={handlePlayPauseToggle}>
        {playerState?.isPlaying ? "Pause" : "Play"}
      </button>
      <button onClick={handleStop}>Stop</button>
      {loading ? null : (
        <div>{`${playerState?.currentTime}/${playerState?.duration}`}</div>
      )}
    </div>
  );
};

export default PlayBar;
