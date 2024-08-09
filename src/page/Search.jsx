import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  authState,
  playerState,
  recentPlaylistState,
  selectedMusicState,
} from "../atom";

const SeacrhWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  //overflow-x: hidden;
  width: 100%;
`;

const SeacrhCategoryContainer = styled.div`
  display: flex;
  gap: 30px;
  width: calc(100% - 20px);
  margin: 0 10px;
  //padding: 20px 0;
  border-bottom: 1px solid #c9c9c91b;
`;

const SeacrhCategoryItem = styled.div`
  padding: 20px 0;
  //border-bottom: 2px solid #fff;
  ${({ $category }) => $category && `border-bottom: 2px solid #fff;`}
  opacity: ${({ $category }) => ($category ? "1" : "0.6")};
  //height: 50px;

  cursor: pointer;
`;

const SearchNavContainer = styled.div`
  display: flex;
  gap: 15px;
  padding: 0 10px;
`;

const SearchNavItem = styled.div`
  font-size: 16px;
  padding: 10px;
  border-radius: 10px;
  background-color: #3a3a3a;

  cursor: pointer;

  &:hover {
    background-color: #565656;
  }
`;

const SearchResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  gap: 10px;
  margin-bottom: 40px;
`;

const SearchResultHeader = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const SearchResultList = styled.div`
  padding-top: 15px;
  display: flex;
  flex-direction: column;
`;

const SearchResultMusicItem = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 15px 10px;

  border-bottom: 1px solid #c9c9c91b;
`;

const SearchResultItem = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 15px 10px;

  border-bottom: 1px solid #c9c9c91b;

  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const SearchResultItemImg = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 5px;
  background: ${({ $imgUrl }) => ($imgUrl ? `url(${$imgUrl})` : ``)};
  background-size: cover;

  ${({ $isArtist }) => $isArtist && "border-radius:50%;"}
`;

const SearchResultItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SearchResultItemTitle = styled.div`
  font-size: 17px;
`;

const SearchResultMusicItemTitle = styled.div`
  font-size: 17px;

  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const SearchResultItemOverview = styled.div`
  display: flex;
  font-size: 17px;
`;

const SearchResultItemArtistName = styled.span`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const SearchResultItemAlbumTitle = styled.span`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const SearchResultBottom = styled.div`
  margin-top: 10px;
  display: flex;
`;

const SearchResultButton = styled.div`
  border: 1px solid #c9c9c91b;
  padding: 10px 15px;
  border-radius: 15px;

  cursor: pointer;

  &:hover {
    background-color: #565656;
  }
