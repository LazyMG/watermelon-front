import { useForm } from "react-hook-form";
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

const Upload = ({ children }) => {
  const { register, handleSubmit } = useForm();

  const onValid = (data) => {
    console.log(data);
  };
  return (
    <UploadWrapper>
      <UploadFormContainer>{children}</UploadFormContainer>
    </UploadWrapper>
  );
};

export default Upload;
