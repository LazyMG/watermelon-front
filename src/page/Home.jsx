import styled from "styled-components";
import SamllMusics from "../components/SamllMusics";
import BigMusics from "../components/BigMusics";

const HomeWrapper = styled.div`
  margin-top: 70px;
  //padding-top: 500px;
  //background-color: yellow;
  display: flex;
  flex-direction: column;
  gap: 50px;
  overflow-x: hidden;
  width: 100%;

  //플레이될 때 추가
  margin-bottom: 70px;
`;

const HomeNavContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const HomeNavItem = styled.div`
  font-size: 16px;
  padding: 10px;
  border-radius: 10px;
  background-color: #3a3a3a;

  cursor: pointer;

  &:hover {
    background-color: #565656;
  }
`;

const HomeContentContainer = styled.div`
  width: 100%;
  //height: 600px;
  //background-color: blue;
`;

const HomeRecommandContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: yellow;
`;

const Home = () => {
  return (
    <HomeWrapper>
      <HomeNavContainer>
        <HomeNavItem>집중</HomeNavItem>
        <HomeNavItem>운동</HomeNavItem>
      </HomeNavContainer>
      <HomeContentContainer>
        <SamllMusics />
      </HomeContentContainer>
      <HomeContentContainer>
        <BigMusics />
      </HomeContentContainer>
      {/* <HomeContentContainer>Home</HomeContentContainer> */}
      <HomeContentContainer>
        <BigMusics />
      </HomeContentContainer>
    </HomeWrapper>
  );
};

export default Home;
