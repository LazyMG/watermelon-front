import { useCallback, useEffect, useRef, useState } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import CreatePlaylistForm from "./CreatePlaylistForm";
import YoutubePlayer from "./YoutubePlayer";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  authState,
  playerState,
  playlistState,
  userPlaylistsState,
} from "../atom";
import Player from "./Player";
import PlaylistContainer from "./PlaylistContainer";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  //overflow-y: hidden;
  background: #030303;
  width: 100%;
  height: 100%;

  position: relative;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

const NavWrapper = styled.div`
  position: fixed;
  background-color: ${({ $navShow }) => ($navShow ? "black" : "transparent")};
  border-bottom: ${({ $navShow }) => ($navShow ? "1px solid #232323" : "none")};
  box-sizing: content-box;
  top: 0;
  width: 100%;
  height: 70px;
  z-index: 10;
  font-weight: 800;
  display: flex;
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding-left: 5px;
  width: ${({ $menuOpen }) => ($menuOpen ? "230px" : "100px")};
`;

const NavButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
`;

const NavButton = styled.span`
  padding: 7px;
  border-radius: 50%;

  &:hover {
    background-color: #232323;
  }

  svg {
    width: 25px;
    cursor: pointer;
  }
`;

const NavTitle = styled.div`
  width: 80px;
  display: flex;
  align-items: center;
  font-size: 25px;

  cursor: pointer;
`;

const NavContentContainer = styled.div`
  width: calc(100% - ${({ $menuOpen }) => ($menuOpen ? "230px" : "100px")});
  padding-left: 100px;
  display: flex;
  padding-right: 100px;
  justify-content: space-between;
  /* ${(props) => (props.$libraryMatch ? "padding-right:117px" : "")}; */
`;

const NavSearchContainer = styled.form`
  display: flex;
  justify-content: start;
  align-items: center;
  position: relative;
  width: 500px;
`;

const NavSearchButtonContainer = styled.button`
  background-color: transparent;
  height: 45px;
  border: 1px solid #4d4d4d;
  border-right: none;
  display: flex;
  justify-content: end;
  align-items: center;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  padding: 0 15px;

  cursor: pointer;
`;

const NavSearchButton = styled.svg`
  width: 28px;
  color: white;
`;

const NavSearch = styled.input`
  width: 500px;
  height: 45px;

  /* 초기화 스타일 */
  appearance: none;
  background-color: transparent;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: 1rem;
  padding: 0.5rem;

  border: 1px solid #4d4d4d;
  border-left: none;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  color: white;
  caret-color: white;

  /* 포커스 시 스타일 */
  &:focus {
    background-color: black;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-text-fill-color: white;
  }
