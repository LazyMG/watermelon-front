import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CreateAccountWrapper = styled.div`
  margin-top: 140px;
  //background-color: blue;
  display: flex;
  flex-direction: column;
  gap: 50px;
  //overflow-x: hidden;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const CreateAccountFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
  width: 50%;

  //background-color: green;
`;

const CreateAccountFormHeader = styled.div`
  font-size: 60px;
  font-weight: bold;
  display: flex;
  justify-content: center;
`;

const CreateAccountForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const CreateAccountInput = styled.input`
  font-size: 32px;
`;

const CreateAccountButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const CreateAccountButton = styled.button`
  background: inherit;
  border: none;
  box-shadow: none;
  border-radius: 0;
  padding: 0;
  overflow: visible;
  padding: 10px 20px;
  background-color: #1d1d1d;
  font-size: 30px;
  border-radius: 20px;
  color: white;

  cursor: pointer;

  &:hover {
    background-color: #3d3d3d;
  }
`;

const CreateAccountBottomContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CreateAccountBottom = styled.div`
  font-size: 17px;
  display: flex;
  align-items: center;
  gap: 15px;

  a {
    font-weight: bold;
    font-size: 20px;
  }
`;

const CreateAccount = () => {
  const { register, handleSubmit } = useForm();

  const onValid = (data) => {
    console.log(data);
  };

  return (
    <CreateAccountWrapper>
      <CreateAccountFormContainer>
        <CreateAccountFormHeader>Create Account</CreateAccountFormHeader>
        <CreateAccountForm onSubmit={handleSubmit(onValid)}>
          <CreateAccountInput
            {...register("email")}
            type="email"
            placeholder="Email"
          />
          <CreateAccountInput
            {...register("name")}
            type="text"
            placeholder="Name"
          />
          <CreateAccountInput
            {...register("password")}
            type="password"
            placeholder="Password"
          />
          <CreateAccountInput
            {...register("passwordConfirm")}
            type="password"
            placeholder="Password Confirm"
          />
          <CreateAccountButtonContainer>
            <CreateAccountButton>CREATE</CreateAccountButton>
          </CreateAccountButtonContainer>
        </CreateAccountForm>

        <CreateAccountBottomContainer>
          <CreateAccountBottom>
            이미 계정이 있다면 &rarr; <Link to="/login">로그인</Link>
          </CreateAccountBottom>
        </CreateAccountBottomContainer>
      </CreateAccountFormContainer>
    </CreateAccountWrapper>
  );
};

export default CreateAccount;
