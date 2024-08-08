import styled from "styled-components";
import SmallMusics from "../components/SmallMusics";
import BigMusics from "../components/BigMusics";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState, recentPlaylistState } from "../atom";

const HomeWrapper = styled.div`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  overflow-x: hidden;
  width: 100%;
  /* padding: 0 100px; */

  //플레이될 때 추가
  margin-bottom: 70px;

  //background-color: blue;
`;

const HomeNavContainer = styled.div`
  display: flex;
  gap: 15px;
  padding: 0 100px;
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
`;

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [musics, setMusics] = useState([]);
  const auth = useRecoilValue(authState);
  const localAuth = JSON.parse(localStorage.getItem("ytMusicAuth"));
  const [recentMusic, setRecentMusic] = useRecoilState(recentPlaylistState);

  const getMusics = async () => {
    const result = await fetch(
      `${import.meta.env.VITE_BACK_ADDRESS}/music/allMusic`
    ).then((res) => res.json());
    if (!result.ok) {
      console.log(result.message);
    } else {
      setMusics(result.musics);
    }
  };

  //BigMovie로 보여주기
  const getRecentMusics = useCallback(async () => {
    const userId = auth?.user?.userId;
    if (!userId) return;
    const result = await fetch(
      `${import.meta.env.VITE_BACK_ADDRESS}/user/${userId}/getRecentMusics`
    ).then((res) => res.json());
    if (!result.ok) {
      console.log(result.message);
    } else {
      setRecentMusic(result.musics);
    }
    console.log("getRecentMusic");
  }, [auth?.user?.userId, setRecentMusic]);

  useEffect(() => {
    setIsLoading(true);
    getMusics();
    getRecentMusics();
    setIsLoading(false);
  }, [getRecentMusics]);

  return (
    <HomeWrapper>
      {isLoading ? null : (
        <>
          <HomeNavContainer>
            <HomeNavItem>집중</HomeNavItem>
            <HomeNavItem>운동</HomeNavItem>
          </HomeNavContainer>
          <HomeContentContainer>
            <SmallMusics musics={musics} />
          </HomeContentContainer>
          {localAuth?.isAuthenticated || auth.isAuthenticated ? (
            <HomeContentContainer>
              <BigMusics
                contents={recentMusic}
                isCustom={true}
                title={"다시듣기"}
              />
            </HomeContentContainer>
          ) : null}
          <HomeContentContainer>
            <BigMusics musics={musics} title={"추천음악"} />
          </HomeContentContainer>
        </>
      )}
    </HomeWrapper>
  );
};

export default Home;
