import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;
`;

const redirectPath = "/library";

const ProtectedRoute = ({ children }) => {
  const isLogin = localStorage.getItem("userData") ? true : false;
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === redirectPath && !isLogin) navigate("/login");
  }, []);

  return <Wrapper>{children}</Wrapper>;
};

export default ProtectedRoute;
