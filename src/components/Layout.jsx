import { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  //width: 100vw;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const NavWrapper = styled.div`
  position: fixed;
  background-color: yellow;
  top: 0;
  width: 100%;
  height: 70px;
  z-index: 10;
  color: yellow;
  font-weight: 800;
  display: flex;
`;

const NavMenu = styled.div`
  background-color: blue;
  width: ${({ $open }) => ($open ? "230px" : "100px")};
`;

const NavContentContainer = styled.div`
  background-color: red;
  width: calc(100% - ${({ $open }) => ($open ? "230px" : "100px")});
  padding-left: 100px;
  display: flex;
  padding-right: 100px;
  justify-content: space-between;
`;

const NavSearchContainer = styled.div`
  width: 100px;
  background-color: green;
`;

const NavProfileContainer = styled.div`
  width: 80px;
  background-color: purple;
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
`;

const MenuWrapper = styled.div`
  background-color: black;
  position: fixed;
  height: 100%;
  width: 230px;
  top: 0;
  left: 0;
  width: ${({ $open }) => ($open ? "230px" : "100px")};
`;

const Temp = styled.div`
  margin-top: 70px;
  //background-color: blue;
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
  background-color: yellow;
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
        <NavMenu $open={open} />
        <NavContentContainer $open={open}>
          <NavSearchContainer />
          <NavProfileContainer />
        </NavContentContainer>
      </NavWrapper>
      <MenuWrapper $open={open}></MenuWrapper>
      <ContentWrapper $open={open}>
        {/* <Outlet /> */}
        <Temp>
          <Component onClick={handleClick} />
          <Component />
          <Component />
          <Component />
          <Component />
          <Component />
          <Component />
        </Temp>
      </ContentWrapper>
      <Player />
    </Wrapper>
  );
};

export default Layout;
