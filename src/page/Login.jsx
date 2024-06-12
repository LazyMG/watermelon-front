import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authState } from "../atom";
import { useSetRecoilState } from "recoil";

const LoginWrapper = styled.div`
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

const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
  width: 50%;

  //background-color: green;
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

const googleId =
  "160948580580-q23l6mhjes0pqcto03d45quvmfr8sj9l.apps.googleusercontent.com";
const googleRedirectionUrl = "http://localhost:5173/google-login";
const url = `https://accounts.google.com/o/oauth2/auth?client_id=${googleId}&redirect_uri=${googleRedirectionUrl}&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authState);

  const onValid = async ({ email, password }) => {
    //유효성 검사
    //백엔드로 로그인 정보 전달
    const result = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    }).then((response) => {
      const statusCode = response.status;
      if (statusCode === 200) {
        console.log("완료되었습니다.");
      } else {
        reset();
        //에러 세팅
      }
      return response.json();
    });
    console.log(result);
    if (result.ok) {
      console.log(result?.token);
      setAuth({
        isAuthenticated: true,
        user: result.userId,
        loading: false,
      });
      localStorage.setItem("userData", JSON.stringify(result.user));
      navigate("/");
    }
  };

  return (
    <LoginWrapper>
      <LoginFormContainer>
        <LoginFormHeader>Login to WaterMelon</LoginFormHeader>
        <LoginForm onSubmit={handleSubmit(onValid)}>
          <LoginInput {...register("email")} placeholder="Email" type="email" />
          <LoginInput
            {...register("password")}
            placeholder="Password"
            type="password"
          />
          <LoginButtonContainer>
            <LoginButton>LOGIN</LoginButton>
          </LoginButtonContainer>
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
