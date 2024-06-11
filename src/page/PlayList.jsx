import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { playerState, selectedMusicState } from "../atom";
import { useSetRecoilState } from "recoil";

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
  background: ${({ $imgUrl }) => $imgUrl && `url(${$imgUrl})`};
  //background: url("https://i.scdn.co/image/ab67616d00001e028bcb1a80720292aaffb35989");
`;

const PlayListContentHeaderDefaultImg = styled.div`
  border-radius: 5px;
  height: 100%;
  width: 300px;
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
  display: flex;
  font-weight: bold;
`;

const PlayListContentHeaderArtist = styled.span``;

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

  cursor: pointer;
`;

const PlayListContentListItemPlays = styled.div`
  flex: 5;
`;

const PlayListContentListItemTime = styled.div`
  font-size: 15px;
  padding-right: 15px;
`;

const PlayList = () => {
  const data = new URLSearchParams(useLocation().search);
  const currentList = data.get("list");
  const [playlist, setPlaylist] = useState();
  const setPlayerState = useSetRecoilState(playerState);
  const setSelectedMusic = useSetRecoilState(selectedMusicState);
  const userData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : {};
  const navigate = useNavigate();
  const [isAlbum, setIsAlbum] = useState();

  const getPlaylist = useCallback(async () => {
    const result = await fetch(
      `http://localhost:3000/playlist/${currentList}`
    ).then((res) => res.json());
    //console.log(result.playlist);
    setPlaylist(result.playlist);
    setIsAlbum(result.isAlbum);
  }, [currentList]);

  useEffect(() => {
    getPlaylist();
  }, [getPlaylist]);

  const handleClick = (music) => {
    console.log(music);
    setPlayerState((prev) => ({
      ...prev,
      ytId: music.ytId,
      isPlaying: true,
      isPaused: false,
    }));
    setSelectedMusic(music);
  };

  const clickDeletePlaylist = async () => {
    if (confirm("삭제하시겠습니까?")) {
      const userId = userData?._id;
      const result = await fetch(
        `http://localhost:3000/playlist/delete/${currentList}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        }
      )
        .then((response) => {
          const statusCode = response.status;
          if (statusCode === 200) {
            alert("완료되었습니다.");
            return response.json();
          } else alert("falied!");
        })
        .catch((error) => console.error("Error:", error));
      if (result?.ok) {
        navigate("/");
      }
    }
  };

  return (
    <PlayListWrapper>
      {playlist && (
        <PlayListContentContainer>
          <PlayListContentHeader>
            {playlist.coverImg ? (
              <PlayListContentHeaderImg $imgUrl={playlist.coverImg} />
            ) : (
              <PlayListContentHeaderDefaultImg>
                <svg
                  fill="none"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                  />
                </svg>
              </PlayListContentHeaderDefaultImg>
            )}
            <PlayListContentHeaderInfo>
              <PlayListContentHeaderTitle>
                {playlist.title}
              </PlayListContentHeaderTitle>
              <PlayListContentHeaderOverview>
                EP •
                <PlayListContentHeaderArtist>
                  {playlist.artist?.artistName || userData.username}
                </PlayListContentHeaderArtist>
                • 2015
              </PlayListContentHeaderOverview>
              <PlayListContentHeaderUtils>
                <PlayListContentHeaderButton>재생</PlayListContentHeaderButton>
                {playlist.owner === userData?._id ? (
                  <PlayListContentHeaderButton onClick={clickDeletePlaylist}>
                    보관함에서 삭제
                  </PlayListContentHeaderButton>
                ) : null}
              </PlayListContentHeaderUtils>
            </PlayListContentHeaderInfo>
          </PlayListContentHeader>
          <PlayListContentList>
            {/* {Array.from({ length: 10 }).map((_, idx) => (
              <PlayListContentListItem key={idx}>
                <PlayListContentListItemNum>1</PlayListContentListItemNum>
                <PlayListContentListItemTitle>
                  Blue
                </PlayListContentListItemTitle>
                <PlayListContentListItemPlays>
                  241만회 재생
                </PlayListContentListItemPlays>
                <PlayListContentListItemTime>3:46</PlayListContentListItemTime>
              </PlayListContentListItem>
            ))} */}
            {isAlbum
              ? playlist.musicList?.map((music, idx) => (
                  <PlayListContentListItem key={music._id}>
                    <PlayListContentListItemNum>
                      {idx + 1}
                    </PlayListContentListItemNum>
                    <PlayListContentListItemTitle
                      onClick={() => handleClick(music)}
                    >
                      {music.title}
                    </PlayListContentListItemTitle>
                    <PlayListContentListItemPlays>
                      241만회 재생
                    </PlayListContentListItemPlays>
                    <PlayListContentListItemTime>
                      {music.duration}
                    </PlayListContentListItemTime>
                  </PlayListContentListItem>
                ))
              : playlist.list?.map((music) => (
                  <PlayListContentListItem key={music._id}>
                    <PlayListContentListItemNum>1</PlayListContentListItemNum>
                    <PlayListContentListItemTitle
                      onClick={() => handleClick(music)}
                    >
                      {music.title}
                    </PlayListContentListItemTitle>
                    <PlayListContentListItemPlays>
                      241만회 재생
                    </PlayListContentListItemPlays>
                    <PlayListContentListItemTime>
                      {music.duration}
                    </PlayListContentListItemTime>
                  </PlayListContentListItem>
                ))}
          </PlayListContentList>
        </PlayListContentContainer>
      )}
    </PlayListWrapper>
  );
};

export default PlayList;
