import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  //background-color: blue;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 300px;
  padding-top: 90px;
  overflow-y: auto;
`;

const ListContainer = styled.div`
  width: 100%;
  height: 100%;
  //background-color: red;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ListItem = styled.div`
  width: 100%;
  background-color: #707070;
  border-radius: 10px;
  font-size: 30px;
  display: flex;
  justify-content: center;
  padding: 10px 0;

  cursor: pointer;
`;

const ArtistMusic = () => {
  const [musics, setMusics] = useState();
  const [artist, setArtist] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { artistId } = useParams();

  const getMusics = async () => {
    const result = await fetch(
      "http://localhost:3000/connect/artistMusic"
    ).then((res) => res.json());
    setMusics(result);
  };

  const getArtist = useCallback(async () => {
    const result = await fetch(
      `http://localhost:3000/artist/${artistId}`
    ).then((res) => res.json());
    setArtist(result);
  }, [artistId]);

  // const getMusics = async () => {
  //   const result = await fetch("http://localhost:3000/connect/artistMusic").then((res) => res.json());
  //   setMusics((prevMusics) => (JSON.stringify(prevMusics) !== JSON.stringify(result) ? result : prevMusics));
  // };

  // const getArtist = useCallback(async () => {
  //   const result = await fetch(`http://localhost:3000/artist/${artistId}`).then((res) => res.json());
  //   setArtist((prevArtist) => (JSON.stringify(prevArtist) !== JSON.stringify(result) ? result : prevArtist));
  // }, [artistId]);

  useEffect(() => {
    setIsLoading(true);
    getMusics();
    getArtist();
    setIsLoading(false);
    console.log("render");
  }, [artistId]);

  const postMusicToArtist = async (musicId) => {
    const postData = {
      artistId,
      musicId,
    };
    fetch("http://localhost:3000/connect/artistMusic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        const statusCode = response.status;
        if (statusCode === 200) {
          console.log("ok");
        } else alert("falied!");
      })
      .catch((error) => console.error("Error:", error));
  };

  const clickMusic = (music) => {
    if (
      confirm(`${music.title}을(를) ${artist.artistName}에 추가하시겠습니까?`)
    ) {
      postMusicToArtist(music._id);
      console.log("ok");
    } else return;
  };

  return (
    <Wrapper>
      {isLoading ? null : (
        <ListContainer>
          {/* {albumData.map((data) => (
      <ListItem onClick={() => gotoAlbumMusic(data.id)} key={data.id}>
        {data.title}
      </ListItem>
    ))} */}
          {musics?.map((music) => (
            <ListItem onClick={() => clickMusic(music)} key={music._id}>
              {music.title}
            </ListItem>
          ))}
        </ListContainer>
      )}
    </Wrapper>
  );
};

export default ArtistMusic;
