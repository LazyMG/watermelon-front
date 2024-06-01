import { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background: #181818;
`;

const NavWrapper = styled.div`
  position: fixed;
  background-color: transparent;
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
  width: ${({ $open }) => ($open ? "230px" : "100px")};
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
  width: calc(100% - ${({ $open }) => ($open ? "230px" : "100px")});
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
  width: calc(100% - ${({ $open }) => ($open ? "230px" : "100px")});
  margin-left: ${({ $open }) => ($open ? "230px" : "100px")};
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
  width: ${({ $open }) => ($open ? "230px" : "100px")};
  border-right: 1px solid #232323;
`;

const MenuTopContainer = styled.div`
  margin-top: 70px;

  width: 100%;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
`;

const MenuTopItem = styled.div`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  background-color: transparent;
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

const Player = styled.div`
  position: fixed;
  background-color: green;
  bottom: 0;
  width: 100%;
  height: 70px;
  z-index: 10;

  display: none;
`;

const Layout = () => {
  const [open, setOpen] = useState(true);

  const handleClick = () => setOpen(!open);

  return (
    <Wrapper>
      <NavWrapper>
        <NavMenu $open={open}>
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
          <NavTitle>Title</NavTitle>
        </NavMenu>
        <NavContentContainer $open={open}>
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
          <NavProfileContainer>
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
          </NavProfileContainer>
        </NavContentContainer>
      </NavWrapper>
      <MenuWrapper $open={open}>
        <MenuTopContainer>
          <MenuTopItem>
            <MenuTopIcon>
              <svg
                fill="currentColor"
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
          <MenuTopItem>
            <MenuTopIcon>
              <svg
                fill="currentColor"
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
          <MenuTopItem>
            <MenuTopIcon>
              <svg
                fill="currentColor"
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
        </MenuTopContainer>
        <MenuBorder />
        <MenuBottomContainer>
          <MenuBottomCreateContainer>
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
            <MenuBottomListItem>
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
          </MenuBottomListContainer>
        </MenuBottomContainer>
      </MenuWrapper>
      <ContentWrapper $open={open}>
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
      <Player />
    </Wrapper>
  );
};

export default Layout;
