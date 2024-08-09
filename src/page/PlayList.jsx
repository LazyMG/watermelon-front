import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  authState,
  playerState,
  playlistState,
  recentPlaylistState,
  selectedMusicState,
  userPlaylistsState,
} from "../atom";
import { useRecoilValue, useSetRecoilState } from "recoil";

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
  display: flex;
  flex-direction: column;

  gap: 70px;
`;

const PlayListContentHeader = styled.div`
  display: flex;
  height: 300px;
  gap: 40px;
  padding: 0 100px;
`;

const PlayListContentHeaderImg = styled.div`
  border-radius: 5px;
  height: 100%;
  width: 300px;
  background: ${({ $imgUrl }) => $imgUrl && `url(${$imgUrl})`};
`;

const PlayListContentHeaderDefaultImg = styled.div`
  border-radius: 5px;
  height: 100%;
  width: 300px;
`;

const PlayListContentHeaderInfo = styled.div`
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

const PlayListContentHeaderArtist = styled.span`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const PlayListContentHeaderUtils = styled.div`
  display: flex;
  gap: 15px;
`;

const PlayListContentHeaderButton = styled.div`
  padding: 10px 15px;
  background-color: white;
  color: black;
  border-radius: 15px;

  cursor: pointer;
`;

const PlayListContentList = styled.div`
  padding: 0 120px;
  display: flex;
  flex-direction: column;
