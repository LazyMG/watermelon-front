//1.완료되지 않은 모든 앨범 get하기
//2.앨범 목록 중 하나 클릭
//3.앨범 클릭하면 음악 선택 페이지로 이동

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const albumData = [
  {
    title: "새 앨범1",
    releasedDate: "2024.06.05.1",
    duration: "20:14",
    overview: "새 앨범",
    coverImg: "1234",
    id: "1234",
  },
  {
    title: "새 앨범2",
    releasedDate: "2024.06.05.2",
    duration: "20:14",
    overview: "새 앨범",
    coverImg: "1234",
    id: "1235",
  },
  {
    title: "새 앨범3",
    releasedDate: "2024.06.05.3",
    duration: "20:14",
    overview: "새 앨범",
    coverImg: "1237",
    id: "1236",
  },
];

const ConnectAlbum = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [albums, setAlbums] = useState();
  const navigate = useNavigate();

  const getAlbums = async () => {
    const result = await fetch(
      "http://localhost:3000/connect/album"
    ).then((res) => res.json());
    setAlbums(result);
  };

  useEffect(() => {
    setIsLoading(true);
    getAlbums();
    setIsLoading(false);
  }, []);

  const gotoAlbumMusic = (id) => {
    navigate(`/admin/connect/album/${id}/albumMusic`);
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
          {albums?.map((album) => (
            <ListItem onClick={() => gotoAlbumMusic(album._id)} key={album._id}>
              {album.title}
            </ListItem>
          ))}
        </ListContainer>
      )}
    </Wrapper>
  );
};

export default ConnectAlbum;
