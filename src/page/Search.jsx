import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { playerState, selectedMusicState } from "../atom";

const SeacrhWrapper = styled.div`
  margin-top: 30px;
  //background-color: yellow;
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
  //background-color: blue;
  margin: 0 10px;
  //padding: 20px 0;
  border-bottom: 1px solid #c9c9c91b;
`;

const SeacrhCategoryItem = styled.div`
  padding: 20px 0;
  border-bottom: 2px solid #fff;
  //height: 50px;

  cursor: pointer;
`;

const SearchNavContainer = styled.div`
  display: flex;
  gap: 15px;
  padding: 0 10px;
  //background-color: yellow;
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
  //background: url("https://i.scdn.co/image/ab67616d00001e028bcb1a80720292aaffb35989");
  background: ${({ $imgUrl }) =>
    $imgUrl
      ? `url(${$imgUrl})`
      : `url("https://i.scdn.co/image/ab67616d00001e028bcb1a80720292aaffb35989")`};
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

const SearchResultBottom = styled.div`
  margin-top: 10px;
  display: flex;
`;

const SearchResultButton = styled.div`
  border: 1px solid #c9c9c91b;
  //background-color: blue;
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

  const [playlist, setPlaylist] = useState();
  const setPlayerState = useSetRecoilState(playerState);
  const setSelectedMusic = useSetRecoilState(selectedMusicState);

  const navigate = useNavigate();

  const getResults = useCallback(async () => {
    const result = await fetch(
      `http://localhost:3000/search?keyword=${keyword}`
    ).then((res) => res.json());
    console.log(result);
    setArtists(result.data.artists);
    setMusics(result.data.musics);
    setAlbums(result.data.albums);
  }, [keyword]);

  useEffect(() => {
    getResults();
  }, []);

  const handleClick = (music) => {
    setPlayerState({
      ...playerState,
      ytId: music.ytId,
      isPlaying: true,
      isPaused: false,
    });
    setSelectedMusic(music);
  };

  const clickArtist = (artistId) => {
    navigate(`/channel/${artistId}`);
  };

  return (
    <SeacrhWrapper>
      <SeacrhCategoryContainer>
        <SeacrhCategoryItem>YT MUSIC</SeacrhCategoryItem>
        <SeacrhCategoryItem>보관함</SeacrhCategoryItem>
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
                    onClick={() => handleClick(music)}
                  >
                    {music.title}
                  </SearchResultMusicItemTitle>
                  <SearchResultItemOverview>
                    {music.artist.artistName} • {music.album.title} •{" "}
                    {music.duration} • 5808만회 재생
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
            {/* {Array.from({ length: 3 }).map((_, idx) => (
            <SearchResultItem key={idx}>
              <SearchResultItemImg $isArtist={true} />
              <SearchResultItemInfo>
                <SearchResultItemTitle>비와 당신</SearchResultItemTitle>
                <SearchResultItemOverview>
                  럼블피쉬 • Memory For You • 4:08 • 5808만회 재생
                </SearchResultItemOverview>
              </SearchResultItemInfo>
            </SearchResultItem>
          ))} */}
            {artists?.map((artist) => (
              <SearchResultItem
                key={artist._id}
                onClick={() => clickArtist(artist._id)}
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
      {/* <SearchResultContainer>
        <SearchResultHeader>앨범</SearchResultHeader>
        <SearchResultList>
          {Array.from({ length: 3 }).map((_, idx) => (
            <SearchResultItem key={idx}>
              <SearchResultItemImg $isArtist={false} />
              <SearchResultItemInfo>
                <SearchResultItemTitle>비와 당신</SearchResultItemTitle>
                <SearchResultItemOverview>
                  럼블피쉬 • Memory For You • 4:08 • 5808만회 재생
                </SearchResultItemOverview>
              </SearchResultItemInfo>
            </SearchResultItem>
          ))}
        </SearchResultList>
        <SearchResultBottom>
          <SearchResultButton>모두 표시</SearchResultButton>
        </SearchResultBottom>
      </SearchResultContainer> */}
    </SeacrhWrapper>
  );
};

export default Search;
