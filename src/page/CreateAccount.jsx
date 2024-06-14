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
  const { register, handleSubmit, reset, setError } = useForm();
  const navigate = useNavigate();

  const onValid = async ({ email, username, password, passwordConfirm }) => {
    if (password !== passwordConfirm)
      return setError("password", { message: "비밀번호를 확인해주세요." });

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
      const statusCode = response.status;
      if (statusCode === 200) {
        //console.log("완료되었습니다.");
      } else {
        reset();
      }
      return response.json();
    });
    if (result.ok) {
      navigate("/login");
    }
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
            {...register("username")}
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
