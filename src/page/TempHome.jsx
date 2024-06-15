import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import YoutubePlayer from "../components/YoutubePlayer";
import YouTube from "react-youtube";
import PlayBar from "../components/PlayBar";

const HomeWrapper = styled.div`
  padding-top: 30px;
  padding-left: 10px;
  padding-right: 30px;
  //background-color: blue;
  display: grid;
  grid-template-rows: 0.5fr 2.5fr 2.5fr;
  gap: 5px;
  position: relative;
`;

const HomeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 30px;
`;

const InputDiv = styled.div`
  width: 80%;
  position: relative;
  input {
    width: 50%;
    padding: 10px 15px;
    padding-left: 45px;
    font-size: 15px;
    border-radius: 10px;
  }
  svg {
    width: 25px;
    color: black;
    position: absolute;
    left: 10px;
    top: 8px;
    cursor: pointer;
  }
`;

const LoginButton = styled.div`
  color: black;
  background-color: #d9dbd1;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
`;

const HomeReplaySection = styled.div`
  //background-color: red;
  display: grid;
  grid-template-rows: 0.5fr 3fr;
  padding: 20px;
  padding-bottom: 0;
`;

const ReplayHeader = styled.div`
  //background-color: blue;
  padding-block: 5px;
  padding-left: 10px;
  display: flex;
  align-items: center;
`;

const ReplayTitle = styled.span`
  color: black;
  font-size: 35px;
  font-weight: 600;
`;

const ReplayContainer = styled.div`
  //background-color: green;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 15px;
`;

const ReplayItem = styled.div`
  background-color: green;
`;

const HomeRecommandSection = styled.div`
  //background-color: yellow;
  display: grid;
  grid-template-rows: 0.5fr 3fr;
  padding-inline: 20px;
`;

const RecommandHeader = styled.div`
  padding-block: 5px;
  padding-left: 10px;
  display: flex;
  align-items: center;
`;

const RecommandTitle = styled.span`
  color: black;
  font-size: 35px;
  font-weight: 600;
`;

const RecommandContainer = styled.div`
  //background-color: blue;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  padding-bottom: 80px;
`;

const RecommandColum = styled.div`
  //background-color: red;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  gap: 10px;
`;

const RecommandItem = styled.div`
  background-color: green;
`;

const PlayBarContainer = styled.div`
  z-index: 999;
  position: absolute;
  bottom: 0;
  background-color: red;
  width: 100%;
`;

const TempHome = () => {
  const [playerState, setPlayerState] = useState({
    videoId: "YOUR_DEFAULT_VIDEO_ID",
    isPlaying: false,
    isPaused: false,
    duration: 0,
    currentTime: 0,
  });
  const [loading, setLoading] = useState(true);

  const playerRef = useRef(null);

  useEffect(() => {
    console.log(playerRef.current);
    const player = playerRef.current.internalPlayer;
    let updateTimer;
    if (playerState.isPlaying) {
      updateTimer = setInterval(async () => {
        const currentTime = await player.getCurrentTime();
        const duration = await player.getDuration();
        setPlayerState((prevState) => ({
          ...prevState,
          currentTime,
          duration,
        }));
        if (currentTime && duration) setLoading(false);
      }, 1000);
    }
    // 매 초마다 업데이트
    return () => clearInterval(updateTimer);
  }, [playerState]);

  const getMuscis = async () => {
    const musics = await fetch(
      `${import.meta.env.VITE_BACK_ADDRESS}`
    ).then((res) => res.json());
    console.log(musics);
  };

  useEffect(() => {
    getMuscis();
  }, []);

  // 비디오 변경 이벤트 핸들러
  const handleVideoChange = (videoId) => {
    setPlayerState({
      ...playerState,
      videoId: videoId,
      isPlaying: true,
      isPaused: false,
    });
  };

  const handlePlayPauseToggle = () => {
    const player = playerRef.current.internalPlayer;
    if (playerState.isPlaying) {
      player.pauseVideo();
      setPlayerState({
        ...playerState,
        isPlaying: false,
        isPaused: true,
      });
    } else {
      player.playVideo();
      setPlayerState({
        ...playerState,
        isPlaying: true,
        isPaused: false,
      });
    }
  };

  const handleStop = () => {
    const player = playerRef.current.internalPlayer;
    player.stopVideo();
    setPlayerState({
      ...playerState,
      isPlaying: false,
      isPaused: false,
    });
  };

  // YouTube 플레이어 상태 변경 이벤트 핸들러
  const handlePlayerStateChange = (event) => {
    console.log("Player State:", event.data);
  };

  // YouTube 플레이어 설정
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: playerState.isPlaying ? 1 : 0,
    },
  };

  const videoButtons = [
    { id: "qMNc-Z3Ug44", text: "Video 1" },
    { id: "lZzNsl3xbuI", text: "Video 2" },
  ];

  return (
    <HomeWrapper>
      <HomeHeader>
        <InputDiv>
          <input type="text" placeholder="노래,앨범,아티스트 검색" />
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
            />
          </svg>
        </InputDiv>
        <LoginButton>GoogleLogin</LoginButton>
      </HomeHeader>
      <HomeReplaySection>
        <ReplayHeader>
          <ReplayTitle>다시 듣기</ReplayTitle>
        </ReplayHeader>
        <ReplayContainer>
          <ReplayItem></ReplayItem>
          <ReplayItem></ReplayItem>
          <ReplayItem></ReplayItem>
          <ReplayItem></ReplayItem>
          <ReplayItem></ReplayItem>
          <ReplayItem></ReplayItem>
        </ReplayContainer>
      </HomeReplaySection>
      <HomeRecommandSection>
        <RecommandHeader>
          <RecommandTitle>추천 음악</RecommandTitle>
        </RecommandHeader>
        <RecommandContainer>
          <RecommandColum>
            <RecommandItem></RecommandItem>
            <RecommandItem></RecommandItem>
            <RecommandItem></RecommandItem>
          </RecommandColum>
          <RecommandColum>
            <RecommandItem></RecommandItem>
            <RecommandItem></RecommandItem>
            <RecommandItem></RecommandItem>
          </RecommandColum>
          <RecommandColum>
            <RecommandItem></RecommandItem>
            <RecommandItem></RecommandItem>
            <RecommandItem></RecommandItem>
          </RecommandColum>
          <RecommandColum>
            <RecommandItem></RecommandItem>
            <RecommandItem></RecommandItem>
            <RecommandItem></RecommandItem>
          </RecommandColum>
        </RecommandContainer>
      </HomeRecommandSection>
      <div>
        {videoButtons.map((video, index) => (
          <button key={index} onClick={() => handleVideoChange(video.id)}>
            {video.text}
          </button>
        ))}
      </div>
      <div>
        <YoutubePlayer
          videoId={playerState.videoId}
          onStateChange={handlePlayerStateChange}
          opts={opts}
          playerRef={playerRef}
        />
      </div>
      <PlayBarContainer>
        <PlayBar
          handlePlayPauseToggle={handlePlayPauseToggle}
          handleStop={handleStop}
          playerState={playerState}
          loading={loading}
        />
      </PlayBarContainer>
    </HomeWrapper>
  );
};

export default TempHome;
