import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled, { css } from "styled-components";
import { playerState, playlistState, selectedMusicState } from "../atom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Scrollbar } from "swiper/modules";
import { useRef, useState } from "react";
import "swiper/swiper-bundle.css";
import "swiper/css/scrollbar";
import { musicsDB } from "../localDB/musicsDB";

const SmallMusicsContent = styled.div`
  width: calc(410px * 3 + 15px * 2);
  width: 100%;
  //margin: 20px 0;
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 15px;
  grid-template-rows: repeat(4, 1fr);
  row-gap: 15px;
  overflow-x: hidden;
`;

const SmallMusicsContainer = styled.div`
  width: 100%;
  //background-color: orange;
`;

const SmallMusicsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 100px;
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

  /* &:hover {
    background-color: #565656;
  } */

  ${({ disabled }) =>
    disabled
      ? css`
          opacity: 0.3;
          cursor: auto;
        `
      : css`
          &:hover {
            background-color: #565656;
          }
        `}
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
  width: 410px;
  height: 50px;
  display: flex;
  align-items: center;
  gap: 10px;

  //background-color: yellow;
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
  margin: 0 100px;

  &:hover ${SmallMusicsContent} {
    overflow-x: overlay;
  }
`;

// 전체 컨테이너
const Container = styled.div`
  width: 100%;
  color: #fff;
  //padding: 20px;
  margin: 15px auto 0px;
  padding: 0 100px;

  /* Custom Scrollbar Style */
  .swiper-scrollbar {
    background-color: #1c1c1c; /* 트랙 색상 */
    height: 5px; /* 스크롤바의 높이 조정 */
    border-radius: 0;
  }

  .swiper-scrollbar-drag {
    background-color: #606060; /* 핸들 색상 */
    height: 5px; /* 스크롤바의 높이 조정 */
    border-radius: 0;
  }

  /* For browsers that support the standard scrollbar styling */
  .swiper-scrollbar {
    scrollbar-color: #606060 #1c1c1c; /* 핸들 및 트랙 색상 */
    scrollbar-width: thin; /* 스크롤바 두께를 'thin', 'auto', 'none' 중 선택 가능 */
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

  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
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
            <SmallMusicsSliderButton disabled={isBeginning} onClick={goPrev}>
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
            <SmallMusicsSliderButton disabled={isEnd} onClick={goNext}>
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
      <Container>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Swiper
            ref={swiperRef}
            modules={[Grid, Scrollbar]}
            grid={{
              rows: 4, // 4행 구성
              fill: "row", // 열을 기준으로 그리드 채우기
            }}
            slidesPerView={3} // 한 번에 3개의 슬라이드 보이게 설정
            spaceBetween={10} // 슬라이드 간의 간격 설정
            // style={{ width: "600px" }} // 보이는 영역의 너비를 설정하여 3열이 보이도록 조절
            allowTouchMove={false}
            scrollbar={{ draggable: true }}
            onReachBeginning={() => setIsBeginning(true)}
            onReachEnd={() => setIsEnd(true)}
            onFromEdge={() => {
              setIsBeginning(false);
              setIsEnd(false);
            }}
            style={{ paddingBottom: "15px" }}
          >
            {/* {musics?.map((music, index) => (
              <SwiperSlide key={index}>
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
              </SwiperSlide>
            ))} */}
            {musicsDB.map((music, index) => (
              <SwiperSlide key={index}>
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
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </SmallMusicsContainer>
  );
};

export default SmallMusics;
