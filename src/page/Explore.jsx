import styled from "styled-components";
import BigMusics from "../components/BigMusics";

const ExploreWrapper = styled.div`
  margin-top: 70px;
  //background-color: yellow;
  display: flex;
  flex-direction: column;
  gap: 50px;
  overflow-x: hidden;
  width: 100%;

  //플레이될 때 추가
  margin-bottom: 70px;
`;

const ExploreContentContainer = styled.div`
  width: 100%;
  //height: 600px;
  //background-color: blue;
`;

const Explore = () => {
  return (
    <ExploreWrapper>
      <ExploreContentContainer>
        <BigMusics />
      </ExploreContentContainer>
      <ExploreContentContainer>
        <BigMusics />
      </ExploreContentContainer>
      <ExploreContentContainer>
        <BigMusics />
      </ExploreContentContainer>
    </ExploreWrapper>
  );
};

export default Explore;
