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

const ListTitle = styled.div`
  width: 100%;
  border-radius: 10px;
  font-size: 30px;
  display: flex;
  justify-content: center;
  padding: 10px 0;
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

const ArtistAlbum = () => {
  const [albums, setAlbums] = useState([]);
  const [artist, setArtist] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { artistId } = useParams();

  const getAlbums = async () => {
    const result = await fetch(
      "http://localhost:3000/connect/artistAlbum"
    ).then((res) => res.json());
    setAlbums(result);
  };

  const getArtist = useCallback(async () => {
    const result = await fetch(
      `http://localhost:3000/artist/${artistId}`
    ).then((res) => res.json());
    setArtist(result);
  }, [artistId]);

  useEffect(() => {
    setIsLoading(true);
    getAlbums();
    getArtist();
    setIsLoading(false);
    console.log("render");
  }, [artistId]);

  const postAlbumToArtist = async (albumId) => {
    const postData = {
      artistId,
      albumId,
    };
    fetch("http://localhost:3000/connect/artistAlbum", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        const statusCode = response.status;
        if (statusCode === 200) {
          alert("완료되었습니다.");
          getAlbums();
        } else alert("falied!");
      })
      .catch((error) => console.error("Error:", error));
  };

  const clickAlbum = (album) => {
    if (
      confirm(`${album.title}을(를) ${artist.artistName}에 추가하시겠습니까?`)
    ) {
      postAlbumToArtist(album._id);
      console.log("ok");
    } else return;
  };

  return (
    <Wrapper>
      {isLoading ? null : (
        <ListContainer>
          <ListTitle>{artist?.artistName}</ListTitle>
          {albums?.map((album) => (
            <ListItem onClick={() => clickAlbum(album)} key={album._id}>
              {album.title}
            </ListItem>
          ))}
        </ListContainer>
      )}
    </Wrapper>
  );
};

export default ArtistAlbum;
