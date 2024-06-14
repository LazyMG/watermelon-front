import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useOnClickOutSide from "../hooks/useOnClickOutSide";
import CreatePlaylistForm from "./CreatePlaylistForm";
import { useRecoilValue } from "recoil";
import { authState } from "../atom";

const Wrapper = styled.div`
  z-index: 1200;
  position: absolute;
`;

const WrapperModal = styled.div`
  position: fixed;
  inset: 0px;
  background-color: rgb(0 0 0 /71%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;

const Modal = styled.div`
  position: relative;
  max-width: 800px;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12);
  background: #111;
  //overflow: hidden;
  //overflow-y: auto;
  border-radius: 8px;

  width: 400px;
  height: 700px;

  border: 1px solid #414141;
  display: flex;
  flex-direction: column;
`;

const ModalContent = styled.div`
  flex: 1;
  padding: 20px;
  width: 100%;
  height: calc(100% - 40px);
  color: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow: hidden;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.div`
  font-size: 22px;
  font-weight: bold;
`;

const ModalCloseButton = styled.div`
  font-size: 20px;
  cursor: pointer;
`;

const ModalPlaylistContainer = styled.div`
  flex: 1;
  width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  gap: 10px;
`;

const ModalPlaylistHeader = styled.div``;

const ModalPlaylistItem = styled.div`
  width: 100%;
  //min-height: 100px;
  display: flex;
  align-items: center;
  gap: 20px;

  border-radius: 10px;

  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const ModalPlaylistImg = styled.div`
  svg {
    width: 45px;
    padding: 15px;
    box-sizing: content-box;
  }
`;

const ModalPlaylistInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ModalPlaylistTitle = styled.div`
  font-weight: bold;
  font-size: 17px;
`;

const ModalPlaylistLength = styled.div`
  font-size: 17px;
`;

const CreateFormBottomButton = styled.div`
  position: absolute;
  background-color: white;
  color: black;
  padding: 10px 15px;
  border-radius: 15px;
  right: 10px;
  bottom: 10px;
  cursor: pointer;
`;

const AddMusicPlaylistForm = ({ setAddModalOpen, isLogin, music }) => {
  const ref = useRef();
  const [playlists, setPlaylists] = useState([]);
  const [createPlaylist, setCreatePlaylist] = useState(false);
  const auth = useRecoilValue(authState);

  // useOnClickOutSide(ref, () => {
  //   setAddModalOpen(false);
  // });

  useOnClickOutSide(ref, (event) => {
    if (!createPlaylist) {
      setAddModalOpen(false);
    } else {
      event.stopPropagation(); // 이벤트 전파 중단
    }
  });

  const getUserPlaylist = useCallback(async () => {
    if (!isLogin) return;
    const userId = auth.user?.userId;
    if (!userId) return;
    const result = await fetch(
      `${import.meta.env.VITE_BACK_ADDRESS}/user/${userId}/playlist`
    ).then((res) => res.json());
    if (result?.playlists) {
      setPlaylists(result.playlists);
    }
  }, [auth, isLogin]);

  useEffect(() => {
    getUserPlaylist();
  }, [getUserPlaylist]);

  const clickAddMusicPlaylist = async (playlistId) => {
    const result = await fetch(
      `${import.meta.env.VITE_BACK_ADDRESS}/playlist/${playlistId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ musicId: music._id }),
      }
    )
      .then((response) => {
        const statusCode = response.status;
        if (statusCode === 200) {
          alert("완료되었습니다.");
          setAddModalOpen(false);
          return response.json();
        } else alert("falied!");
      })
      .catch((error) => console.error("Error:", error));
  };

  const createNewPlaylist = () => {
    if (!isLogin) {
      alert("로그인 필요");
      return;
    }
    setCreatePlaylist(true);
  };

  return (
    <Wrapper role="presentation">
      <WrapperModal>
        <Modal ref={ref}>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>재생목록에 저장</ModalTitle>
              <ModalCloseButton onClick={() => setAddModalOpen(false)}>
                X
              </ModalCloseButton>
            </ModalHeader>
            <ModalPlaylistContainer>
              <ModalPlaylistHeader>모든 재생목록</ModalPlaylistHeader>
              {playlists?.map((playlist) => (
                <ModalPlaylistItem
                  onClick={() => clickAddMusicPlaylist(playlist._id)}
                  key={playlist._id}
                >
                  <ModalPlaylistImg>
                    <svg
                      fill="none"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                      />
                    </svg>
                  </ModalPlaylistImg>
                  <ModalPlaylistInfo>
                    <ModalPlaylistTitle>{playlist.title}</ModalPlaylistTitle>
                    <ModalPlaylistLength>
                      트랙 {playlist.list.length} 개
                    </ModalPlaylistLength>
                  </ModalPlaylistInfo>
                </ModalPlaylistItem>
              ))}
            </ModalPlaylistContainer>
            <CreateFormBottomButton onClick={createNewPlaylist}>
              만들기
            </CreateFormBottomButton>
          </ModalContent>
        </Modal>
      </WrapperModal>
      {createPlaylist && (
        <CreatePlaylistForm
          isLogin={isLogin}
          setCreatePlaylist={setCreatePlaylist}
          setPlaylists={setPlaylists}
        />
      )}
    </Wrapper>
  );
};

export default AddMusicPlaylistForm;
