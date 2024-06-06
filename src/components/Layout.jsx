import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import CreatePlaylistForm from "./CreatePlaylistForm";
import YoutubePlayer from "./YoutubePlayer";
import { useRecoilState, useRecoilValue } from "recoil";
import { playerState, selectedMusicState, ytIdState } from "../atom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background: #030303;
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
  //background-color: blue;
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
  width: 70px;
  display: flex;
  align-items: center;
  font-size: 25px;

  cursor: pointer;
`;

const NavContentContainer = styled.div`
  //background-color: red;
  width: calc(100% - ${({ $menuOpen }) => ($menuOpen ? "230px" : "100px")});
  padding-left: 100px;
  display: flex;
  padding-right: 100px;
  justify-content: space-between;
`;

const NavSearchContainer = styled.div`
  //background-color: red;
  display: flex;
  justify-content: start;
  align-items: center;
  position: relative;
  width: 500px;
`;

const NavSearchButtonContainer = styled.div`
  //width: 100px;
  //background-color: blue;
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

  /* 포커스 시 스타일 */
  &:focus {
    background-color: black;
  }
`;

const NavProfileContainer = styled.div`
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: end;
  //background-color: purple;
  svg {
    width: 40px;
    cursor: pointer;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  //background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 100px;
  padding-top: 40px;
  width: calc(100% - ${({ $menuOpen }) => ($menuOpen ? "230px" : "100px")});
  margin-left: ${({ $menuOpen }) => ($menuOpen ? "230px" : "100px")};
  overflow: hidden;
  //height: calc(100vh - 70px);
  //box-sizing: border-box;
  height: 100vh;
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

  display: ${({ $isPlay }) => ($isPlay ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
`;

//range로 변경
const PlayBarTimeline = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 2px;
  background-color: red;
`;

const PlayBarContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;

  padding: 0 15px;

  //background-color: yellow;
`;

const PlayBarContentControlContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  //background-color: red;
`;

const PlayBarContentControlButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const PlayBarContentControlPlayButton = styled.div`
  width: 45px;

  cursor: pointer;
`;

const PlayBarContentControlMoveButton = styled.div`
  width: 35px;

  cursor: pointer;
`;

const PlayBarContentControlDuration = styled.div`
  font-size: 13px;
`;

const PlayBarContentMainContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const PlayBarContentMainImg = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 5px;
  background: ${({ $imgUrl }) => `url(${$imgUrl})`};
  //background: url("https://i.scdn.co/image/ab67616d00001e028bcb1a80720292aaffb35989");
  background-size: cover;
  flex-shrink: 0;
`;

const PlayBarContentMainInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 300px;
  line-height: 1.3;
`;

const PlayBarContentMainInfoTitle = styled.div`
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PlayBarContentMainInfoOverview = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PlayBarContentMainUtil = styled.div`
  display: flex;
  gap: 15px;
`;

const PlayBarContentMainButton = styled.div`
  width: 25px;
  padding: 5px;
  box-sizing: content-box;
  border-radius: 50%;

  cursor: pointer;

  &:hover {
    background-color: red;
  }
`;

const PlayBarContentUtilContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const PlayBarContentUtilButton = styled.div`
  width: 30px;

  cursor: pointer;
`;

const Layout = () => {
  const [menuOpen, setMenuOpen] = useState(true);
  const [navShow, setNavShow] = useState(false);
  const [createPlaylist, setCreatePlaylist] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const selectedMusic = useRecoilValue(selectedMusicState);

  const [ytPlayerState, setYtPlayerState] = useRecoilState(playerState);
  //const ytId = useRecoilValue(ytIdState);

  const homeMatch = useMatch("/");
  const exploreMatch = useMatch("/explore");
  const libraryMatch = useMatch("/library");

  const navigate = useNavigate();

  const playerRef = useRef(null);

  useEffect(() => {
    console.log("render");
  }, []);

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

  const handleClick = () => setMenuOpen(!menuOpen);

  const createNewPlaylist = () => setCreatePlaylist(true);

  const gotoWatchMusic = () =>
    navigate(`/watch?v=${selectedMusic.ytId}&list=${selectedMusic._id}`);

  const gotoLogout = () => console.log("logout");

  const gotoLogin = () => navigate("/login");

  const gotoPlayList = () => navigate("/playlist");

  const gotoHome = () => navigate("/");

  // YouTube 플레이어 상태 변경 이벤트 핸들러
  const handlePlayerStateChange = (event) => {
    console.log("Player State:", event.data);
    if (event.data === 1) {
      setIsPlay(true);
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
      <NavWrapper $navShow={navShow}>
        <NavMenu $menuOpen={menuOpen}>
          <NavButtonWrapper>
            <NavButton onClick={handleClick}>
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
          <NavTitle onClick={gotoHome}>Title</NavTitle>
        </NavMenu>
        <NavContentContainer $menuOpen={menuOpen}>
          <NavSearchContainer>
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
              type="text"
              placeholder="노래, 앨범, 아티스트, 팟캐스트 검색"
            />
          </NavSearchContainer>
          <NavProfileContainer onClick={isLogin ? gotoLogout : gotoLogin}>
            {isLogin ? (
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
          {/* 컴포넌트로 빼기 */}
          <MenuBottomListContainer>
            {Array.from({ length: 5 }).map((_, idx) => (
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
            ))}
          </MenuBottomListContainer>
        </MenuBottomContainer>
      </MenuWrapper>
      <ContentWrapper $menuOpen={menuOpen}>
        <Outlet />
        {/* <Temp>
          <Component onClick={handleClick} />
          <Component />
          <Component />
          <Component />
          <Component />
          <Component />
          <Component />
        </Temp> */}
      </ContentWrapper>
      <PlayBarWrapper $isPlay={isPlay}>
        <PlayBarTimeline />
        <PlayBarContentContainer>
          <PlayBarContentControlContainer>
            <PlayBarContentControlButtons>
              <PlayBarContentControlMoveButton>
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
                    d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
                  />
                </svg>
              </PlayBarContentControlMoveButton>
              <PlayBarContentControlPlayButton>
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
                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                  />
                </svg>
                {/* <svg
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
                    d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                  />
                </svg> */}
                {/* <svg
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
                    d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z"
                  />
                </svg> */}
              </PlayBarContentControlPlayButton>
              <PlayBarContentControlMoveButton>
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
                    d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
                  />
                </svg>
              </PlayBarContentControlMoveButton>
            </PlayBarContentControlButtons>
            <PlayBarContentControlDuration>
              0:00/3:13
            </PlayBarContentControlDuration>
          </PlayBarContentControlContainer>
          <PlayBarContentMainContainer>
            <PlayBarContentMainImg $imgUrl={selectedMusic?.coverImg} />
            <PlayBarContentMainInfo>
              <PlayBarContentMainInfoTitle>
                {selectedMusic?.title}
              </PlayBarContentMainInfoTitle>
              <PlayBarContentMainInfoOverview>
                {selectedMusic?.artist.artistName} •{" "}
                {selectedMusic?.album.title} • 2024
              </PlayBarContentMainInfoOverview>
            </PlayBarContentMainInfo>
            <PlayBarContentMainUtil>
              <PlayBarContentMainButton>
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
                    d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
                  />
                </svg>
              </PlayBarContentMainButton>
              <PlayBarContentMainButton>
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
                    d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                  />
                </svg>
              </PlayBarContentMainButton>
              <PlayBarContentMainButton>
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
                    d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                  />
                </svg>
              </PlayBarContentMainButton>
            </PlayBarContentMainUtil>
          </PlayBarContentMainContainer>
          <PlayBarContentUtilContainer>
            <PlayBarContentUtilButton>
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
                  d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                />
              </svg>
              {/* <svg
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
                d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
              />
            </svg> */}
            </PlayBarContentUtilButton>
            <PlayBarContentUtilButton>
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
                  d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
                />
              </svg>
            </PlayBarContentUtilButton>
            <PlayBarContentUtilButton>
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
                  d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                />
              </svg>
            </PlayBarContentUtilButton>
            <PlayBarContentUtilButton onClick={gotoWatchMusic}>
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
                  d="m4.5 15.75 7.5-7.5 7.5 7.5"
                />
              </svg>
              {/* <svg
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
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg> */}
            </PlayBarContentUtilButton>
          </PlayBarContentUtilContainer>
        </PlayBarContentContainer>
      </PlayBarWrapper>

      {createPlaylist && (
        <CreatePlaylistForm setCreatePlaylist={setCreatePlaylist} />
      )}
      <div>
        <YoutubePlayer
          videoId={ytPlayerState.ytId}
          onStateChange={handlePlayerStateChange}
          opts={opts}
          playerRef={playerRef}
        />
      </div>
    </Wrapper>
  );
};

export default Layout;
