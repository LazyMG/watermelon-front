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

const UploadAlbum = () => {
  const { register, handleSubmit, reset } = useForm();

  //유효성 검사 필요
  const onValid = (data) => {
    //console.log(data);

    fetch(`${import.meta.env.VITE_BACK_ADDRESS}/upload/album`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        const statusCode = response.status;
        //성공하면 메세지
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
            <UploadInputLabel htmlFor="title">앨범명:</UploadInputLabel>
            <UploadInput
              id="title"
              {...register("title", {
                required: true,
              })}
              placeholder="앨범명"
            />
          </UploadInputContainer>
          <UploadInputContainer>
            <UploadInputLabel htmlFor="coverImg">이미지 주소:</UploadInputLabel>
            <UploadInput
              id="coverImg"
              {...register("coverImg", {
                required: true,
              })}
              placeholder="이미지 주소"
            />
          </UploadInputContainer>
          <UploadInputContainer>
            <UploadInputLabel htmlFor="releasedDate">발매일:</UploadInputLabel>
            <UploadInput
              id="releasedDate"
              {...register("releasedDate", {
                required: true,
              })}
              placeholder="발매일"
            />
          </UploadInputContainer>
          <UploadInputContainer>
            <UploadInputLabel htmlFor="duration">길이:</UploadInputLabel>
            <UploadInput
              id="duration"
              {...register("duration", {
                required: true,
              })}
              placeholder="길이"
            />
          </UploadInputContainer>
          <UploadInputContainer>
            <UploadInputLabel htmlFor="overview">설명:</UploadInputLabel>
            <UploadInput
              id="overview"
              {...register("overview")}
              placeholder="설명"
            />
          </UploadInputContainer>
          <UploadInputContainer>
            <UploadInputLabel htmlFor="category">종류:</UploadInputLabel>
            <UploadInput
              id="category"
              {...register("category", {
                required: true,
              })}
              placeholder="종류"
            />
          </UploadInputContainer>
          <UploadInputContainer>
            <UploadInputLabel htmlFor="totalMusic">곡 수:</UploadInputLabel>
            <UploadInput
              id="totalMusic"
              type="number"
              {...register("totalMusic", {
                required: true,
              })}
              placeholder="곡 수"
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

export default UploadAlbum;
