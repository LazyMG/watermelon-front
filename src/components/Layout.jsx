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
`;

const ContentWrapper = styled.div`
  flex: 1;
  background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 100px;
  padding-top: 40px;
  width: calc(100% - ${({ $open }) => ($open ? "230px" : "0")});
  margin-left: ${({ $open }) => ($open ? "230px" : "0")};
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
  display: ${({ $open }) => ($open ? "block" : "none")};
`;

const Temp = styled.div`
  margin-top: 70px;
  background-color: blue;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-x: hidden;
  width: 100%;
`;

const Component = styled.div`
  width: 100%;
  height: 600px;
  background-color: white;
`;

const Player = styled.div``;

const Layout = () => {
  const [open, setOpen] = useState(true);

  const handleClick = () => setOpen(!open);
  return (
    <Wrapper>
      <NavWrapper>Logo</NavWrapper>
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
