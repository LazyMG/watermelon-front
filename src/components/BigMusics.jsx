import { useRecoilValue, useSetRecoilState } from "recoil";
import styled, { css } from "styled-components";
import {
  authState,
  playerState,
  recentPlaylistState,
  selectedMusicState,
} from "../atom";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import { useRef, useState } from "react";
import "swiper/swiper-bundle.css";
import "swiper/css/scrollbar";
import { musicsDB } from "../localDB/musicsDB";

const BigMusicsContainer = styled.div`
  width: 100%;

  //background-color: red;
`;

const BigMusicsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 100px;
`;

const BigMusicsHeaderInfo = styled.div`
  display: flex;
  gap: 10px;
`;

const BigMusicsHeaderIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  svg {
    width: 60px;
  }
`;

const BigMusicsHeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const BigMusicsHeaderSubText = styled.div`
  font-size: 15px;
`;

const BigMusicsHeaderTitle = styled.div`
  font-size: 40px;
  font-weight: bold;
`;

const BigMusicsHeaderButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const BigMusicsHeaderPlayButton = styled.div`
  padding: 10px 20px;
  border: 1px solid #3a3a3a;
  border-radius: 18px;

  cursor: pointer;

  &:hover {
    background-color: #565656;
  }
`;

const BigMusicsHeaderSliderButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const BigMusicsHeaderSliderButton = styled.div`
  border: 1px solid #3a3a3a;
  padding: 5px;
  border-radius: 50%;
  cursor: pointer;
  svg {
    width: 20px;
  }

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

const BigMusic = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  //background-color: yellow;
`;

const BigMusicImgContainer = styled.div`
  border-radius: 5px;
  width: 190px;
  height: 190px;
  background: ${({ $imgUrl }) => `url(${$imgUrl})`};
  background-size: cover;
  flex-shrink: 0;

  cursor: pointer;
`;

const BigMusicInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
`;

const BigMusicTitle = styled.div`
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 190px;
  cursor: pointer;
`;

const BigMusicDescription = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 130px;
`;

const BigMusicDescriptionArtist = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

// 전체 컨테이너
const Container = styled.div`
  width: 100%;
  color: #fff;
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

const BigMusicCircleContentItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  //width: 200px;
  padding: 0;
`;

const BigMusicCircleContentImg = styled.div`
  background: ${({ $imgUrl }) => ($imgUrl ? `url(${$imgUrl})` : `url('')`)};
  border-radius: ${({ $isAlbum }) => ($isAlbum ? "5px" : "50%")};
  background-size: cover;

  width: 200px;
  height: 200px;

  border-radius: 50%;
`;

const BigMusicCircleContentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  align-items: center;
`;

const BigMusicCircleContentName = styled.div`
  font-size: 15px;
  font-weight: bold;

  cursor: pointer;
`;

const BigMusicrCircleContentTime = styled.div`
  font-size: 15px;
`;

const BigMusicCircleContentHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const BigMusicCircleContentHeaderSmall = styled.div`
  font-size: 16px;
`;

const BigMusicCircleContentHeaderBig = styled.div`
  font-size: 20px;
  font-weight: 800;
