import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authState } from "../atom";
import { useSetRecoilState } from "recoil";
import { useState } from "react";

const LoginWrapper = styled.div`
  margin-top: 140px;
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
  gap: 100px;
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
  gap: 30px;
`;

const LoginInput = styled.input`
  font-size: 32px;
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
  font-size: 30px;
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
  const { register, handleSubmit, reset, setError } = useForm();
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
      localStorage.setItem(
        "ytMusicAuth",
        JSON.stringify({ isAuthenticated: true })
      );
      navigate("/");
    } else {
      if (result.type === "USER") {
        setLoginError("입력을 확인해주세요.");
      } else {
        setLoginError("서버 오류 입니다. 잠시후 시도");
      }
    }
  };

  return (
    <LoginWrapper>
      <LoginFormContainer>
        <LoginFormHeader>Login to WaterMelon</LoginFormHeader>
        <LoginForm onSubmit={handleSubmit(onValid)}>
          <LoginInput
            {...register("email", { required: true })}
            placeholder="Email"
            type="email"
            required
          />
          <LoginInput
            {...register("password", { required: true })}
            placeholder="Password"
            type="password"
            required
          />
          <LoginButtonContainer>
            <LoginButton>LOGIN</LoginButton>
          </LoginButtonContainer>
          <span style={{ color: "red" }}>{loginErorr}</span>
        </LoginForm>

        <LoginBottomContainer>
          <LoginBottom>
            아직 계정이 없다면 &rarr;{" "}
            <Link to="/create-account">계정 생성</Link>
          </LoginBottom>
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
