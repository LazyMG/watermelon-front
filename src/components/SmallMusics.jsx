import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { playerState, playlistState, selectedMusicState } from "../atom";

const SmallMusicsContent = styled.div`
  /* //width: calc(400px * 3 + 1vw * 2);
  width: calc(23vw * 3 + 1vw * 2);
  //margin: 20px 0;
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 1vw;
  grid-template-rows: repeat(4, 1fr);
  row-gap: 15px;
  overflow-x: hidden; */

  //background-color: yellow;

  display: grid;
  grid-template-columns: repeat(5, minmax(200px, 1fr)); /* 5개 열 설정 */
  grid-template-rows: repeat(4, 50px); /* 4개 행 설정 */
  gap: 1vw; /* 아이템 사이의 간격 설정 */
  width: max-content; /* 콘텐츠 너비가 자식 아이템에 맞춰 조정됨 */
  height: 100%; /* 높이 설정 */
`;

const SmallMusicsContainer = styled.div`
  width: 100%;
`;

const SmallMusicsHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SmallMusicsText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SmallMusicsSubText = styled.div`
  font-size: 15px;
`;

const SmallMusicsTitleText = styled.div`
  font-size: 40px;
  font-weight: bold;
`;

const SmallMusicsButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const SmallMusicsPlayButton = styled.div`
  padding: 10px 20px;
  border: 1px solid #3a3a3a;
  border-radius: 18px;

  cursor: pointer;

  &:hover {
    background-color: #565656;
  }
`;

const SmallMusicsSliderButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const SmallMusicsSliderButton = styled.div`
  border: 1px solid #3a3a3a;
  padding: 5px;
  border-radius: 50%;
  cursor: pointer;
  svg {
    width: 20px;
  }

  &:hover {
    background-color: #565656;
  }
`;

const SmallMusicsContentScroll = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* 마우스 이벤트를 무시하여 컨텐츠와 상호작용 가능하도록 합니다 */
  z-index: 1; /* 컨텐츠 위에 오도록 z-index를 설정합니다 */
`;

const SmallMusic = styled.div`
  /* //width: 400px;
  width: 23vw;
  height: 50px;
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: orange; */

  //background-color: orange;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

const SmallMusicImgContainer = styled.div`
  border-radius: 2px;
  width: 50px;
  height: 50px;
  background: ${({ $imgUrl }) => `url(${$imgUrl})`};
  background-size: cover;
  flex-shrink: 0;

  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const SmallMusicText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
`;

const SmallMusicTitle = styled.div`
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  cursor: pointer;
`;

const SmallMusicDescription = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  a {
    &:hover {
      text-decoration: underline;
    }
  }
`;

const SmallMusicsScrollContainer = styled.div`
  overflow: hidden;
  position: relative;
  height: 285px;

  &:hover ${SmallMusicsContent} {
    overflow-x: overlay;
  }
`;

const SmallMusics = ({ musics }) => {
  const setPlayer = useSetRecoilState(playerState);
  const setSelectedMusic = useSetRecoilState(selectedMusicState);
  const setPlaylist = useSetRecoilState(playlistState);

  const handleClick = (music) => {
    setPlayer((prev) => ({
      ...prev,
      ytId: music.ytId,
      isPlaying: true,
      isPaused: false,
      isEnd: false,
      timestamp: Date.now(),
    }));
    setSelectedMusic(music);
    setPlaylist(musics);
  };

  const clickAddPlaylist = () => {
    setPlaylist(musics);
  };

  return (
    <SmallMusicsContainer>
      <SmallMusicsHeader>
        <SmallMusicsText>
          <SmallMusicsSubText>
            이 노래로 뮤직 스테이션 시작하기
          </SmallMusicsSubText>
          <SmallMusicsTitleText>빠른 선곡</SmallMusicsTitleText>
        </SmallMusicsText>
        <SmallMusicsButtons>
          <SmallMusicsPlayButton onClick={clickAddPlaylist}>
            모두 재생
          </SmallMusicsPlayButton>
          <SmallMusicsSliderButtonContainer>
            <SmallMusicsSliderButton>
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                />
              </svg>
            </SmallMusicsSliderButton>
            <SmallMusicsSliderButton>
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                />
              </svg>
            </SmallMusicsSliderButton>
          </SmallMusicsSliderButtonContainer>
        </SmallMusicsButtons>
      </SmallMusicsHeader>
      <SmallMusicsScrollContainer>
        <SmallMusicsContent>
          {musics?.map((music) => (
            <SmallMusic key={music._id}>
              <SmallMusicImgContainer $imgUrl={music.coverImg} />
              <SmallMusicText>
                <SmallMusicTitle onClick={() => handleClick(music)}>
                  {music.title}
                </SmallMusicTitle>
                <SmallMusicDescription>
                  <Link to={`/channel/${music.artist._id}`}>
                    {music.artist.artistName}
                  </Link>{" "}
                  |{" "}
                  <Link
                    to={{
                      pathname: "/playlist",
                      search: `?list=${music.album._id}`,
                    }}
                  >
                    {music.album.title}
                  </Link>
                </SmallMusicDescription>
              </SmallMusicText>
            </SmallMusic>
          ))}
          {/* {Array.from({ length: 20 }).map((_, idx) => (
            <SmallMusic key={idx}>aaaaaaa</SmallMusic>
          ))} */}
          <SmallMusicsContentScroll />
        </SmallMusicsContent>
      </SmallMusicsScrollContainer>
    </SmallMusicsContainer>
  );
};

export default SmallMusics;