`;

const Search = () => {
  const data = new URLSearchParams(useLocation().search);
  const keyword = data.get("q");

  const [artists, setArtists] = useState([]);
  const [musics, setMusics] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [category, setCategory] = useState("YTMUSIC");

  const [playlist, setPlaylist] = useState();
  const setPlayer = useSetRecoilState(playerState);
  const [selectedMusic, setSelectedMusic] = useRecoilState(selectedMusicState);

  const setRecentPlaylist = useSetRecoilState(recentPlaylistState);
  const auth = useRecoilValue(authState);

  const navigate = useNavigate();

  const getResults = useCallback(async () => {
    const result = await fetch(
      `${import.meta.env.VITE_BACK_ADDRESS}/search?keyword=${keyword}`
    ).then((res) => res.json());
    //console.log(result);
    setArtists(result.data.artists);
    setMusics(result.data.musics);
    setAlbums(result.data.albums);
  }, [keyword]);

  useEffect(() => {
    getResults();
  }, []);

  const clickPlayMusic = async (music) => {
    if (selectedMusic && selectedMusic?.ytId === music?.ytId) return;
    setPlayer((prev) => ({
      ...prev,
      ytId: music.ytId,
      isPlaying: true,
      isPaused: false,
      isEnd: false,
      timestamp: Date.now(),
    }));
    setSelectedMusic(music);
    setRecentPlaylist((prev) => {
      if (prev.some((prevMusic) => prevMusic.ytId === music.ytId)) return prev;
      if (prev.length >= 20) {
        prev.shift();
      }
      return [music, ...prev];
    });
    //노래 조회수 추가
    //최근 음악에 추가 api 호출
    const userId = auth?.user?.userId;
    if (!userId) return;
    const result = await fetch(
      `${import.meta.env.VITE_BACK_ADDRESS}/user/${userId}/add-recentMusic`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ music }),
      }
    )
      .then((response) => response.json())
      .catch((error) => console.error("Error:", error));
    if (!result.ok) {
      console.log(result.message);
    } else {
      console.log(result.message, "success");
    }
  };

  const gotoArtistPage = (artistId) => {
    navigate(`/channel/${artistId}`);
  };

  const gotoAlbumPage = (albumId) => {
    navigate(`/playlist?list=${albumId}`);
  };

  return (
    <SeacrhWrapper>
      <SeacrhCategoryContainer>
        <SeacrhCategoryItem
          onClick={() => setCategory("YTMUSIC")}
          $category={category === "YTMUSIC"}
        >
          YT MUSIC
        </SeacrhCategoryItem>
        <SeacrhCategoryItem
          onClick={() => setCategory("STORAGE")}
          $category={category === "STORAGE"}
        >
          보관함
        </SeacrhCategoryItem>
      </SeacrhCategoryContainer>
      <SearchNavContainer>
        <SearchNavItem>노래</SearchNavItem>
        <SearchNavItem>아티스트</SearchNavItem>
        <SearchNavItem>앨범</SearchNavItem>
      </SearchNavContainer>
      {musics?.length !== 0 && (
        <SearchResultContainer>
          <SearchResultHeader>노래</SearchResultHeader>
          <SearchResultList>
            {musics?.map((music) => (
              <SearchResultMusicItem key={music._id}>
                <SearchResultItemImg
                  $isArtist={false}
                  $imgUrl={music.coverImg}
                />
                <SearchResultItemInfo>
                  <SearchResultMusicItemTitle
                    onClick={() => clickPlayMusic(music)}
                  >
                    {music.title}
                  </SearchResultMusicItemTitle>
                  <SearchResultItemOverview>
                    <SearchResultItemArtistName
                      onClick={() => gotoArtistPage(music.artist._id)}
                    >
                      {music.artist.artistName}
                    </SearchResultItemArtistName>
                    •
                    <SearchResultItemAlbumTitle
                      onClick={() => gotoAlbumPage(music.album._id)}
                    >
                      {music.album.title}
                    </SearchResultItemAlbumTitle>{" "}
                    • {music.duration} • 5808만회 재생
                  </SearchResultItemOverview>
                </SearchResultItemInfo>
              </SearchResultMusicItem>
            ))}
          </SearchResultList>
          <SearchResultBottom>
            <SearchResultButton>모두 표시</SearchResultButton>
          </SearchResultBottom>
        </SearchResultContainer>
      )}
      {artists?.length !== 0 && (
        <SearchResultContainer>
          <SearchResultHeader>아티스트</SearchResultHeader>
          <SearchResultList>
            {artists?.map((artist) => (
              <SearchResultItem
                key={artist._id}
                onClick={() => gotoArtistPage(artist._id)}
                $clickable={true}
              >
                <SearchResultItemImg $isArtist={true} $imgUrl={artist.imgUrl} />
                <SearchResultItemInfo>
                  <SearchResultItemTitle>
                    {artist.artistName}
                  </SearchResultItemTitle>
                  <SearchResultItemOverview>아티스트</SearchResultItemOverview>
                </SearchResultItemInfo>
              </SearchResultItem>
            ))}
          </SearchResultList>
          <SearchResultBottom>
            <SearchResultButton>모두 표시</SearchResultButton>
          </SearchResultBottom>
        </SearchResultContainer>
      )}
    </SeacrhWrapper>
  );
};

export default Search;
