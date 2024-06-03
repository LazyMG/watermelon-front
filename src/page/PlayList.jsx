import styled from "styled-components";

const PlayListWrapper = styled.div`
  margin-top: 70px;
  /* display: flex;
  flex-direction: column;
  gap: 50px; */
  //overflow-x: hidden;
  width: 100%;
  padding-top: 20px;

  //플레이될 때 추가
  margin-bottom: 70px;
`;

const PlayListContentContainer = styled.div`
  //height: 900px;
  //background-color: yellow;
  display: flex;
  flex-direction: column;

  gap: 70px;
`;

const PlayListContentHeader = styled.div`
  display: flex;
  height: 300px;
  gap: 40px;
`;

const PlayListContentHeaderImg = styled.div`
  border-radius: 5px;
  height: 100%;
  width: 300px;
  background: url("https://i.scdn.co/image/ab67616d00001e028bcb1a80720292aaffb35989");
`;

const PlayListContentHeaderInfo = styled.div`
  //background-color: green;
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: center;
  align-items: start;
`;

const PlayListContentHeaderTitle = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 40px;
`;

const PlayListContentHeaderOverview = styled.div`
  font-weight: bold;
`;

const PlayListContentHeaderUtils = styled.div`
  display: flex;
  gap: 15px;
`;

const PlayListContentHeaderButton = styled.div`
  padding: 10px 15px;
  background-color: blue;
  border-radius: 15px;

  cursor: pointer;
`;

const PlayListContentList = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
`;

const PlayListContentListItem = styled.div`
  //background-color: blue;
  padding: 20px 0;
  border-bottom: 1px solid #2a2a2a;
  display: flex;
  justify-content: space-between;
`;

const PlayListContentListItemNum = styled.div`
  font-size: 15px;
  padding-left: 15px;
  flex: 0.5;
`;

const PlayListContentListItemTitle = styled.div`
  font-size: 15px;
  font-weight: bold;
  flex: 10;
`;

const PlayListContentListItemPlays = styled.div`
  flex: 5;
`;

const PlayListContentListItemTime = styled.div`
  font-size: 15px;
  padding-right: 15px;
`;

const PlayList = () => {
  return (
    <PlayListWrapper>
      <PlayListContentContainer>
        <PlayListContentHeader>
          <PlayListContentHeaderImg />
          <PlayListContentHeaderInfo>
            <PlayListContentHeaderTitle>Frank</PlayListContentHeaderTitle>
            <PlayListContentHeaderOverview>
              EP • Yerin Baek • 2015
            </PlayListContentHeaderOverview>
            <PlayListContentHeaderUtils>
              <PlayListContentHeaderButton>재생</PlayListContentHeaderButton>
              <PlayListContentHeaderButton>
                보관함에서 삭제
              </PlayListContentHeaderButton>
            </PlayListContentHeaderUtils>
          </PlayListContentHeaderInfo>
        </PlayListContentHeader>
        <PlayListContentList>
          {Array.from({ length: 10 }).map((_, idx) => (
            <PlayListContentListItem key={idx}>
              <PlayListContentListItemNum>1</PlayListContentListItemNum>
              <PlayListContentListItemTitle>Blue</PlayListContentListItemTitle>
              <PlayListContentListItemPlays>
                241만회 재생
              </PlayListContentListItemPlays>
              <PlayListContentListItemTime>3:46</PlayListContentListItemTime>
            </PlayListContentListItem>
          ))}
        </PlayListContentList>
      </PlayListContentContainer>
    </PlayListWrapper>
  );
};

export default PlayList;
