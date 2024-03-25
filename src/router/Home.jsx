import styled from "styled-components";
import YoutubePlayer from "../components/YoutubePlayer";
import { useState } from "react";

const HomeWrapper = styled.div`
  padding-top: 30px;
  padding-left: 10px;
  padding-right: 30px;
  //background-color: blue;
  display: grid;
  grid-template-rows: 0.5fr 2.5fr 2.5fr;
  gap: 5px;
`;

const HomeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 30px;
`;

const InputDiv = styled.div`
  width: 80%;
  position: relative;
  input {
    width: 50%;
    padding: 10px 15px;
    padding-left: 45px;
    font-size: 15px;
    border-radius: 10px;
  }
  svg {
    width: 25px;
    color: black;
    position: absolute;
    left: 10px;
    top: 8px;
    cursor: pointer;
  }
`;

const LoginButton = styled.div`
  color: black;
  background-color: #d9dbd1;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
`;

const HomeReplaySection = styled.div`
  //background-color: red;
  display: grid;
  grid-template-rows: 0.5fr 3fr;
  padding: 20px;
  padding-bottom: 0;
`;

const ReplayHeader = styled.div`
  //background-color: blue;
  padding-block: 5px;
  padding-left: 10px;
  display: flex;
  align-items: center;
`;

const ReplayTitle = styled.span`
  color: black;
  font-size: 35px;
  font-weight: 600;
`;

const ReplayContainer = styled.div`
  //background-color: green;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 15px;
`;

const ReplayItem = styled.div`
  background-color: green;
`;

const HomeRecommandSection = styled.div`
  //background-color: yellow;
  display: grid;
  grid-template-rows: 0.5fr 3fr;
  padding-inline: 20px;
`;

const RecommandHeader = styled.div`
  padding-block: 5px;
  padding-left: 10px;
  display: flex;
  align-items: center;
`;

const RecommandTitle = styled.span`
  color: black;
  font-size: 35px;
  font-weight: 600;
`;

const RecommandContainer = styled.div`
  //background-color: blue;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  padding-bottom: 80px;
`;

const RecommandColum = styled.div`
  //background-color: red;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  gap: 10px;
`;

const RecommandItem = styled.div`
  background-color: green;
`;

const Home = () => {
  const [ytId, setYtId] = useState("jia05SIv73M");
  const onClick = () => {
    setYtId("5_eOnNPzEII");
    console.log("click");
    console.log(ytId);
  };
  return (
    <HomeWrapper>
      <HomeHeader>
        <InputDiv>
          <input type="text" placeholder="노래,앨범,아티스트 검색" />
          <svg
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
          </svg>
        </InputDiv>
        <LoginButton>GoogleLogin</LoginButton>
      </HomeHeader>
      <HomeReplaySection>
        <ReplayHeader>
          <ReplayTitle>다시 듣기</ReplayTitle>
        </ReplayHeader>
        <ReplayContainer>
          <ReplayItem></ReplayItem>
          <ReplayItem></ReplayItem>
          <ReplayItem></ReplayItem>
          <ReplayItem></ReplayItem>
          <ReplayItem></ReplayItem>
          <ReplayItem></ReplayItem>
        </ReplayContainer>
      </HomeReplaySection>
      <HomeRecommandSection>
        <RecommandHeader>
          <RecommandTitle>추천 음악</RecommandTitle>
        </RecommandHeader>
        <RecommandContainer>
          <RecommandColum>
            <RecommandItem></RecommandItem>
            <RecommandItem></RecommandItem>
            <RecommandItem></RecommandItem>
          </RecommandColum>
          <RecommandColum>
            <RecommandItem></RecommandItem>
            <RecommandItem></RecommandItem>
            <RecommandItem></RecommandItem>
          </RecommandColum>
          <RecommandColum>
            <RecommandItem></RecommandItem>
            <RecommandItem></RecommandItem>
            <RecommandItem></RecommandItem>
          </RecommandColum>
          <RecommandColum>
            <RecommandItem></RecommandItem>
            <RecommandItem></RecommandItem>
            <RecommandItem></RecommandItem>
          </RecommandColum>
        </RecommandContainer>
      </HomeRecommandSection>
      <button onClick={onClick}>Click</button>
      <YoutubePlayer videoId={ytId} />
    </HomeWrapper>
  );
};

export default Home;
