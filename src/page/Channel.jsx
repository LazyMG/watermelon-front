import styled from "styled-components";

const ChannelWrapper = styled.div`
  margin-top: 70px;
  //background-color: yellow;
  display: flex;
  flex-direction: column;
  gap: 50px;
  //overflow-x: hidden;
  width: 100%;
`;

const ChannelContentContainer = styled.div`
  margin-top: 20px;
  //height: 900px;
  display: flex;
  flex-direction: column;

  gap: 70px;
`;

const ChannelContentProfileContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const ChannelContentProfileImg = styled.div`
  width: 200px;
`;

const ChannelContentProfileInfo = styled.div`
  width: calc(100% - 200px);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChannelContentProfileName = styled.div`
  font-size: 40px;
  font-weight: bold;
`;

const ChannelContentProfileUtils = styled.div`
  display: flex;
  gap: 10px;
  padding-right: 15px;
`;

const ChannelContentProfileButton = styled.div`
  padding: 10px 15px;
  border-radius: 15px;
  background-color: red;

  cursor: pointer;
`;

const ChannelContentRepeatHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const ChannelContentRepeatHeaderSmall = styled.div`
  font-size: 16px;
`;

const ChannelContentRepeatHeaderBig = styled.div`
  font-size: 20px;
  font-weight: 800;
`;

const ChannelContentRepeatMusicContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ChannelContentRepeatMusicList = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChannelContentRepeatMusicItem = styled.div`
  //background-color: blue;
  padding: 10px 0;
  border-bottom: 1px solid #2a2a2a;
  display: flex;
  align-items: center;
  gap: 10px;
  //justify-content: space-between;
`;

const ChannelContentRepeatMusicImg = styled.div`
  padding-left: 15px;
  flex: 0.5;
  flex-shrink: 0;
  div {
    width: 30px;
    height: 30px;
    background: url("https://i.scdn.co/image/ab67616d00001e028bcb1a80720292aaffb35989");
    background-size: cover;

    cursor: pointer;
  }
`;

const ChannelContentRepeatMusicTitle = styled.div`
  font-size: 15px;
  font-weight: bold;
  flex: 6;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ChannelContentRepeatMusicPlays = styled.div`
  flex: 4;
`;

const ChannelContentRepeatMusicAlbum = styled.div`
  font-size: 15px;
  padding-right: 15px;
  flex: 5;
`;

const ChannelContentRepeatArtistContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ChannelContentRepeatArtistList = styled.div`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  gap: 15px;
`;

const ChannelContentRepeatArtistItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  //background-color: beige;
  //width: 200px;
  padding: 0;
`;

const ChannelContentRepeatArtistImg = styled.div`
  background: url("https://i.scdn.co/image/ab67616d00001e028bcb1a80720292aaffb35989");
  border-radius: 50%;
  background-size: cover;

  width: 200px;
  height: 200px;
`;

const ChannelContentRepeatArtistInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  align-items: center;
`;

const ChannelContentRepeatArtistName = styled.div`
  font-size: 15px;
  font-weight: bold;
`;

const ChannelContentRepeatArtistTime = styled.div`
  font-size: 15px;
`;

const Channel = () => {
  return (
    <ChannelWrapper>
      <ChannelContentContainer>
        <ChannelContentProfileContainer>
          <ChannelContentProfileImg>
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
          </ChannelContentProfileImg>
          <ChannelContentProfileInfo>
            <ChannelContentProfileName>이마가</ChannelContentProfileName>
            <ChannelContentProfileUtils>
              <ChannelContentProfileButton>수정</ChannelContentProfileButton>
              <ChannelContentProfileButton>공유</ChannelContentProfileButton>
            </ChannelContentProfileUtils>
          </ChannelContentProfileInfo>
        </ChannelContentProfileContainer>
        <ChannelContentRepeatMusicContainer>
          <ChannelContentRepeatHeader>
            <ChannelContentRepeatHeaderSmall>
              최근 • 비공개
            </ChannelContentRepeatHeaderSmall>
            <ChannelContentRepeatHeaderBig>
              반복 감상한 곡
            </ChannelContentRepeatHeaderBig>
          </ChannelContentRepeatHeader>
          <ChannelContentRepeatMusicList>
            {Array.from({ length: 6 }).map((_, idx) => (
              <ChannelContentRepeatMusicItem key={idx}>
                <ChannelContentRepeatMusicImg>
                  <div />
                </ChannelContentRepeatMusicImg>
                <ChannelContentRepeatMusicTitle>
                  Blueaaaaaaaaaaaaaaa
                </ChannelContentRepeatMusicTitle>
                <ChannelContentRepeatMusicPlays>
                  백예린 | 241만회 재생
                </ChannelContentRepeatMusicPlays>
                <ChannelContentRepeatMusicAlbum>
                  Frank
                </ChannelContentRepeatMusicAlbum>
              </ChannelContentRepeatMusicItem>
            ))}
          </ChannelContentRepeatMusicList>
        </ChannelContentRepeatMusicContainer>
        <ChannelContentRepeatArtistContainer>
          <ChannelContentRepeatHeader>
            <ChannelContentRepeatHeaderSmall>
              최근 • 비공개
            </ChannelContentRepeatHeaderSmall>
            <ChannelContentRepeatHeaderBig>
              반복 감상한 아티스트
            </ChannelContentRepeatHeaderBig>
          </ChannelContentRepeatHeader>
          <ChannelContentRepeatArtistList>
            {Array.from({ length: 5 }).map((_, idx) => (
              <ChannelContentRepeatArtistItem key={idx}>
                <ChannelContentRepeatArtistImg />
                <ChannelContentRepeatArtistInfo>
                  <ChannelContentRepeatArtistName>
                    IVE
                  </ChannelContentRepeatArtistName>
                  <ChannelContentRepeatArtistTime>
                    31분
                  </ChannelContentRepeatArtistTime>
                </ChannelContentRepeatArtistInfo>
              </ChannelContentRepeatArtistItem>
            ))}
          </ChannelContentRepeatArtistList>
        </ChannelContentRepeatArtistContainer>
      </ChannelContentContainer>
    </ChannelWrapper>
  );
};

export default Channel;
