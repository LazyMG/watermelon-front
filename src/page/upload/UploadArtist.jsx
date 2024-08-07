import { useForm } from "react-hook-form";
import styled from "styled-components";

const UploadWrapper = styled.div`
  width: 100%;
  height: 100vh;
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
`;

const UploadForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const UploadInputContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
  font-size: 20px;
`;

const UploadInputLabel = styled.label``;

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

const UploadArtist = () => {
  const { register, handleSubmit, reset } = useForm();

  const onValid = (data) => {
    fetch(`${import.meta.env.VITE_BACK_ADDRESS}/upload/artist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        const statusCode = response.status;
        if (statusCode === 200) reset();
        else alert("failed!");
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <UploadWrapper>
      <UploadFormContainer>
        <UploadForm onSubmit={handleSubmit(onValid)}>
          <UploadInputContainer>
            <UploadInputLabel htmlFor="artistName">가수 이름:</UploadInputLabel>
            <UploadInput
              id="artistName"
              {...register("artistName")}
              placeholder="가수"
            />
          </UploadInputContainer>
          <UploadInputContainer>
            <UploadInputLabel htmlFor="debutDate">데뷔일:</UploadInputLabel>
            <UploadInput
              id="debutDate"
              {...register("debutDate")}
              placeholder="데뷔일"
            />
          </UploadInputContainer>
          <UploadInputContainer>
            <UploadInputLabel htmlFor="imgUrl">이미지 주소:</UploadInputLabel>
            <UploadInput
              id="imgUrl"
              {...register("imgUrl")}
              placeholder="이미지 주소"
            />
          </UploadInputContainer>
          <UploadFormBottom>
            <UploadFormButton>업로드</UploadFormButton>
          </UploadFormBottom>
        </UploadForm>
      </UploadFormContainer>
    </UploadWrapper>
  );
};

export default UploadArtist;