`;

const NavProfileContainer = styled.div`
  width: 80px;
  display: flex;
  display: ${({ $authLoading }) => ($authLoading ? "none" : "flex")};
  align-items: center;
  justify-content: end;

  svg {
    width: 40px;
    cursor: pointer;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  //align-items: center;
  //padding: 0 100px;
  padding-top: 40px;
  width: calc(100% - ${({ $menuOpen }) => ($menuOpen ? "230px" : "100px")});
  margin-left: ${({ $menuOpen }) => ($menuOpen ? "230px" : "100px")};
  overflow: hidden;
  //height: 100vh;
`;

const MenuWrapper = styled.div`
  background-color: black;
  position: fixed;
  height: 100%;
  width: 230px;
  top: 0;
  left: 0;
  width: ${({ $menuOpen }) => ($menuOpen ? "230px" : "100px")};
  border-right: 1px solid #232323;
`;

const MenuTopContainer = styled.div`
  margin-top: 75px;

  width: 100%;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
`;

const MenuTopItem = styled.div`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  background-color: ${({ $match }) =>
    $match === "match" ? "#232323" : "transparent"};

  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 15px;

  &:hover {
    background-color: #232323;
  }
`;

const MenuTopIcon = styled.div`
  padding-left: 20px;
  svg {
    width: 25px;
  }
`;

const MenuTopTitle = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
`;

const MenuBorder = styled.div`
  height: 1px;
  border: 1px solid #232323;
  margin: 0 20px;
  margin-top: 30px;
`;

const MenuBottomContainer = styled.div`
  margin-top: 30px;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Temp = styled.div`
  margin-top: 70px;
  background-color: yellow;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-x: hidden;
  width: 100%;
`;

const Component = styled.div`
  width: 100%;
  height: 600px;
  background-color: blue;
`;

const PlayBarWrapper = styled.div`
  position: fixed;
  background-color: #3a3a3a;
  //background-color: transparent;

  bottom: 0;
  width: 100%;
  height: 70px;
  z-index: 10;

  display: ${({ $isPlayerOn }) => ($isPlayerOn ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
`;

const Layout = () => {
  const [menuOpen, setMenuOpen] = useState(true);
  const [navShow, setNavShow] = useState(false);
  const [createPlaylist, setCreatePlaylist] = useState(false);

  const auth = useRecoilValue(authState);
  const isLogin = localStorage.getItem("ytMusicAuth") ? true : false;
  const localAuth = JSON.parse(localStorage.getItem("ytMusicAuth"));

  const [isPlay, setIsPlay] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isPlayerOn, setIsPlayerOn] = useState(false);
  const [userPlaylists, setUserPlaylists] = useRecoilState(userPlaylistsState);
  const [searchKeyword, setSearchKeyword] = useState("");

  const [ytPlayerState, setYtPlayerState] = useRecoilState(playerState);
  const playlist = useRecoilValue(playlistState);

  const homeMatch = useMatch("/");
  const exploreMatch = useMatch("/explore");
  const libraryMatch = useMatch("/library");
  const searchMatch = useMatch("/search");

  const navigate = useNavigate();
  const params = useParams();
  const data = new URLSearchParams(useLocation().search);
  const keyword = data.get("q");

  const playerRef = useRef(null);

  useEffect(() => {
    if (searchMatch) {
      setSearchKeyword(keyword);
    } else {
      setSearchKeyword("");
    }
  }, [searchMatch, keyword]);

  useEffect(() => {
    window.scroll({ top: 0 });
  }, [params]);

  const getUserPlaylist = useCallback(async () => {
    if (!isLogin) return;
    const userId = auth?.user?.userId;
    if (!userId) return;
    const result = await fetch(
      `${import.meta.env.VITE_BACK_ADDRESS}/user/${userId}/playlist`
    ).then((res) => res.json());
    if (result?.playlists) {
      setUserPlaylists(result.playlists);
    }
  }, [isLogin, auth]);

  useEffect(() => {
    getUserPlaylist();
  }, [getUserPlaylist, params]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 30) {
      setNavShow(true);
    } else {
      setNavShow(false);
    }
  };

  //const handleClick = () => setMenuOpen(!menuOpen);

  const gotoLogout = async () => {
    const result = await fetch(`${import.meta.env.VITE_BACK_ADDRESS}/logout`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    if (result.action === "delete") {
      localStorage.removeItem("ytMusicAuth");
      setUserPlaylists([]);
      window.location.href = "/";
    }
  };

  const gotoLogin = () => navigate("/login");

  const gotoHome = () => navigate("/");

  // YouTube 플레이어 상태 변경 이벤트 핸들러
  const handlePlayerStateChange = async (event) => {
    //console.log("Player State:", event.data);
    const player = playerRef.current.internalPlayer;
    if (event.data === 1) {
      const duration = await player.getDuration();
      setYtPlayerState((prev) => ({
        ...prev,
        duration,
      }));
      setIsPlayerOn(true);
      setIsPlay(true);
    }
    if (event.data === 0) {
      console.log("end");
      if (isRepeat) {
        player.playVideo();
        return;
      }
      if (playlist?.length !== 0) {
        //console.log("real", playlist);
        //setSelectedMusic(); //음악 선택
        const currentIndex = playlist.findIndex(
          (item) => item.ytId === ytPlayerState.ytId
        );
        //마지막 곡일 때
        if (currentIndex === playlist.length - 1) {
          setIsEnd(true);
          setYtPlayerState((prev) => ({
            ...prev,
            isEnd: true,
            isPaused: false,
            isPlaying: false,
          }));
        }
      } else {
        //console.log("end | No music");
        setIsEnd(true);
        setYtPlayerState((prev) => ({
          ...prev,
          isEnd: true,
          isPaused: false,
          isPlaying: false,
        }));
      }
    }
  };

  const opts = {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: ytPlayerState.isPlaying ? 1 : 0,
    },
  };

  return (
    <Wrapper>
      <Content>
        <NavWrapper $navShow={navShow}>
          <NavMenu $menuOpen={menuOpen}>
            <NavButtonWrapper>
              <NavButton>
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
                  />
                </svg>
              </NavButton>
            </NavButtonWrapper>
            <NavTitle onClick={gotoHome}>
              <svg
                width="80"
                height="24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse cx="12.18" cy="12" rx="12.18" ry="12" fill="red" />
                <ellipse
                  cx="12.18"
                  cy="12"
                  rx="7.308"
                  ry="7.2"
                  fill="red"
                  stroke="#fff"
                  strokeWidth="1.2"
                />
                <path
                  d="M9.744 15.545l6.327-3.544-6.327-3.546v7.09zM37.433 9.642c-.579 2.853-1.019 6.336-1.25 7.774h-.163c-.187-1.482-.627-4.942-1.227-7.75L33.31 2.677h-4.52v18.85h2.803V5.987l.277 1.451 2.85 14.086h2.804l2.803-14.086.3-1.459v15.547h2.804V2.676h-4.563l-1.435 6.966zM51.01 18.696c-.256.517-.81.876-1.368.876-.648 0-.904-.494-.904-1.706V7.754H45.54v10.29c0 2.54.856 3.706 2.758 3.706 1.296 0 2.338-.562 3.058-1.909h.07l.277 1.684h2.502V7.755h-3.198v10.94h.003zM60.392 13.19c-1.043-.742-1.691-1.236-1.691-2.314 0-.763.37-1.19 1.25-1.19.905 0 1.206.605 1.227 2.674l2.689-.111c.208-3.346-.928-4.74-3.87-4.74-2.733 0-4.078 1.19-4.078 3.638 0 2.224 1.113 3.235 2.92 4.562 1.553 1.169 2.457 1.82 2.457 2.764 0 .72-.464 1.213-1.275 1.213-.95 0-1.507-.877-1.365-2.405l-2.71.044c-.419 2.852.766 4.515 3.915 4.515 2.758 0 4.195-1.236 4.195-3.706-.003-2.247-1.16-3.147-3.664-4.944zM68.872 7.754h-3.059v13.77h3.06V7.755zM67.365 2.316c-1.18 0-1.738.427-1.738 1.911 0 1.528.554 1.909 1.739 1.909 1.205 0 1.738-.383 1.738-1.909 0-1.414-.533-1.911-1.739-1.911zM79.158 16.56l-2.803-.135c0 2.426-.277 3.212-1.226 3.212-.95 0-1.113-.877-1.113-3.73v-2.67c0-2.765.187-3.639 1.137-3.639.88 0 1.112.83 1.112 3.393l2.778-.178c.187-2.134-.093-3.595-.949-4.425-.627-.608-1.576-.897-2.896-.897-3.104 0-4.379 1.618-4.379 6.154v1.932c0 4.673 1.088 6.178 4.264 6.178 1.344 0 2.27-.27 2.896-.854.902-.814 1.249-2.205 1.18-4.341z"
                  fill="#fff"
                />
              </svg>
            </NavTitle>
          </NavMenu>
          <NavContentContainer
            $menuOpen={menuOpen}
            $libraryMatch={Boolean(libraryMatch)}
          >
            <NavSearchContainer action="/search">
              <NavSearchButtonContainer>
                <NavSearchButton
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                  />
                </NavSearchButton>
              </NavSearchButtonContainer>
              <NavSearch
                name="q"
                type="text"
                placeholder="노래, 앨범, 아티스트, 팟캐스트 검색"
                value={searchKeyword}
                onChange={(event) => {
                  setSearchKeyword(event.target.value);
                }}
              />
            </NavSearchContainer>
            <NavProfileContainer
              $authLoading={auth.loading}
              onClick={
                localAuth?.isAuthenticated || auth.isAuthenticated
                  ? gotoLogout
                  : gotoLogin
              }
            >
              {localAuth?.isAuthenticated || auth.isAuthenticated ? (
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
              ) : (
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z"
                  />
                </svg>
              )}
            </NavProfileContainer>
          </NavContentContainer>
        </NavWrapper>
        <MenuWrapper $menuOpen={menuOpen}>
          <MenuTopContainer>
            <Link to={"/"}>
              <MenuTopItem $match={homeMatch && "match"}>
                <MenuTopIcon>
                  <svg
                    fill={homeMatch ? "currentColor" : ""}
                    stroke={homeMatch ? "" : "currentColor"}
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
                    />
                  </svg>
                </MenuTopIcon>
                <MenuTopTitle>홈</MenuTopTitle>
              </MenuTopItem>
            </Link>
            <Link to={"/explore"}>
              <MenuTopItem $match={exploreMatch && "match"}>
                <MenuTopIcon>
                  <svg
                    fill={exploreMatch ? "currentColor" : ""}
                    stroke={exploreMatch ? "" : "currentColor"}
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M4.606 12.97a.75.75 0 0 1-.134 1.051 2.494 2.494 0 0 0-.93 2.437 2.494 2.494 0 0 0 2.437-.93.75.75 0 1 1 1.186.918 3.995 3.995 0 0 1-4.482 1.332.75.75 0 0 1-.461-.461 3.994 3.994 0 0 1 1.332-4.482.75.75 0 0 1 1.052.134Z"
                    />
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M5.752 12A13.07 13.07 0 0 0 8 14.248v4.002c0 .414.336.75.75.75a5 5 0 0 0 4.797-6.414 12.984 12.984 0 0 0 5.45-10.848.75.75 0 0 0-.735-.735 12.984 12.984 0 0 0-10.849 5.45A5 5 0 0 0 1 11.25c.001.414.337.75.751.75h4.002ZM13 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
                    />
                  </svg>
                </MenuTopIcon>
                <MenuTopTitle>둘러보기</MenuTopTitle>
              </MenuTopItem>
            </Link>
            <Link to={"/library"}>
              <MenuTopItem $match={libraryMatch && "match"}>
                <MenuTopIcon>
                  <svg
                    fill={libraryMatch ? "currentColor" : ""}
                    stroke={libraryMatch ? "" : "currentColor"}
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M2 3a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H2Z" />
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M2 7.5h16l-.811 7.71a2 2 0 0 1-1.99 1.79H4.802a2 2 0 0 1-1.99-1.79L2 7.5ZM7 11a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Z"
                    />
                  </svg>
                </MenuTopIcon>
                <MenuTopItem>보관함</MenuTopItem>
              </MenuTopItem>
            </Link>
          </MenuTopContainer>
          <MenuBorder />
          <MenuBottomContainer>
            <PlaylistContainer setCreatePlaylist={setCreatePlaylist} />
          </MenuBottomContainer>
        </MenuWrapper>
        <ContentWrapper $menuOpen={menuOpen}>
          <Outlet />
        </ContentWrapper>

        {createPlaylist && (
          <CreatePlaylistForm
            isLogin={isLogin}
            setCreatePlaylist={setCreatePlaylist}
          />
        )}
        <PlayBarWrapper $isPlayerOn={isPlayerOn}>
          <Player
            isPlay={isPlay}
            isEnd={isEnd}
            setIsPlay={setIsPlay}
            playerRef={playerRef}
            isRepeat={isRepeat}
            setIsRepeat={setIsRepeat}
          />
        </PlayBarWrapper>
        <div>
          <YoutubePlayer
            videoId={ytPlayerState.ytId}
            onStateChange={handlePlayerStateChange}
            opts={opts}
            playerRef={playerRef}
          />
        </div>
      </Content>
    </Wrapper>
  );
};

export default Layout;
