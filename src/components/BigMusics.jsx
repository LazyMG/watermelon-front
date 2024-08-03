import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { authState, playerState, selectedMusicState } from "../atom";
import { useNavigate } from "react-router-dom";

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

  &:hover {
    background-color: #565656;
  }
`;

const BigMusicsContent = styled.div`
  width: calc(190px * 6 + 20px * 5);
  margin: 20px 0;
  height: 280px;
  //padding: 0 100px;
  margin-left: 100px;

  display: grid;
  grid-template-columns: repeat(20, 1fr);
  column-gap: 20px;

  overflow-x: hidden;

  position: relative;

  //background-color: orange;

  &:hover {
    overflow-x: overlay;
  }
`;

const BigMusicsContentScroll = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  padding: 0 100px;
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

const BigMusics = ({ musics, isCustom = false, title }) => {
  const setPlayer = useSetRecoilState(playerState);
  const setSelectedMusic = useSetRecoilState(selectedMusicState);
  const navigate = useNavigate();
  const auth = useRecoilValue(authState);

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

  return (
    <BigMusicsContainer>
      <BigMusicsHeader>
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
        <BigMusicsHeaderButtons>
          <BigMusicsHeaderPlayButton>더보기</BigMusicsHeaderPlayButton>
          <BigMusicsHeaderSliderButtonContainer>
            <BigMusicsHeaderSliderButton>
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
            <BigMusicsHeaderSliderButton>
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
      <BigMusicsContent>
        {musics?.map((music) => (
          <BigMusic key={music._id}>
            <BigMusicImgContainer $imgUrl={music?.coverImg} />
            <BigMusicInfo>
              <BigMusicTitle onClick={() => handleClick(music)}>
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
        ))}
        {/* {Array.from({ length: 20 }).map((_, idx) => (
          <BigMusic key={idx} />
        ))} */}
        <BigMusicsContentScroll />
      </BigMusicsContent>
    </BigMusicsContainer>
  );
};

export default BigMusics;
