import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  authState,
  playerState,
  recentPlaylistState,
  selectedMusicState,
} from "../atom";
import { Link, useNavigate } from "react-router-dom";

const ChannelContentRowHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const ChannelContentRowHeaderSmall = styled.div`
  font-size: 16px;
`;

const ChannelContentRowHeaderBig = styled.div`
  font-size: 20px;
  font-weight: 800;
`;

const ChannelContentRowMusicContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 0 100px;
`;

const ChannelContentRowMusicList = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChannelContentRowMusicItem = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #2a2a2a;
  display: flex;
  align-items: center;
  gap: 10px;
  //justify-content: space-between;
`;

const ChannelContentRowMusicImg = styled.div`
  padding-left: 15px;
  flex: 0.5;
  flex-shrink: 0;
  div {
    width: 30px;
    height: 30px;
    background: ${({ $imgUrl }) =>
      $imgUrl
        ? `url(${$imgUrl})`
        : "url(`https://i.scdn.co/image/ab67616d00001e028bcb1a80720292aaffb35989`)"};
    background-size: cover;

    cursor: pointer;
  }
`;

const ChannelContentRowMusicTitle = styled.div`
  font-size: 15px;
  font-weight: bold;
  flex: 6;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  display: flex; // 자식 요소를 왼쪽으로 배치
  align-items: center; // 텍스트를 중앙 정렬

  div {
    cursor: pointer;
    display: inline; // 자식 요소가 텍스트 크기만큼만 차지하도록 설정
  }
`;

const ChannelContentRowMusicPlays = styled.div`
  flex: 4;

  a {
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ChannelContentRowMusicAlbum = styled.div`
  font-size: 15px;
  padding-right: 15px;
  flex: 5;

  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const ChannelContentRowMusicButtonContainer = styled.div`
  width: 100%;
  display: flex;
`;

const ChannelContentRowMusicButton = styled.div`
  padding: 10px 15px;
  border: 1px solid white;
  border-radius: 15px;

  cursor: pointer;
`;

const RowMusics = ({ musicList, title, subtext, isArtist }) => {
  const setPlayer = useSetRecoilState(playerState);
  const [selectedMusic, setSelectedMusic] = useRecoilState(selectedMusicState);
  const setRecentPlaylist = useSetRecoilState(recentPlaylistState);
  const auth = useRecoilValue(authState);

  const navigate = useNavigate();

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

  const clickAlbumTitle = (albumId) => {
    navigate(`/playlist?list=${albumId}`);
  };

  return (
    <ChannelContentRowMusicContainer>
      <ChannelContentRowHeader>
        <ChannelContentRowHeaderSmall>{subtext}</ChannelContentRowHeaderSmall>
        <ChannelContentRowHeaderBig>{title}</ChannelContentRowHeaderBig>
      </ChannelContentRowHeader>
      <ChannelContentRowMusicList>
        {musicList?.map((music) => (
          <ChannelContentRowMusicItem key={music._id}>
            <ChannelContentRowMusicImg $imgUrl={music.coverImg}>
              <div />
            </ChannelContentRowMusicImg>
            <ChannelContentRowMusicTitle>
              <div onClick={() => clickPlayMusic(music)}>{music.title}</div>
            </ChannelContentRowMusicTitle>
            <ChannelContentRowMusicPlays>
              <Link
                to={`/channel/${music?.artist?._id}`}
              >{`${music?.artist?.artistName}`}</Link>
              {isArtist ? ` | 241만회 재생` : ""}
            </ChannelContentRowMusicPlays>
            <ChannelContentRowMusicAlbum
              onClick={() => clickAlbumTitle(music?.album?._id)}
            >
              {music?.album?.title}
            </ChannelContentRowMusicAlbum>
          </ChannelContentRowMusicItem>
        ))}
      </ChannelContentRowMusicList>
      {isArtist && (
        <ChannelContentRowMusicButtonContainer>
          <ChannelContentRowMusicButton>모두 표시</ChannelContentRowMusicButton>
        </ChannelContentRowMusicButtonContainer>
      )}
    </ChannelContentRowMusicContainer>
  );
};

export default RowMusics;
