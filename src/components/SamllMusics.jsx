import styled from "styled-components";

const SmallMusicsContainer = styled.div`
  width: 100%;
  //height: 100%;
  //background-color: yellow;
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

const SmallMusicsContent = styled.div`
  //background-color: yellow;
  //height: 200px;
  width: calc(400px * 3 + 15px * 2);
  //height: calc(50px * 4 + 15px * 3);
  margin: 20px 10px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 15px;
  grid-template-rows: repeat(4, 1fr);
  row-gap: 15px;
  overflow-x: hidden;

  position: relative;

  &:hover {
    overflow-x: overlay; /* 스크롤바가 컴포넌트 위에 나타나도록 설정 */
    overflow-y: hidden;
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
  width: 400px;
  height: 50px;
  //background-color: blue;
  display: flex;
  align-items: center;
  gap: 10px;

  cursor: pointer;
`;

const SmallMusicImgContainer = styled.div`
  border-radius: 2px;
  width: 50px;
  height: 50px;
  background: url("https://i.scdn.co/image/ab67616d00001e028bcb1a80720292aaffb35989");
  background-size: cover;
  flex-shrink: 0;
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
`;

const SmallMusicDescription = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SamllMusics = () => {
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
          <SmallMusicsPlayButton>모두 재생</SmallMusicsPlayButton>
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
      <SmallMusicsContent>
        {/* <SmallMusicsContentScroll /> */}
        {Array.from({ length: 20 }).map((_, idx) => (
          <SmallMusic key={idx}>
            <SmallMusicImgContainer />
            <SmallMusicText>
              <SmallMusicTitle>Accendio</SmallMusicTitle>
              <SmallMusicDescription>
                IVE(아이브) | IVE SWITCH
              </SmallMusicDescription>
            </SmallMusicText>
          </SmallMusic>
        ))}
      </SmallMusicsContent>
    </SmallMusicsContainer>
  );
};

export default SamllMusics;