`;

const PlayListContentListItem = styled.div`
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  display: flex; // 자식 요소를 왼쪽으로 배치
  align-items: center; // 텍스트를 중앙 정렬

  div {
    cursor: pointer;
    display: inline; // 자식 요소가 텍스트 크기만큼만 차지하도록 설정
  }
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
  const playlistId = data.get("list");

  const [pagePlaylist, setPagePlaylist] = useState();
  const [isAlbum, setIsAlbum] = useState();
  const [isUserHasPlaylist, setIsUserHasPlaylist] = useState(false);

  const setPlayer = useSetRecoilState(playerState);
  const setSelectedMusic = useSetRecoilState(selectedMusicState);
  const auth = useRecoilValue(authState);
  const isLogin = localStorage.getItem("ytMusicAuth") ? true : false;
  const setPlaylist = useSetRecoilState(playlistState);
  const setUserPlaylists = useSetRecoilState(userPlaylistsState);
  const setRecentPlaylist = useSetRecoilState(recentPlaylistState);

  const navigate = useNavigate();

  const getPlaylist = useCallback(async () => {
    const result = await fetch(
      `${import.meta.env.VITE_BACK_ADDRESS}/playlist/${playlistId}`,
      {
        credentials: "include",
      }
    ).then((res) => res.json());
    setPagePlaylist(result.playlist);
    setIsAlbum(result.isAlbum);
    setIsUserHasPlaylist(result.isUserHasPlaylist);
  }, [playlistId]);

  useEffect(() => {
    getPlaylist();
  }, [getPlaylist]);

  const clickPlayMusic = async (music) => {
    //console.log(music);
    setPlayer((prev) => ({
      ...prev,
      ytId: music.ytId,
      isPlaying: true,
      isPaused: false,
      isEnd: false,
      timestamp: Date.now(),
    }));
    setSelectedMusic(music);
    //중복 노래 없도록
    setRecentPlaylist((prev) => [music, ...prev]);
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

  const clickDeletePlaylist = async () => {
    if (confirm("삭제하시겠습니까?")) {
      const userId = auth?.user?.userId;
      const result = await fetch(
        `${import.meta.env.VITE_BACK_ADDRESS}/playlist/delete/${playlistId}`,
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
          } else alert("failed!");
        })
        .catch((error) => console.error("Error:", error));
      if (result?.ok) {
        setUserPlaylists((prev) => {
          return prev.filter((list) => list._id !== playlistId);
        });
        navigate("/library");
      }
    }
  };

  const gotoAritstPage = (data) => {
    const id = data?.artist?._id || data.owner;
    navigate(`/channel/${id}`);
  };

  const clickAddPlaylist = () => {
    //console.log(pagePlaylist?.list);
    if (
      pagePlaylist?.list?.length === 0 ||
      pagePlaylist?.musicList?.length === 0
    ) {
      return;
    }
    setPlaylist(pagePlaylist?.musicList || pagePlaylist?.list);
    if (pagePlaylist?.list) {
      clickPlayMusic(pagePlaylist?.list[0]);
    }
    if (pagePlaylist?.musicList) {
      clickPlayMusic(pagePlaylist?.musicList[0]);
    }
  };

  const clickAddUserPlaylist = async () => {
    const userId = auth?.user?.userId;
    if (!userId) return;
    const result = await fetch(
      `${import.meta.env.VITE_BACK_ADDRESS}/user/${userId}/addPlaylist`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ playlistId }),
      }
    )
      .then((response) => {
        const statusCode = response.status;
        if (statusCode === 200) {
          return response.json();
        } else alert("failed!");
      })
      .catch((error) => console.error("Error:", error));
    setIsUserHasPlaylist(result.isUserHasPlaylist);
  };

  const clickDeleteUserPlaylist = async () => {
    const userId = auth?.user?.userId;
    const result = await fetch(
      `${import.meta.env.VITE_BACK_ADDRESS}/user/${userId}/deletePlaylist`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ playlistId }),
      }
    )
      .then((response) => {
        const statusCode = response.status;
        if (statusCode === 200) {
          return response.json();
        } else alert("failed!");
      })
      .catch((error) => console.error("Error:", error));
    setIsUserHasPlaylist(result.isUserHasPlaylist);
  };

  return (
    <PlayListWrapper>
      {pagePlaylist && (
        <PlayListContentContainer>
          <PlayListContentHeader>
            {pagePlaylist.coverImg ? (
              <PlayListContentHeaderImg $imgUrl={pagePlaylist.coverImg} />
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
                {pagePlaylist.title}
              </PlayListContentHeaderTitle>
              <PlayListContentHeaderOverview>
                {`${pagePlaylist.category} • ` || "재생목록 • "}
                <PlayListContentHeaderArtist
                  onClick={() => gotoAritstPage(pagePlaylist)}
                >
                  {" "}
                  {` ${pagePlaylist.artist?.artistName} ` ||
                    ` ${auth?.user?.username} `}{" "}
                </PlayListContentHeaderArtist>
                {` • ${pagePlaylist?.releasedDate?.substring(0, 4)}` ||
                  ` • ${pagePlaylist?.createdAt?.substring(0, 4)}`}
              </PlayListContentHeaderOverview>
              <PlayListContentHeaderUtils>
                <PlayListContentHeaderButton onClick={clickAddPlaylist}>
                  재생
                </PlayListContentHeaderButton>
                {auth.user?.userId ? (
                  pagePlaylist.owner === auth.user?.userId ? (
                    <PlayListContentHeaderButton onClick={clickDeletePlaylist}>
                      목록에서 삭제
                    </PlayListContentHeaderButton>
                  ) : isUserHasPlaylist ? (
                    <PlayListContentHeaderButton
                      onClick={clickDeleteUserPlaylist}
                    >
                      보관함에서 삭제
                    </PlayListContentHeaderButton>
                  ) : (
                    <PlayListContentHeaderButton onClick={clickAddUserPlaylist}>
                      보관함에 추가
                    </PlayListContentHeaderButton>
                  )
                ) : null}
              </PlayListContentHeaderUtils>
            </PlayListContentHeaderInfo>
          </PlayListContentHeader>
          <PlayListContentList>
            {isAlbum
              ? pagePlaylist.musicList?.map((music, idx) => (
                  <PlayListContentListItem key={music._id}>
                    <PlayListContentListItemNum>
                      {idx + 1}
                    </PlayListContentListItemNum>
                    <PlayListContentListItemTitle>
                      <div onClick={() => clickPlayMusic(music)}>
                        {music.title}
                      </div>
                    </PlayListContentListItemTitle>
                    <PlayListContentListItemPlays>
                      241만회 재생
                    </PlayListContentListItemPlays>
                    <PlayListContentListItemTime>
                      {music.duration}
                    </PlayListContentListItemTime>
                  </PlayListContentListItem>
                ))
              : pagePlaylist.list?.map((music, idx) => (
                  <PlayListContentListItem key={music._id}>
                    <PlayListContentListItemNum>
                      {idx + 1}
                    </PlayListContentListItemNum>
                    <PlayListContentListItemTitle>
                      <div onClick={() => clickPlayMusic(music)}>
                        {music.title}
                      </div>
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
