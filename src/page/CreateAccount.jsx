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
  gap: 40px;
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
  width: 80%;
  margin: 0 auto;
  gap: 22px;
`;

const CreateAccountFormRow = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const CreateAccountInput = styled.input`
  appearance: none;
  border: none;
  outline: none;
  font-family: inherit;

  width: 100%;
  background-color: #575757;
  border-radius: 15px;
  padding: 10px 15px;
  padding-left: 3rem;
  font-size: 20px;
  color: white;

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-transition: background-color 9999s ease-out;
    -webkit-box-shadow: 0 0 0px 1000px #575757 inset !important;
    -webkit-text-fill-color: white !important;
  }
`;

const CreateAccountFormIcon = styled.svg`
  position: absolute;
  width: 30px;
  left: 8.5px;
  top: 8.5px;
`;

const CreateAccountFormError = styled.span`
  color: red;
  font-size: 16px;
  position: absolute;
  bottom: -18px;
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
  font-size: 20px;
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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();
  const [accountError, setAccountError] = useState();

  const onValid = async ({ email, username, password, passwordConfirm }) => {
    if (password !== passwordConfirm) {
      setError("password", { message: "비밀번호를 확인해주세요." });
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
          <CreateAccountFormRow>
            <CreateAccountInput
              {...register("email", { required: "Email 입력하세요." })}
              type="email"
              placeholder="Email"
            />
            <CreateAccountFormIcon
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
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </CreateAccountFormIcon>
            <CreateAccountFormError>
              {errors?.email?.message}
            </CreateAccountFormError>
          </CreateAccountFormRow>
          <CreateAccountFormRow>
            <CreateAccountInput
              {...register("username", { required: "Username 입력하세요." })}
              type="text"
              placeholder="Name"
            />
            <CreateAccountFormIcon
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
                d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
              />
            </CreateAccountFormIcon>
            <CreateAccountFormError>
              {errors?.username?.message}
            </CreateAccountFormError>
          </CreateAccountFormRow>
          <CreateAccountFormRow>
            <CreateAccountInput
              {...register("password", { required: "Password 입력하세요." })}
              type="password"
              placeholder="Password"
            />
            <CreateAccountFormError>
              {errors?.password?.message}
            </CreateAccountFormError>
            <CreateAccountFormIcon
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
                d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
              />
            </CreateAccountFormIcon>
          </CreateAccountFormRow>
          <CreateAccountFormRow>
            <CreateAccountInput
              {...register("passwordConfirm", {
                required: "Password Confirm 입력하세요.",
              })}
              type="password"
              placeholder="Password Confirm"
            />
            <CreateAccountFormIcon
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
                d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
              />
            </CreateAccountFormIcon>
            <CreateAccountFormError>
              {errors?.passwordConfirm?.message}
            </CreateAccountFormError>
          </CreateAccountFormRow>
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
