import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authState } from "../atom";
import { useSetRecoilState } from "recoil";
import { useState } from "react";

const LoginWrapper = styled.div`
  margin-top: 180px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  //overflow-x: hidden;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 50%;
`;

const LoginFormHeader = styled.div`
  font-size: 60px;
  font-weight: bold;
  display: flex;
  justify-content: center;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  gap: 22px;
`;

const LoginFormRow = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const LoginInput = styled.input`
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

const LoginFormIcon = styled.svg`
  position: absolute;
  width: 30px;
  left: 8.5px;
  top: 8.5px;
`;

const LoginFormError = styled.span`
  color: red;
  font-size: 16px;
  position: absolute;
  bottom: -18px;
`;

const LoginButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const LoginButton = styled.button`
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

const LoginBottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 15px;
`;

const LoginBottom = styled.div`
  font-size: 17px;
  display: flex;
  align-items: center;
  gap: 15px;

  a {
    font-weight: bold;
    font-size: 20px;
  }

  span {
    font-weight: bold;
    font-size: 20px;
    cursor: pointer;
  }
`;

const url = `https://accounts.google.com/o/oauth2/auth?client_id=${
  import.meta.env.VITE_GOOGLE_ID
}&redirect_uri=${
  import.meta.env.VITE_REDIRECT_URL
}&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authState);
  const [loginErorr, setLoginError] = useState("");

  const onValid = async ({ email, password }) => {
    //유효성 검사

    //백엔드로 로그인 정보 전달
    const result = await fetch(`${import.meta.env.VITE_BACK_ADDRESS}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    }).then((response) => {
      //에러 말고 필요할까?
      const statusCode = response.status;
      if (statusCode === 200) {
        //console.log("완료되었습니다.");
      } else {
        reset();
        //에러 세팅
      }
      return response.json();
    });
    if (result.ok) {
      setAuth({
        isAuthenticated: true,
        user: result.user,
        loading: false,
      });
      //session이 좋지 않을까?
      localStorage.setItem(
        "ytMusicAuth",
        JSON.stringify({ isAuthenticated: true })
      );
      navigate("/");
    } else {
      if (result.type === "USER") {
        setLoginError("입력을 확인해주세요.");
      } else {
        setLoginError("서버 오류 입니다. 잠시 후 시도");
      }
    }
  };

  return (
    <LoginWrapper>
      <LoginFormContainer>
        <LoginFormHeader>Login to WaterMelon</LoginFormHeader>
        <LoginForm onSubmit={handleSubmit(onValid)}>
          <LoginFormRow>
            <LoginInput
              {...register("email", { required: "Email 입력해주세요." })}
              placeholder="Email"
              type="email"
            />
            <LoginFormIcon
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
            </LoginFormIcon>
          </LoginFormRow>
          <LoginFormRow>
            <LoginInput
              {...register("password", { required: "Password 입력해주세요." })}
              placeholder="Password"
              type="password"
            />
            <LoginFormIcon
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
            </LoginFormIcon>
            <LoginFormError>
              {errors?.email?.message ||
                errors?.password?.message ||
                loginErorr}
            </LoginFormError>
          </LoginFormRow>

          <LoginButtonContainer>
            <LoginButton>LOGIN</LoginButton>
          </LoginButtonContainer>
        </LoginForm>
        <LoginBottomContainer>
          <LoginBottom>
            아직 계정이 없다면 &rarr;{" "}
            <Link to="/create-account">계정 생성</Link>
          </LoginBottom>
          {/*구글 아이콘 넣어서 꾸미기*/}
          <LoginBottom>
            구글 계정으로 로그인 &rarr;{" "}
            <span onClick={() => (window.location.href = url)}>
              구글 로그인
            </span>
          </LoginBottom>
        </LoginBottomContainer>
      </LoginFormContainer>
    </LoginWrapper>
  );
};

export default Login;
