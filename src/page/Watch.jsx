import { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const WatchWrapper = styled.div`
  //margin-top: 70px;
  //background-color: yellow;
  /* display: flex;
  flex-direction: column;
  gap: 50px; */
  //overflow-x: hidden;
  width: calc(100% - 230px);
  height: calc(100vh - 140px);
  margin-top: 70px;
  position: absolute;
  top: 0;
  bottom: 70;
  right: 0;
  padding: 0 80px;
`;

const WatchContentContainer = styled.div`
  //top: 0;
  //bottom: 0;
  //background-color: blue;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: space-around;
  gap: 50px;

  overflow-y: hidden;
`;

const WatchContentDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
  padding: 0 60px;
  padding-top: 60px;
  box-sizing: border-box;

  //background-color: green;
`;

const WatchContentDisplayHeader = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  background-color: #3a3a3a;
  border-radius: 20px;
`;

const WatchContentDisplayHeaderContent = styled.div`
  font-size: 18px;
  background-color: ${({ $selected }) => ($selected ? "#616161" : "#3a3a3a")};

  padding: 10px 15px;
  border-radius: 20px;
  padding-right: 15px;

  cursor: pointer;
`;

const WatchContentImg = styled.div`
  width: 630px;
  height: 630px;
  background: ${({ $imgUrl }) => `url(${$imgUrl})`};
  //background: url("https://i.scdn.co/image/ab67616d00001e028bcb1a80720292aaffb35989");
  background-size: cover;
  border-radius: 5px;
  //margin-bottom: 70px;
`;

const WatchContentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-top: 60px;
  //background-color: green;
`;

const WatchContentInfoHeader = styled.div`
  display: flex;
`;

const WatchContentInfoHeaderItem = styled.div`
  padding: 10px 50px;
  border-bottom: 1px solid white;

  cursor: pointer;

  &:hover {
    background-color: #616161;
  }
`;

const WatchContentInfoContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;

  //background-color: red;
  overflow-y: scroll;
`;

const WatchContentInfoContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const WatchContentInfoContentHeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const WatchContentInfoContentHeaderInfoSmall = styled.div`
  font-size: 13px;
`;

const WatchContentInfoContentHeaderInfoBig = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const WatchContentInfoContentHeaderButton = styled.div`
  background-color: red;
  padding: 10px 15px;
  border-radius: 15px;

  cursor: pointer;
`;

const WatchContentInfoContentNav = styled.div`
  display: flex;
  gap: 15px;
`;

const WatchContentInfoContentNavItem = styled.div`
  padding: 10px;
  border-radius: 10px;

  background-color: red;

  cursor: pointer;
`;

const WatchContentInfoContentList = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const WatchContentInfoContentListItem = styled.div`
  padding: 8px 10px;
  display: flex;
  align-items: center;
  gap: 10px;

  cursor: pointer;

  &:hover {
    background-color: #3a3a3a;
  }
`;

const WatchContentInfoContentListItemImg = styled.div`
  width: 30px;
  height: 30px;
  background: url("https://i.scdn.co/image/ab67616d00001e028bcb1a80720292aaffb35989");
  background-size: cover;
  border-radius: 5px;
`;

const WatchContentInfoContentListItemInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  //background-color: purple;
`;

const WatchContentInfoContentListItemInfoText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const WatchContentInfoContentListItemInfoTitle = styled.div`
  font-weight: bold;
`;

const WatchContentInfoContentListItemInfoSinger = styled.div``;

const WatchContentInfoContentListItemInfoTime = styled.div``;

const Watch = () => {
  const data = new URLSearchParams(useLocation().search);
  const currentYtId = data.get("v");
  const currentList = data.get("list");
  const [music, setMusic] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getMusic = useCallback(async () => {
    const result = await fetch(
      `http://localhost:3000/music/${currentList}`
    ).then((res) => res.json());
    setMusic(result);
  }, [currentList]);

  useEffect(() => {
    setIsLoading(true);
    getMusic();
    setIsLoading(false);
  }, []);

  return (
    <WatchWrapper>
      {isLoading ? null : (
        <WatchContentContainer>
          <WatchContentDisplay>
            <WatchContentDisplayHeader>
              <WatchContentDisplayHeaderContent $selected={true}>
                노래
              </WatchContentDisplayHeaderContent>
              <WatchContentDisplayHeaderContent>
                동영상
              </WatchContentDisplayHeaderContent>
            </WatchContentDisplayHeader>
            <WatchContentImg $imgUrl={music?.coverImg} />
          </WatchContentDisplay>
          <WatchContentInfo>
            <WatchContentInfoHeader>
              <WatchContentInfoHeaderItem>다음 트랙</WatchContentInfoHeaderItem>
              <WatchContentInfoHeaderItem>가사</WatchContentInfoHeaderItem>
              <WatchContentInfoHeaderItem>관련 항목</WatchContentInfoHeaderItem>
            </WatchContentInfoHeader>
            <WatchContentInfoContentContainer>
              <WatchContentInfoContentHeader>
                <WatchContentInfoContentHeaderInfo>
                  <WatchContentInfoContentHeaderInfoSmall>
                    재생 중인 트랙 출처
                  </WatchContentInfoContentHeaderInfoSmall>
                  <WatchContentInfoContentHeaderInfoBig>
                    {music?.title} {`(${music?.title})`} 뮤직 스테이션
                  </WatchContentInfoContentHeaderInfoBig>
                </WatchContentInfoContentHeaderInfo>
                <WatchContentInfoContentHeaderButton>
                  저장
                </WatchContentInfoContentHeaderButton>
              </WatchContentInfoContentHeader>
              <WatchContentInfoContentNav>
                <WatchContentInfoContentNavItem>
                  All
                </WatchContentInfoContentNavItem>
                <WatchContentInfoContentNavItem>
                  친숙한 곡
                </WatchContentInfoContentNavItem>
              </WatchContentInfoContentNav>
              <WatchContentInfoContentList>
                {Array.from({ length: 20 }).map((_, idx) => (
                  <WatchContentInfoContentListItem key={idx}>
                    <WatchContentInfoContentListItemImg />
                    <WatchContentInfoContentListItemInfo>
                      <WatchContentInfoContentListItemInfoText>
                        <WatchContentInfoContentListItemInfoTitle>
                          Accendio
                        </WatchContentInfoContentListItemInfoTitle>
                        <WatchContentInfoContentListItemInfoSinger>
                          IVE (아이브)
                        </WatchContentInfoContentListItemInfoSinger>
                      </WatchContentInfoContentListItemInfoText>
                      <WatchContentInfoContentListItemInfoTime>
                        3:13
                      </WatchContentInfoContentListItemInfoTime>
                    </WatchContentInfoContentListItemInfo>
                  </WatchContentInfoContentListItem>
                ))}
              </WatchContentInfoContentList>
            </WatchContentInfoContentContainer>
          </WatchContentInfo>
        </WatchContentContainer>
      )}
    </WatchWrapper>
  );
};

export default Watch;
