import { useForm } from "react-hook-form";
import styled from "styled-components";

const UploadWrapper = styled.div`
  width: 100%;
  height: 100%;
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

const UploadMusic = () => {
  const { register, handleSubmit, reset } = useForm();

  const onValid = (data) => {
    fetch(`${import.meta.env.VITE_BACK_ADDRESS}/upload/music`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        const statusCode = response.status;
        if (statusCode === 200) reset();
        else alert("falied!");
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <UploadWrapper>
      <UploadFormContainer>
        <UploadForm onSubmit={handleSubmit(onValid)}>
          <UploadInputContainer>
            <UploadInputLabel htmlFor="title">노래 제목:</UploadInputLabel>
            <UploadInput
              id="title"
              {...register("title")}
              placeholder="제목"
              required
            />
          </UploadInputContainer>
          <UploadInputContainer>
            <UploadInputLabel htmlFor="coverImg">이미지 주소:</UploadInputLabel>
            <UploadInput
              id="coverImg"
              {...register("coverImg")}
              placeholder="이미지 주소"
              required
            />
          </UploadInputContainer>
          <UploadInputContainer>
            <UploadInputLabel htmlFor="ytId" required>
              음악 ID:
            </UploadInputLabel>
            <UploadInput id="ytId" {...register("ytId")} placeholder="ID" />
          </UploadInputContainer>
          <UploadInputContainer>
            <UploadInputLabel htmlFor="genre" required>
              장르:
            </UploadInputLabel>
            <UploadInput id="genre" {...register("genre")} placeholder="장르" />
          </UploadInputContainer>
          <UploadInputContainer>
            <UploadInputLabel htmlFor="duration" required>
              길이:
            </UploadInputLabel>
            <UploadInput
              id="duration"
              {...register("duration")}
              placeholder="길이"
              required
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

export default UploadMusic;
