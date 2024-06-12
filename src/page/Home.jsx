import styled from "styled-components";
import SamllMusics from "../components/SamllMusics";
import BigMusics from "../components/BigMusics";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { authState } from "../atom";

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
  const [isLoading, setIsLoading] = useState(false);
  const [musics, setMusics] = useState([]);
  const userData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  const auth = useRecoilValue(authState);

  //data fetch
  const getMusics = async () => {
    const result = await fetch(
      "http://localhost:3000/music/allMusic"
    ).then((res) => res.json());
    setMusics(result);
  };

  useEffect(() => {
    console.log("render");
    setIsLoading(true);
    getMusics();
    setIsLoading(false);
  }, []);

  return (
    <HomeWrapper>
      {isLoading ? null : (
        <>
          <HomeNavContainer>
            <HomeNavItem
              onClick={async () => {
                await fetch("http://localhost:3000/user/userCheck", {
                  method: "GET",
                  credentials: "include", // 쿠키를 포함하여 요청
                });
              }}
            >
              집중
            </HomeNavItem>
            <HomeNavItem>운동</HomeNavItem>
          </HomeNavContainer>
          <HomeContentContainer>
            <SamllMusics musics={musics} />
          </HomeContentContainer>
          {userData && (
            <HomeContentContainer>
              <BigMusics musics={musics} isCustom={true} title={"다시듣기"} />
            </HomeContentContainer>
          )}
          {/* <HomeContentContainer>Home</HomeContentContainer> */}
          <HomeContentContainer>
            <BigMusics musics={musics} title={"추천음악"} />
          </HomeContentContainer>
        </>
      )}
    </HomeWrapper>
  );
};

export default Home;
