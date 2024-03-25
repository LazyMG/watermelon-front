import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #edefe5;
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr 3.5fr;
`;

const MenuWrapper = styled.div`
  //background-color: blue;
  padding: 25px;
  padding-block: 20px;
`;

const Menu = styled.div`
  width: 100%;
  height: 100%;
  background-color: #d9dbd1;
  border-radius: 20px;
  display: grid;
  grid-template-rows: 1fr 2.5fr;
`;

const MenuHeader = styled.div`
  //background-color: green;
  padding: 35px;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Title = styled.h1`
  color: black;
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const LinkDiv = styled.div`
  cursor: pointer;
  width: 100%;
  //background-color: red;
  font-size: 25px;
  padding-inline: 30px;
  padding-block: 10px;
  border-radius: 15px;
  color: black;

  &:hover {
    opacity: 0.7;
  }
`;

const MenuListContainer = styled.div`
  //background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;
`;

const MusicListLine = styled.div`
  width: 65%;
  height: 1px;
  background-color: black;
  align-self: center;
`;

const MusicList = styled.div`
  //background-color: tomato;
  width: 85%;
  height: 100%;
  align-self: center;
`;

const Layout = () => {
  return (
    <Wrapper>
      <MenuWrapper>
        <Menu>
          <MenuHeader>
            <Title>🎶Watermelon</Title>
            <LinkDiv>Home</LinkDiv>
            <LinkDiv>Profile</LinkDiv>
          </MenuHeader>
          <MenuListContainer>
            <MusicListLine />
            <MusicList></MusicList>
          </MenuListContainer>
        </Menu>
      </MenuWrapper>
      <Outlet />
    </Wrapper>
  );
};

export default Layout;
