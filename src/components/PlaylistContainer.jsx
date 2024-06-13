import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState, userPlaylistsState } from "../atom";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

const MenuBottomContainer = styled.div`
  margin-top: 30px;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: blue;
`;

const MenuBottomCreateContainer = styled.div`
  background-color: #232323;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 20px;
  border-radius: 20px;
  padding: 5px 0;
  gap: 5px;

  cursor: pointer;

  &:hover {
    background-color: #3a3a3a;
  }
`;

const MenuBottomCreateIcon = styled.div`
  svg {
    width: 25px;
  }
`;

const MenuBottomCreateTitle = styled.div`
  font-size: 14px;
`;

const MenuBottomListContainer = styled.div`
  width: 100%;

  //조건부 height 조정 500px -> playbar 있을 때
  height: 500px;
  //background-color: yellow;
  padding: 0 10px;
  padding-top: 5px;
  display: flex;
  flex-direction: column;

  overflow-y: auto;
`;

const MenuBottomListItem = styled.div`
  width: 100%;
  //background-color: blue;
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 13px 0;

  cursor: pointer;

  &:hover {
    background-color: #3a3a3a;
    svg {
      opacity: 1;
    }
  }
`;

const MenuBottomListItemText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const MenuBottomListItemTitle = styled.div`
  font-size: 14px;
`;

const MenuBottomListItemUser = styled.div`
  font-size: 12px;
`;

const MenuBottomListItemIcon = styled.div`
  svg {
    width: 25px;
    opacity: 0;
  }
`;

const PlaylistContainer = ({ setCreatePlaylist }) => {
  const auth = useRecoilValue(authState);
  const isLogin = localStorage.getItem("ytMusicAuth") ? true : false;
  //const localAuth = JSON.parse(localStorage.getItem("ytMusicAuth"));
  //const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const [userPlaylists, setUserPlaylists] = useRecoilState(userPlaylistsState);

  const getUserPlaylist = useCallback(async () => {
    if (!isLogin) return;
    const userId = auth?.user?.userId;
    if (!userId) return;
    const result = await fetch(
      `http://localhost:3000/user/${userId}/playlist`
    ).then((res) => res.json());
    if (result?.playlists) {
      setUserPlaylists(result.playlists);
    }
  }, [isLogin, auth, setUserPlaylists]);

  useEffect(() => {
    //console.log("get playlist");
    getUserPlaylist();
  }, [getUserPlaylist, params]);

  const createNewPlaylist = () => {
    if (!isLogin) {
      alert("로그인 필요");
      return;
    }
    setCreatePlaylist(true);
  };

  const gotoPlayList = (playlistId) => {
    navigate(`/playlist?list=${playlistId}`);
  };

  return (
    <>
      <MenuBottomCreateContainer onClick={createNewPlaylist}>
        <MenuBottomCreateIcon>
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
          </svg>
        </MenuBottomCreateIcon>
        <MenuBottomCreateTitle>새 재생목록</MenuBottomCreateTitle>
      </MenuBottomCreateContainer>
      <MenuBottomListContainer>
        {/* {Array.from({ length: 5 }).map((_, idx) => (
    <MenuBottomListItem key={idx} onClick={gotoPlayList}>
      <MenuBottomListItemText>
        <MenuBottomListItemTitle>
          좋아요 표시한 음악
        </MenuBottomListItemTitle>
        <MenuBottomListItemUser>이마가</MenuBottomListItemUser>
      </MenuBottomListItemText>
      <MenuBottomListItemIcon>
        <svg
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm6.39-2.908a.75.75 0 0 1 .766.027l3.5 2.25a.75.75 0 0 1 0 1.262l-3.5 2.25A.75.75 0 0 1 8 12.25v-4.5a.75.75 0 0 1 .39-.658Z"
          />
        </svg>
      </MenuBottomListItemIcon>
    </MenuBottomListItem>
  ))} */}
        {userPlaylists?.map((playlist) => (
          <MenuBottomListItem
            key={playlist._id}
            onClick={() => gotoPlayList(playlist._id)}
          >
            <MenuBottomListItemText>
              <MenuBottomListItemTitle>
                {playlist.title}
              </MenuBottomListItemTitle>
              <MenuBottomListItemUser>
                {playlist.owner.username}
              </MenuBottomListItemUser>
            </MenuBottomListItemText>
            <MenuBottomListItemIcon>
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm6.39-2.908a.75.75 0 0 1 .766.027l3.5 2.25a.75.75 0 0 1 0 1.262l-3.5 2.25A.75.75 0 0 1 8 12.25v-4.5a.75.75 0 0 1 .39-.658Z"
                />
              </svg>
            </MenuBottomListItemIcon>
          </MenuBottomListItem>
        ))}
      </MenuBottomListContainer>
    </>
  );
};

export default PlaylistContainer;
