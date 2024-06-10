import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CircleMusics from "../components/CircleMusics";
import RowMusics from "../components/RowMusics";

const ChannelWrapper = styled.div`
  margin-top: 70px;
  //background-color: yellow;
  display: flex;
  flex-direction: column;
  gap: 50px;
  //overflow-x: hidden;
  width: 100%;

  //플레이될 때 추가
  margin-bottom: 80px;
`;

const ChannelContentContainer = styled.div`
  margin-top: 20px;
  //height: 900px;
  display: flex;
  flex-direction: column;

  gap: 70px;
`;

const ChannelContentProfileContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const ChannelContentProfileImg = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;

  background: ${({ $imgUrl }) => $imgUrl && `url(${$imgUrl})`};
  background-repeat: no-repeat;
  background-size: cover;
`;

const ChannelContentProfileInfo = styled.div`
  width: calc(100% - 200px);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChannelContentProfileName = styled.div`
  font-size: 40px;
  font-weight: bold;
`;

const ChannelContentProfileUtils = styled.div`
  display: flex;
  gap: 10px;
  padding-right: 15px;
`;

const ChannelContentProfileButton = styled.div`
  padding: 10px 15px;
  border-radius: 15px;
  background-color: red;

  cursor: pointer;
`;

const Channel = () => {
  const { channelId } = useParams();
  const userData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : {};
  const [channel, setChannel] = useState();
  const [isArtist, setIsArtist] = useState();

  useEffect(() => {
    getChannelData();
  }, []);

  const getChannelData = async () => {
    const result = await fetch(
      `http://localhost:3000/user/${channelId}`
    ).then((res) => res.json());
    console.log(result.channel.albumList);
    setChannel(result.channel);
    setIsArtist(result.isArtist);
  };

  return (
    <ChannelWrapper>
      <ChannelContentContainer>
        <ChannelContentProfileContainer>
          <ChannelContentProfileImg $imgUrl={isArtist ? channel?.imgUrl : ""}>
            {!isArtist && (
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z"
                />
              </svg>
            )}
          </ChannelContentProfileImg>
          <ChannelContentProfileInfo>
            <ChannelContentProfileName>
              {channel?.artistName || userData.username}
            </ChannelContentProfileName>
            <ChannelContentProfileUtils>
              {channelId === userData._id && (
                <ChannelContentProfileButton>수정</ChannelContentProfileButton>
              )}
              <ChannelContentProfileButton>공유</ChannelContentProfileButton>
            </ChannelContentProfileUtils>
          </ChannelContentProfileInfo>
        </ChannelContentProfileContainer>
        {/* <ChannelContentRepeatMusicContainer>
          <ChannelContentRepeatHeader>
            <ChannelContentRepeatHeaderSmall>
              최근 • 비공개
            </ChannelContentRepeatHeaderSmall>
            <ChannelContentRepeatHeaderBig>
              반복 감상한 곡
            </ChannelContentRepeatHeaderBig>
          </ChannelContentRepeatHeader>
          <ChannelContentRepeatMusicList>
            {channel?.musicList?.map((music) => (
              <ChannelContentRepeatMusicItem key={music._id}>
                <ChannelContentRepeatMusicImg>
                  <div />
                </ChannelContentRepeatMusicImg>
                <ChannelContentRepeatMusicTitle
                  onClick={() => handleClick(music)}
                >
                  {music.title}
                </ChannelContentRepeatMusicTitle>
                <ChannelContentRepeatMusicPlays>
                  {channel.artistName} | 241만회 재생
                </ChannelContentRepeatMusicPlays>
                <ChannelContentRepeatMusicAlbum
                  onClick={() => clickAlbumTitle(music.album?._id)}
                >
                  {music.album?.title}
                </ChannelContentRepeatMusicAlbum>
              </ChannelContentRepeatMusicItem>
            ))}
          </ChannelContentRepeatMusicList>
        </ChannelContentRepeatMusicContainer> */}
        <RowMusics
          musicList={channel?.musicList}
          title={isArtist ? "노래" : "반복 감상한 곡"}
          subtext={isArtist ? "" : "최근"}
          isArtist={isArtist}
        />
        <CircleMusics
          albumList={channel?.albumList}
          title={isArtist ? "앨범" : "반복 감상한 아티스트"}
          subtext={isArtist ? "" : "최근"}
          isAlbum={isArtist}
        />
      </ChannelContentContainer>
    </ChannelWrapper>
  );
};

export default Channel;