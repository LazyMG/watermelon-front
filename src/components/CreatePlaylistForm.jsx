import { useRef } from "react";
import styled from "styled-components";
import useOnClickOutSide from "../hooks/useOnClickOutSide";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState, userPlaylistsState } from "../atom";

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
  overflow: hidden;
  border-radius: 8px;
  transition: all 400ms ease-in-out 2s;

  width: 600px;
  height: 400px;

  border: 1px solid #414141;

  &::-webkit-scrollbar {
    display: none;
    visibility: hidden;
  }
`;

const ModalContent = styled.div`
  padding: 40px;
  width: 100%;
  color: white;
`;

const CreateForm = styled.form`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  gap: 50px;
`;

const CreateFormTitle = styled.div`
  font-size: 22px;
  font-weight: bold;
`;

const CreateFormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const CreateFormRow = styled.div``;

const CreateFormInput = styled.input`
  width: 100%;
  font-size: 25px;
`;

const CreateFormBottom = styled.div`
  display: flex;
  justify-content: end;
  gap: 10px;
`;

const CreateFormBottomButton = styled.button`
  background-color: white;
  color: black;
  padding: 10px 15px;
  border-radius: 15px;

  cursor: pointer;
`;

const CreatePlaylistForm = ({ setCreatePlaylist }) => {
  const ref = useRef();
  const { register, handleSubmit } = useForm();
  const auth = useRecoilValue(authState);
  const setUserPlaylists = useSetRecoilState(userPlaylistsState);

  useOnClickOutSide(ref, (event) => {
    setCreatePlaylist(false);
    event.stopPropagation(); // 이벤트 전파 중단
  });

  const onValid = async (data) => {
    const postData = data;
    const userId = auth.user?.userId;
    if (!userId) return;
    const result = await fetch(
      `${import.meta.env.VITE_BACK_ADDRESS}/user/${userId}/create-playlist`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      }
    )
      .then((response) => {
        const statusCode = response.status;
        if (statusCode === 200) {
          return response.json();
        } else alert("failed!");
      })
      .catch((error) => console.error("Error:", error));
    setUserPlaylists((prev) => [
      ...prev,
      {
        title: data.title,
        owner: { username: auth.user?.username },
        list: [],
        _id: result.id,
      },
    ]);
    setCreatePlaylist(false);
  };

  return (
    <Wrapper role="presentation">
      <WrapperModal className="wrapper-modal">
        <Modal ref={ref}>
          <ModalContent>
            <CreateForm onSubmit={handleSubmit(onValid)}>
              <CreateFormTitle>새 재생목록</CreateFormTitle>
              <CreateFormContent>
                <CreateFormRow>
                  <CreateFormInput
                    {...register("title")}
                    placeholder="제목"
                    required
                  />
                </CreateFormRow>
                <CreateFormRow>
                  <CreateFormInput
                    {...register("overview")}
                    placeholder="설명"
                    required
                  />
                </CreateFormRow>
              </CreateFormContent>

              <CreateFormBottom>
                <CreateFormBottomButton
                  onClick={() => setCreatePlaylist(false)}
                >
                  취소
                </CreateFormBottomButton>
                <CreateFormBottomButton>만들기</CreateFormBottomButton>
              </CreateFormBottom>
            </CreateForm>
          </ModalContent>
        </Modal>
      </WrapperModal>
    </Wrapper>
  );
};

export default CreatePlaylistForm;
