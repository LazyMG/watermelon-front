import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const CreateAccountWrapper = styled.div`
  margin-top: 140px;
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
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [accountError, setAccountError] = useState();

  const onValid = async ({ email, username, password, passwordConfirm }) => {
    if (password !== passwordConfirm) {
      setAccountError("비밀번호를 확인해주세요.");
      return;
    }

    const result = await fetch(
      `${import.meta.env.VITE_BACK_ADDRESS}/create-account`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password, passwordConfirm }),
      }
    ).then((response) => {
      return response.json();
    });
    if (result.ok) {
      navigate("/login");
    } else {
      if (result.type === "USER") {
        setAccountError("입력을 확인해주세요.");
      } else if (result.type === "EMAIL") {
        setAccountError("이미 존재하는 이메일입니다.");
      } else if (result.type === "DB") {
        setAccountError("서버 오류입니다. 잠시후 시도");
      }
    }
  };

  return (
    <CreateAccountWrapper>
      <CreateAccountFormContainer>
        <CreateAccountFormHeader>Create Account</CreateAccountFormHeader>
        <CreateAccountForm onSubmit={handleSubmit(onValid)}>
          <CreateAccountInput
            {...register("email", { required: true })}
            type="email"
            placeholder="Email"
          />
          <CreateAccountInput
            {...register("username", { required: true })}
            type="text"
            placeholder="Name"
          />
          <CreateAccountInput
            {...register("password", { required: true })}
            type="password"
            placeholder="Password"
          />
          <CreateAccountInput
            {...register("passwordConfirm", { required: true })}
            type="password"
            placeholder="Password Confirm"
          />
          <CreateAccountButtonContainer>
            <CreateAccountButton>CREATE</CreateAccountButton>
          </CreateAccountButtonContainer>
          <span style={{ color: "red" }}>{accountError}</span>
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
