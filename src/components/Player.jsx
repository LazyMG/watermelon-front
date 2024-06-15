import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { playerState, playlistState, selectedMusicState } from "../atom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect, useRef, useState } from "react";

const PlayBarWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

//range로 변경
const PlayBarTimeline = styled.input`
  position: absolute;
  top: 0;
  width: 100%;
  height: 2px;
  background-color: red;
`;

const PlayBarContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;

  padding: 0 15px;

  //background-color: yellow;
`;

const PlayBarContentControlContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  //background-color: red;
`;

const PlayBarContentControlButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const PlayBarContentControlPlayButton = styled.div`
  width: 45px;

  cursor: pointer;
`;

const PlayBarContentControlMoveButton = styled.div`
  width: 35px;

  cursor: pointer;
`;

const PlayBarContentControlDuration = styled.div`
  font-size: 13px;
`;

const PlayBarContentMainContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const PlayBarContentMainImg = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 5px;
  background: ${({ $imgUrl }) => `url(${$imgUrl})`};
  //background: url("https://i.scdn.co/image/ab67616d00001e028bcb1a80720292aaffb35989");
  background-size: cover;
  flex-shrink: 0;
`;

const PlayBarContentMainInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 300px;
  line-height: 1.3;
`;

const PlayBarContentMainInfoTitle = styled.div`
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PlayBarContentMainInfoOverview = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PlayBarContentMainInfoOverviewArtist = styled.span`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const PlayBarContentMainInfoOverviewAlbum = styled.span`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const PlayBarContentMainUtil = styled.div`
  display: flex;
  gap: 15px;
`;

const PlayBarContentMainButton = styled.div`
  width: 25px;
  padding: 5px;
  box-sizing: content-box;
  border-radius: 50%;

  cursor: pointer;

  &:hover {
    background-color: #a9a9a9;
  }
`;

const PlayBarContentUtilContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const PlayBarContentUtilVolumeButton = styled.div`
  width: 25px;
  position: relative;

  cursor: pointer;

  &:hover {
    input {
      opacity: 1;
    }
  }

  input {
    position: absolute;
    right: 30px;
    top: 3px;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }

  svg:hover {
    opacity: 0.6;
  }
`;

const PlayBarContentRepeatButton = styled.div`
  width: 25px;

  cursor: pointer;

  opacity: ${({ $isRepeat }) => ($isRepeat ? "1" : "0.6")};

  &:hover {
    opacity: ${({ $isRepeat }) => ($isRepeat ? "0.6" : "1")};
  }
`;

const PlayBarContentUtilButton = styled.div`
  width: 25px;

  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;

