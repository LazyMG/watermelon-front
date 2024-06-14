import { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import AddMusicPlaylistForm from "../components/AddMusicPlaylistForm";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { playerState, playlistState, selectedMusicState } from "../atom";

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
  background-size: cover;
  border-radius: 5px;
  //margin-bottom: 70px;
`;

const WatchContentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-top: 60px;
`;

const WatchContentInfoHeader = styled.div`
  display: flex;
`;

const WatchContentInfoHeaderItem = styled.div`
  padding: 10px 50px;

  ${({ $category }) => ($category ? `border-bottom: 1px solid white;` : "")}
  opacity : ${({ $category }) => ($category ? `1` : "0.6")};
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
  background-color: white;
  padding: 10px 15px;
  border-radius: 15px;

  color: black;

  cursor: pointer;
`;

const WatchContentInfoContentNav = styled.div`
  display: flex;
  gap: 15px;
`;

const WatchContentInfoContentNavItem = styled.div`
  padding: 10px;
  border-radius: 10px;

  background-color: white;
  color: black;

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

  ${({ $isSelectedMusic }) => $isSelectedMusic && "background-color: #3a3a3a;"}

  &:hover {
    background-color: #3a3a3a;
  }
`;

const WatchContentInfoContentListItemImg = styled.div`
  width: 30px;
  height: 30px;
  background: ${({ $imgUrl }) => ($imgUrl ? `url(${$imgUrl})` : "")};
  background-size: cover;
  border-radius: 5px;
`;

const WatchContentInfoContentListItemInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  const [addModalOpen, setAddModalOpen] = useState(false);
  const isLogin = localStorage.getItem("ytMusicAuth") ? true : false;
  const [category, setCategory] = useState("NEXT_TRACK");
  const setPlayer = useSetRecoilState(playerState);
  const [selectedMusic, setSelectedMusic] = useRecoilState(selectedMusicState);

  const playlist = useRecoilValue(playlistState);

  const getMusic = useCallback(async () => {
    const result = await fetch(
      `${import.meta.env.VITE_BACK_ADDRESS}/music/${currentList}`
    ).then((res) => res.json());
    setMusic(result);
  }, [currentList]);

  const clickAddMusicToPlaylist = () => {
    setAddModalOpen(true);
  };

  useEffect(() => {
    setIsLoading(true);
    getMusic();
    setIsLoading(false);
  }, [getMusic]);

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
              <WatchContentInfoHeaderItem
                onClick={() => setCategory("NEXT_TRACK")}
                $category={category === "NEXT_TRACK"}
              >
                다음 트랙
              </WatchContentInfoHeaderItem>
              <WatchContentInfoHeaderItem
                onClick={() => setCategory("LYRICS")}
                $category={category === "LYRICS"}
              >
                가사
              </WatchContentInfoHeaderItem>
              <WatchContentInfoHeaderItem
                onClick={() => setCategory("RELATED")}
                $category={category === "RELATED"}
              >
                관련 항목
              </WatchContentInfoHeaderItem>
            </WatchContentInfoHeader>
            <WatchContentInfoContentContainer>
              <WatchContentInfoContentHeader>
                <WatchContentInfoContentHeaderInfo>
                  <WatchContentInfoContentHeaderInfoSmall>
                    재생 중인 트랙 출처
                  </WatchContentInfoContentHeaderInfoSmall>
                  <WatchContentInfoContentHeaderInfoBig>
                    {music?.title} 뮤직 스테이션
                  </WatchContentInfoContentHeaderInfoBig>
                </WatchContentInfoContentHeaderInfo>
                <WatchContentInfoContentHeaderButton
                  onClick={clickAddMusicToPlaylist}
                >
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
                {playlist?.map((listItem) => (
                  <WatchContentInfoContentListItem
                    onClick={() => handleClick(listItem)}
                    key={listItem._id}
                    $isSelectedMusic={selectedMusic._id === listItem._id}
                  >
                    <WatchContentInfoContentListItemImg
                      $imgUrl={listItem.coverImg}
                    />
                    <WatchContentInfoContentListItemInfo>
                      <WatchContentInfoContentListItemInfoText>
                        <WatchContentInfoContentListItemInfoTitle>
                          {listItem.title}
                        </WatchContentInfoContentListItemInfoTitle>
                        <WatchContentInfoContentListItemInfoSinger>
                          {listItem.artist.artistName}
                        </WatchContentInfoContentListItemInfoSinger>
                      </WatchContentInfoContentListItemInfoText>
                      <WatchContentInfoContentListItemInfoTime>
                        {listItem.duration}
                      </WatchContentInfoContentListItemInfoTime>
                    </WatchContentInfoContentListItemInfo>
                  </WatchContentInfoContentListItem>
                ))}
              </WatchContentInfoContentList>
            </WatchContentInfoContentContainer>
          </WatchContentInfo>
        </WatchContentContainer>
      )}
      {addModalOpen && (
        <AddMusicPlaylistForm
          isLogin={isLogin}
          setAddModalOpen={setAddModalOpen}
          music={music}
        />
      )}
    </WatchWrapper>
  );
};

export default Watch;
