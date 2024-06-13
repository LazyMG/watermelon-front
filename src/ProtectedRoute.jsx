import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;
`;

const ProtectedRoute = () => {
  const isLogin = localStorage.getItem("ytMusicAuth") ? true : false;

  return (
    <Wrapper>
      <Outlet isLogin={isLogin} />
    </Wrapper>
  );
};

export default ProtectedRoute;