const Player = ({ setIsPlay, playerRef, isRepeat, setIsRepeat }) => {
  const navigate = useNavigate();
  const [selectedMusic, setSelectedMusic] = useRecoilState(selectedMusicState);
  //const setPlayer = useSetRecoilState(playerState);
  const [player, setPlayer] = useRecoilState(playerState);
  const playlist = useRecoilValue(playlistState);

  const [timeline, setTimeline] = useState(0);
  const [time, setTime] = useState("00:00");
  const [isMusicMuted, setMusicIsMuted] = useState(false);
  const [musicVolume, setMusicVolume] = useState(50);
  const [isWatch, setIsWatch] = useState(false);

  const volumeRef = useRef();

  const toggleWatchMusic = () => {
    if (isWatch) {
      setIsWatch(false);
      navigate("/");
    } else {
      setIsWatch(true);
      navigate(`/watch?v=${selectedMusic.ytId}&list=${selectedMusic._id}`);
    }
  };

  //노래 재생될 때
  useEffect(() => {
    const ytPlayer = playerRef.current?.internalPlayer;
    //console.log(ytPlayer);
    ytPlayer.stopVideo();
    ytPlayer.playVideo();
    setTime("00:00");
    setTimeline(0);
  }, [player.ytId, player.timestamp, playerRef]);

  useEffect(() => {
    const ytPlayer = playerRef.current?.internalPlayer;

    let updateTimer;

    if (player.isPlaying) {
      updateTimer = setInterval(async () => {
        const currentTime = await ytPlayer.getCurrentTime();
        setTimeline(Math.floor(currentTime));
        const formatedTime = new Date(currentTime * 1000)
          .toISOString()
          .substring(14, 19);
        setTime(formatedTime);
      }, 1000);
    }
    // 매 초마다 업데이트
    return () => clearInterval(updateTimer);
  }, [time, player]);

  const handlePlayPauseToggle = () => {
    const ytPlayer = playerRef.current?.internalPlayer;
    if (player.isPlaying) {
      ytPlayer.pauseVideo();
      setPlayer((prev) => ({
        ...prev,
        isPlaying: false,
        isPaused: true,
      }));
      setIsPlay((prev) => !prev);
    } else {
      ytPlayer.playVideo();
      setPlayer((prev) => ({
        ...prev,
        isPlaying: true,
        isPaused: false,
      }));
      setIsPlay((prev) => !prev);
    }
  };

  //노래 끝났을 때 처리
  const timelineChange = (event) => {
    const ytPlayer = playerRef.current?.internalPlayer;
    const newTimeline = event.target.value;
    setTimeline(newTimeline);
    // setYtPlayerState((prevState) => ({
    //   ...prevState,
    //   currentTime: event.target.value,
    // }));
    const formatedTime = new Date(newTimeline * 1000)
      .toISOString()
      .substring(14, 19);
    setTime(formatedTime);
    ytPlayer.seekTo(newTimeline, true);
  };

  const clickMusicArtist = (artistId) => {
    navigate(`/channel/${artistId}`);
  };

  const clickAlbumTitle = (albumId) => {
    navigate(`/playlist?list=${albumId}`);
  };

  const clickToggleMute = async () => {
    const ytPlayer = playerRef.current?.internalPlayer;
    const volume = await ytPlayer.getVolume();
    console.log(volume);
    const musicIsMuted = await ytPlayer.isMuted();
    if (musicIsMuted) {
      setMusicIsMuted(false);
      setMusicVolume(volumeRef.current);
      setPlayer((prev) => ({
        ...prev,
        isMuted: false,
        volume: volumeRef.current,
      }));
      ytPlayer.unMute();
    } else {
      setMusicIsMuted(true);
      volumeRef.current = musicVolume;
      setMusicVolume(0);
      setPlayer((prev) => ({
        ...prev,
        isMuted: true,
        volume: 0,
      }));
      ytPlayer.mute();
    }
  };

  const changeVolume = (event) => {
    const ytPlayer = playerRef.current?.internalPlayer;
    volumeRef.current = event.target.value;
    setMusicVolume(event.target.value);
    ytPlayer.setVolume(event.target.value);
    setPlayer((prev) => ({
      ...prev,
      volume: +event.target.value,
    }));
    if (+event.target.value === 0) {
      setMusicIsMuted(true);
      setPlayer((prev) => ({
        ...prev,
        isMuted: true,
        volume: 0,
      }));
    } else {
      setMusicIsMuted(false);
    }
  };

  const clickNextMusic = () => {
    if (!playlist || playlist.length === 0) return;
    const currentIndex = playlist.findIndex(
      (item) => item.ytId === player.ytId
    );
    console.log("next", currentIndex);
    if (currentIndex === playlist.length - 1) {
      return;
    }
    setPlayer((prev) => ({
      ...prev,
      ytId: playlist[currentIndex + 1].ytId,
      isPlaying: true,
      isPaused: false,
    }));
    setSelectedMusic(playlist[currentIndex + 1]);
  };

  const clickPrevMusic = async () => {
    const ytPlayer = playerRef.current?.internalPlayer;
    const currentTime = await ytPlayer.getCurrentTime();
    if (currentTime < 3) {
      console.log("short");
      setPlayer((prev) => ({
        ...prev,
        ytId: selectedMusic.ytId,
        isPlaying: true,
        isPaused: false,
        timestamp: Date.now(),
      }));
      console.log("setting");
    }
    setSelectedMusic(selectedMusic);
    if (!playlist || playlist.length === 0) return;

    const currentIndex = playlist.findIndex(
      (item) => item.ytId === player.ytId
    );
    console.log("prev", currentIndex);
    if (currentIndex === 0) {
      return;
    }
    setPlayer((prev) => ({
      ...prev,
      ytId: playlist[currentIndex - 1].ytId,
      isPlaying: true,
      isPaused: false,
    }));
    setSelectedMusic(playlist[currentIndex - 1]);
  };

  return (
    <PlayBarWrapper>
      <PlayBarTimeline
        type="range"
        value={timeline}
        max={player.duration}
        onChange={timelineChange}
      />
      <PlayBarContentContainer>
        <PlayBarContentControlContainer>
          <PlayBarContentControlButtons>
            <PlayBarContentControlMoveButton onClick={clickPrevMusic}>
              <svg
                fill="none"
                strokeWidth={1.5}
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
                />
              </svg>
            </PlayBarContentControlMoveButton>
            <PlayBarContentControlPlayButton onClick={handlePlayPauseToggle}>
              {/* {isPlay ? (
                <svg
                  fill="none"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                  />
                </svg>
              ) : isEnd ? (
                <svg
                  fill="none"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z"
                  />
                </svg>
              ) : (
                <svg
                  fill="none"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                  />
                </svg>
              )} */}
              {player?.isPlaying ? (
                <svg
                  fill="none"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                  />
                </svg>
              ) : player?.isPaused ? (
                <svg
                  fill="none"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                  />
                </svg>
              ) : (
                <svg
                  fill="none"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z"
                  />
                </svg>
              )}
            </PlayBarContentControlPlayButton>
            <PlayBarContentControlMoveButton onClick={clickNextMusic}>
              <svg
                fill="none"
                strokeWidth={1.5}
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
                />
              </svg>
            </PlayBarContentControlMoveButton>
          </PlayBarContentControlButtons>
          <PlayBarContentControlDuration>
            {time}/{selectedMusic?.duration}
          </PlayBarContentControlDuration>
        </PlayBarContentControlContainer>
        <PlayBarContentMainContainer>
          <PlayBarContentMainImg $imgUrl={selectedMusic?.coverImg} />
          <PlayBarContentMainInfo>
            <PlayBarContentMainInfoTitle>
              {selectedMusic?.title}
            </PlayBarContentMainInfoTitle>
            <PlayBarContentMainInfoOverview>
              <PlayBarContentMainInfoOverviewArtist
                onClick={() => clickMusicArtist(selectedMusic?.artist._id)}
              >
                {selectedMusic?.artist.artistName}
              </PlayBarContentMainInfoOverviewArtist>
              •{" "}
              <PlayBarContentMainInfoOverviewAlbum
                onClick={() => clickAlbumTitle(selectedMusic?.album._id)}
              >
                {selectedMusic?.album.title}
              </PlayBarContentMainInfoOverviewAlbum>{" "}
              • 2024
            </PlayBarContentMainInfoOverview>
          </PlayBarContentMainInfo>
          <PlayBarContentMainUtil>
            <PlayBarContentMainButton>
              <svg
                fill="none"
                strokeWidth={1.5}
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
                />
              </svg>
            </PlayBarContentMainButton>
            <PlayBarContentMainButton>
              <svg
                fill="none"
                strokeWidth={1.5}
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                />
              </svg>
            </PlayBarContentMainButton>
            <PlayBarContentMainButton>
              <svg
                fill="none"
                strokeWidth={1.5}
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                />
              </svg>
            </PlayBarContentMainButton>
          </PlayBarContentMainUtil>
        </PlayBarContentMainContainer>
        <PlayBarContentUtilContainer>
          <PlayBarContentUtilVolumeButton>
            {isMusicMuted ? (
              <svg
                fill="none"
                strokeWidth={1.5}
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                onClick={clickToggleMute}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                />
              </svg>
            ) : (
              <svg
                fill="none"
                strokeWidth={1.5}
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                onClick={clickToggleMute}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                />
              </svg>
            )}
            <input
              type="range"
              value={musicVolume}
              max={100}
              onChange={changeVolume}
            />
          </PlayBarContentUtilVolumeButton>
          <PlayBarContentRepeatButton
            onClick={() => setIsRepeat(true)}
            $isRepeat={isRepeat}
          >
            <svg
              fill="none"
              strokeWidth={1.5}
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
              />
            </svg>
          </PlayBarContentRepeatButton>
          <PlayBarContentUtilButton>
            <svg
              fill="none"
              strokeWidth={1.5}
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
              />
            </svg>
          </PlayBarContentUtilButton>
          <PlayBarContentUtilButton onClick={toggleWatchMusic}>
            {isWatch ? (
              <svg
                fill="none"
                strokeWidth={1.5}
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            ) : (
              <svg
                fill="none"
                strokeWidth={1.5}
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 15.75 7.5-7.5 7.5 7.5"
                />
              </svg>
            )}
          </PlayBarContentUtilButton>
        </PlayBarContentUtilContainer>
      </PlayBarContentContainer>
    </PlayBarWrapper>
  );
};

export default Player;
