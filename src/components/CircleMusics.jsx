import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ChannelContentRepeatHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const ChannelContentRepeatHeaderSmall = styled.div`
  font-size: 16px;
`;

const ChannelContentRepeatHeaderBig = styled.div`
  font-size: 20px;
  font-weight: 800;
`;

const ChannelContentRepeatArtistContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ChannelContentRepeatArtistList = styled.div`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  gap: 15px;
`;

const ChannelContentRepeatArtistItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  //width: 200px;
  padding: 0;
`;

const ChannelContentRepeatArtistImg = styled.div`
  background: ${({ $imgUrl }) => ($imgUrl ? `url(${$imgUrl})` : `url('')`)};
  border-radius: ${({ $isAlbum }) => ($isAlbum ? "5px" : "50%")};
  background-size: cover;

  width: 200px;
  height: 200px;
`;

const ChannelContentRepeatArtistInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  align-items: center;
`;

const ChannelContentRepeatArtistName = styled.div`
  font-size: 15px;
  font-weight: bold;

  cursor: pointer;
`;

const ChannelContentRepeatArtistTime = styled.div`
  font-size: 15px;
`;

const CircleMusics = ({ albumList, title, subtext, isAlbum }) => {
  const navigate = useNavigate();

  const clickAlbumTitle = (albumId) => {
    navigate(`/playlist?list=${albumId}`);
  };

  return (
    <ChannelContentRepeatArtistContainer>
      <ChannelContentRepeatHeader>
        <ChannelContentRepeatHeaderSmall>
          {subtext}
        </ChannelContentRepeatHeaderSmall>
        <ChannelContentRepeatHeaderBig>{title}</ChannelContentRepeatHeaderBig>
      </ChannelContentRepeatHeader>
      <ChannelContentRepeatArtistList>
        {albumList?.map((album) => (
          <ChannelContentRepeatArtistItem key={album._id}>
            <ChannelContentRepeatArtistImg
              $imgUrl={album.coverImg}
              $isAlbum={isAlbum}
            />
            <ChannelContentRepeatArtistInfo>
              <ChannelContentRepeatArtistName
                onClick={() => clickAlbumTitle(album._id)}
              >
                {album.title}
              </ChannelContentRepeatArtistName>
              <ChannelContentRepeatArtistTime>
                {album.duration}
              </ChannelContentRepeatArtistTime>
            </ChannelContentRepeatArtistInfo>
          </ChannelContentRepeatArtistItem>
        ))}
      </ChannelContentRepeatArtistList>
    </ChannelContentRepeatArtistContainer>
  );
};

export default CircleMusics;
