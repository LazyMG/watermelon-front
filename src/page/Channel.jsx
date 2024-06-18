import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CircleMusics from "../components/CircleMusics";
import RowMusics from "../components/RowMusics";
import { useRecoilValue } from "recoil";
import { authState } from "../atom";

const ChannelWrapper = styled.div`
  margin-top: 70px;
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
  background-color: white;
  color: black;

  cursor: pointer;
`;

const Channel = () => {
  const { channelId } = useParams();
  const [channel, setChannel] = useState();
  const [isArtist, setIsArtist] = useState();
  const auth = useRecoilValue(authState);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const getChannelData = useCallback(async () => {
    const result = await fetch(
      `${import.meta.env.VITE_BACK_ADDRESS}/user/${channelId}`
    ).then((res) => res.json());
    setChannel(result.channel);
    setIsArtist(result.isArtist);
    setIsLoading(false);
  }, [channelId]);

  useEffect(() => {
    setIsLoading(true);
    getChannelData();
  }, [getChannelData]);

  const gotoAdminPage = () => {
    navigate("/admin/upload/music");
  };

  return (
    <ChannelWrapper>
      <ChannelContentContainer>
        <ChannelContentProfileContainer>
          {!isLoading && (
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
          )}
          <ChannelContentProfileInfo>
            {!isLoading && (
              <>
                <ChannelContentProfileName>
                  {isArtist ? channel?.artistName : auth?.user?.username}
                </ChannelContentProfileName>
                <ChannelContentProfileUtils>
                  {channelId === auth?.user?.userId && (
                    <ChannelContentProfileButton>
                      수정
                    </ChannelContentProfileButton>
                  )}
                  <ChannelContentProfileButton
                    onClick={auth?.user?.admin ? gotoAdminPage : null}
                  >
                    {auth?.user?.admin ? "관리자" : "공유"}
                  </ChannelContentProfileButton>
                </ChannelContentProfileUtils>
              </>
            )}
          </ChannelContentProfileInfo>
        </ChannelContentProfileContainer>
        {!isLoading && (
          <RowMusics
            musicList={channel?.musicList}
            title={isArtist ? "노래" : "반복 감상한 곡"}
            subtext={isArtist ? "" : "최근"}
            isArtist={isArtist}
          />
        )}
        {!isLoading && (
          <CircleMusics
            albumList={channel?.albumList}
            title={isArtist ? "앨범" : "반복 감상한 아티스트"}
            subtext={isArtist ? "" : "최근"}
            isAlbum={isArtist}
          />
        )}
      </ChannelContentContainer>
    </ChannelWrapper>
  );
};

export default Channel;
