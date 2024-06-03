import { useRef } from "react";
import styled from "styled-components";
import useOnClickOutSide from "../hooks/useOnClickOutSide";

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
  //animation: fadeIn 400ms;

  width: 600px;
  height: 400px;

  border: 1px solid blue;

  &::-webkit-scrollbar {
    display: none;
    visibility: hidden;
  }
`;

const ModalContent = styled.div`
  padding: 40px;
  width: 100%;
  color: white;
  //background-color: yellow;
`;

const CreateForm = styled.form`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  gap: 50px;

  //background-color: green;
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

const CreateFormSelect = styled.select``;

const CreateFormBottom = styled.div`
  display: flex;
  justify-content: end;
  gap: 10px;
`;

const CreateFormBottomButton = styled.div`
  background-color: red;
  padding: 10px 15px;
  border-radius: 15px;

  cursor: pointer;
`;

const CreatePlaylistForm = ({ setCreatePlaylist }) => {
  const ref = useRef();

  useOnClickOutSide(ref, () => {
    setCreatePlaylist(false);
  });

  return (
    <Wrapper role="presentation">
      <WrapperModal className="wrapper-modal">
        <Modal ref={ref}>
          <ModalContent>
            <CreateForm>
              <CreateFormTitle>새 재생목록</CreateFormTitle>
              <CreateFormContent>
                <CreateFormRow>
                  <CreateFormInput placeholder="제목" />
                </CreateFormRow>
                <CreateFormRow>
                  <CreateFormInput placeholder="설명" />
                </CreateFormRow>
                <CreateFormRow>
                  <CreateFormSelect />
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
