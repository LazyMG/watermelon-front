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
  //background-color: beige;
  //width: 200px;
  padding: 0;
`;

const ChannelContentRepeatArtistImg = styled.div`
  background: ${({ $imgUrl }) => ($imgUrl ? `url(${$imgUrl})` : `url('')`)};
  //background: url("https://i.scdn.co/image/ab67616d00001e028bcb1a80720292aaffb35989");
  border-radius: ${({ $isAlbum }) => ($isAlbum ? "5px" : "50%")};
  //border-radius: 50%;
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
`;

const ChannelContentRepeatArtistTime = styled.div`
  font-size: 15px;
`;

const CircleMusics = ({ albumList, title, subtext, isAlbum }) => {
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
              <ChannelContentRepeatArtistName>
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
