//1.모든 아티스트 get하기
//2.아티스트 목록 중 하나 클릭
//3.아티스트 클릭하면 모달창이 뜸
//4.모달창으로 페이지 이동 -> 앨범 선택 혹은 음악 선택

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useOnClickOutSide from "../../hooks/useOnClickOutSide";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
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

const ModalWrapper = styled.div`
  z-index: 1200;
  position: absolute;
`;

const ModalContainer = styled.div`
  position: fixed;
  inset: 0px;
  background-color: rgb(0 0 0 /71%);
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: center;
  //padding: 20px 0;
`;

const Modal = styled.div`
  position: relative;
  max-width: 800px;
  background: #111;
  border-radius: 8px;

  width: 600px;
  height: 200px;

  border: 1px solid #414141;
`;

const ModalClose = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 25px;

  cursor: pointer;
`;

const ModalContent = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
  gap: 50px;
`;

const ModalTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const ModalButtonRow = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
`;

const ModalButton = styled.div`
  padding: 10px 15px;
  background-color: #919191;
  border-radius: 15px;

  cursor: pointer;
`;

const ArtistModal = ({ setArtistModalOpen, selectedAritst }) => {
  const ref = useRef();
  const navigate = useNavigate();

  useOnClickOutSide(ref, () => {
    setArtistModalOpen(false);
  });

  const gotoArtistMusic = (id) => {
    navigate(`/admin/connect/artist/${id}/artistMusic`);
  };

  const gotoArtistAlbum = (id) => {
    navigate(`/admin/connect/artist/${id}/artistAlbum`);
  };

  return (
    <ModalWrapper role="presentation">
      <ModalContainer className="wrapper-modal">
        <Modal ref={ref}>
          <ModalClose
            onClick={() => {
              setArtistModalOpen(false);
            }}
          >
            X
          </ModalClose>
          <ModalContent>
            <ModalTitle>{selectedAritst.artistName}</ModalTitle>
            <ModalButtonRow>
              <ModalButton onClick={() => gotoArtistMusic(selectedAritst._id)}>
                음악
              </ModalButton>
              <ModalButton onClick={() => gotoArtistAlbum(selectedAritst._id)}>
                앨범
              </ModalButton>
            </ModalButtonRow>
          </ModalContent>
        </Modal>
      </ModalContainer>
    </ModalWrapper>
  );
};

const ConnectArtist = () => {
  const [artistModalOpen, setArtistModalOpen] = useState(false);
  const [artists, setArtists] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAritst, setSelectedAritst] = useState();

  const getArtists = async () => {
    const result = await fetch(
      `${import.meta.env.VITE_BACK_ADDRESS}/connect/artist`
    ).then((res) => res.json());
    setArtists(result);
  };

  useEffect(() => {
    setIsLoading(true);
    getArtists();
    setIsLoading(false);
  }, []);

  const clickModalOpen = (selectedData) => {
    setArtistModalOpen(true);
    setSelectedAritst(selectedData);
  };

  return (
    <Wrapper>
      {isLoading ? null : (
        <ListContainer>
          {artists?.map((artist) => (
            <ListItem key={artist._id} onClick={() => clickModalOpen(artist)}>
              {artist.artistName} / {artist.debutDate}
            </ListItem>
          ))}
        </ListContainer>
      )}
      {artistModalOpen && (
        <ArtistModal
          setArtistModalOpen={setArtistModalOpen}
          selectedAritst={selectedAritst}
        />
      )}
    </Wrapper>
  );
};

export default ConnectArtist;
