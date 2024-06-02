import styled from "styled-components";

const UploadWrapper = styled.div`
  width: 100%;
  height: 100vh;
  //background-color: blue;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UploadFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  width: 70%;
  //background-color: green;
`;

const UploadForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const UploadInputContainer = styled.div`
  display: flex;
  gap: 20px;
  //background-color: red;
  justify-content: space-between;
  font-size: 20px;
`;

const UploadInputLabel = styled.div``;

const UploadInput = styled.input`
  font-size: 20px;
`;

const UploadFormBottom = styled.div`
  display: flex;
  justify-content: end;
`;

const UploadFormButton = styled.button`
  background: inherit;
  border: none;
  box-shadow: none;
  border-radius: 0;
  padding: 0;
  overflow: visible;
  padding: 10px 20px;
  background-color: #1d1d1d;
  font-size: 20px;
  border-radius: 20px;
  color: white;

  cursor: pointer;

  &:hover {
    background-color: #3d3d3d;
  }
`;

const Upload = () => {
  return (
    <UploadWrapper>
      <UploadFormContainer>
        <UploadForm>
          <UploadInputContainer>
            <UploadInputLabel>노래 제목:</UploadInputLabel>
            <UploadInput />
          </UploadInputContainer>
          <UploadInputContainer>
            <UploadInputLabel>가수 이름:</UploadInputLabel>
            <UploadInput />
          </UploadInputContainer>
          <UploadInputContainer>
            <UploadInputLabel>앨범 이름:</UploadInputLabel>
            <UploadInput />
          </UploadInputContainer>
          <UploadInputContainer>
            <UploadInputLabel>이미지 주소:</UploadInputLabel>
            <UploadInput />
          </UploadInputContainer>
          <UploadFormBottom>
            <UploadFormButton>업로드</UploadFormButton>
          </UploadFormBottom>
        </UploadForm>
      </UploadFormContainer>
    </UploadWrapper>
  );
};

export default Upload;
