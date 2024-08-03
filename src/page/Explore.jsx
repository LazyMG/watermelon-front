import styled from "styled-components";
import BigMusics from "../components/BigMusics";
import { useEffect, useState } from "react";

const ExploreWrapper = styled.div`
  margin-top: 70px;
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
`;

const Explore = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [musics, setMusics] = useState([]);

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

  useEffect(() => {
    setIsLoading(true);
    getMusics();
    setIsLoading(false);
  }, []);

  return (
    <ExploreWrapper>
      {isLoading ? null : (
        <>
          <ExploreContentContainer>
            <BigMusics title={"최근 추가된 곡"} musics={musics} />
          </ExploreContentContainer>
          <ExploreContentContainer>
            <BigMusics title={"가장 많이 듣는 곡"} musics={musics} />
          </ExploreContentContainer>
          <ExploreContentContainer>
            <BigMusics title={"가장 인기 있는 곡"} musics={musics} />
          </ExploreContentContainer>
        </>
      )}
    </ExploreWrapper>
  );
};

export default Explore;