`;

const BigMusics = ({
  contents,
  isCustom = false,
  title,
  isCircle = false,
  isAlbum = false,
  subtext = "",
}) => {
  const setPlayer = useSetRecoilState(playerState);
  const setSelectedMusic = useSetRecoilState(selectedMusicState);
  const navigate = useNavigate();
  const auth = useRecoilValue(authState);
  const setRecentPlaylist = useSetRecoilState(recentPlaylistState);

  console.log(window.innerWidth); //너비 계산 후 조정

  const clickPlayMusic = async (music) => {
    setPlayer((prev) => ({
      ...prev,
      ytId: music.ytId,
      isPlaying: true,
      isPaused: false,
      isEnd: false,
      timestamp: Date.now(),
    }));
    setSelectedMusic(music);
    setRecentPlaylist((prev) => [...prev, music]);
    //노래 조회수 추가
    //최근 음악에 추가 api 호출
    const userId = auth?.user?.userId;
    if (!userId) return;
    const result = await fetch(
      `${import.meta.env.VITE_BACK_ADDRESS}/user/${userId}/add-recentMusic`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ music }),
      }
    )
      .then((response) => response.json())
      .catch((error) => console.error("Error:", error));
    if (!result.ok) {
      console.log(result.message);
    } else {
      console.log(result.message, "success");
    }
  };

  const clickArtistName = (artistId) => {
    navigate(`/channel/${artistId}`);
  };

  const gotoMyChannel = () => {
    //console.log(auth);
    const userId = auth.user?.userId;
    if (!userId) return;
    navigate(`/channel/${userId}`);
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

  const clickAlbumTitle = (albumId) => {
    navigate(`/playlist?list=${albumId}`);
  };

  return (
    <BigMusicsContainer>
      <BigMusicsHeader>
        {isCircle ? (
          <BigMusicCircleContentHeader>
            <BigMusicCircleContentHeaderSmall>
              {subtext}
            </BigMusicCircleContentHeaderSmall>
            <BigMusicCircleContentHeaderBig>
              {title}
            </BigMusicCircleContentHeaderBig>
          </BigMusicCircleContentHeader>
        ) : (
          <BigMusicsHeaderInfo>
            {isCustom && (
              <BigMusicsHeaderIcon onClick={gotoMyChannel}>
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z"
                  />
                </svg>
              </BigMusicsHeaderIcon>
            )}
            <BigMusicsHeaderText>
              {isCustom && (
                <BigMusicsHeaderSubText>
                  {auth?.user?.username}
                </BigMusicsHeaderSubText>
              )}
              <BigMusicsHeaderTitle>{title}</BigMusicsHeaderTitle>
            </BigMusicsHeaderText>
          </BigMusicsHeaderInfo>
        )}
        <BigMusicsHeaderButtons>
          <BigMusicsHeaderPlayButton>더보기</BigMusicsHeaderPlayButton>
          <BigMusicsHeaderSliderButtonContainer>
            <BigMusicsHeaderSliderButton
              disabled={isBeginning}
              onClick={goPrev}
            >
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
            </BigMusicsHeaderSliderButton>
            <BigMusicsHeaderSliderButton disabled={isEnd} onClick={goNext}>
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
            </BigMusicsHeaderSliderButton>
          </BigMusicsHeaderSliderButtonContainer>
        </BigMusicsHeaderButtons>
      </BigMusicsHeader>
      <Container>
        <div>
          <Swiper
            ref={swiperRef}
            modules={[Scrollbar]}
            slidesPerView={6} // 한 번에 3개의 슬라이드 보이게 설정
            spaceBetween={10} // 슬라이드 간의 간격 설정
            slidesPerGroup={6} // 한 번에 2개의 슬라이드를 이동
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
            {isCircle
              ? contents?.map((album, index) => (
                  <SwiperSlide key={index}>
                    <BigMusicCircleContentItem key={album._id}>
                      <BigMusicCircleContentImg
                        $imgUrl={album.coverImg}
                        $isAlbum={isAlbum}
                      />
                      <BigMusicCircleContentInfo>
                        <BigMusicCircleContentName
                          onClick={() => clickAlbumTitle(album._id)}
                        >
                          {album.title}
                        </BigMusicCircleContentName>
                        <BigMusicrCircleContentTime>
                          {album.duration}
                        </BigMusicrCircleContentTime>
                      </BigMusicCircleContentInfo>
                    </BigMusicCircleContentItem>
                  </SwiperSlide>
                ))
              : contents?.map((music, index) => (
                  <SwiperSlide key={index}>
                    <BigMusic key={music._id}>
                      <BigMusicImgContainer $imgUrl={music?.coverImg} />
                      <BigMusicInfo>
                        <BigMusicTitle onClick={() => clickPlayMusic(music)}>
                          {music?.title}
                        </BigMusicTitle>
                        <BigMusicDescription>
                          {music?.album.category} |{" "}
                          <BigMusicDescriptionArtist
                            onClick={() => clickArtistName(music.artist._id)}
                          >
                            {music?.artist.artistName}
                          </BigMusicDescriptionArtist>
                        </BigMusicDescription>
                      </BigMusicInfo>
                    </BigMusic>
                  </SwiperSlide>
                ))}
            {/* {isCircle
              ? contents?.map((album, index) => (
                  <SwiperSlide key={index}>
                    <BigMusicCircleContentItem key={album._id}>
                      <BigMusicCircleContentImg
                        $imgUrl={album.coverImg}
                        $isAlbum={isAlbum}
                      />
                      <BigMusicCircleContentInfo>
                        <BigMusicCircleContentName
                          onClick={() => clickAlbumTitle(album._id)}
                        >
                          {album.title}
                        </BigMusicCircleContentName>
                        <BigMusicrCircleContentTime>
                          {album.duration}
                        </BigMusicrCircleContentTime>
                      </BigMusicCircleContentInfo>
                    </BigMusicCircleContentItem>
                  </SwiperSlide>
                ))
              : musicsDB.map((music, index) => (
                  <SwiperSlide key={index}>
                    <BigMusic key={music._id}>
                      <BigMusicImgContainer $imgUrl={music?.coverImg} />
                      <BigMusicInfo>
                        <BigMusicTitle onClick={() => clickPlayMusic(music)}>
                          {music?.title}
                        </BigMusicTitle>
                        <BigMusicDescription>
                          {music?.album.category} |{" "}
                          <BigMusicDescriptionArtist
                            onClick={() => clickArtistName(music.artist._id)}
                          >
                            {music?.artist.artistName}
                          </BigMusicDescriptionArtist>
                        </BigMusicDescription>
                      </BigMusicInfo>
                    </BigMusic>
                  </SwiperSlide>
                ))} */}
          </Swiper>
        </div>
      </Container>
    </BigMusicsContainer>
  );
};

export default BigMusics;
