import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;
`;

const ProtectedRoute = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default ProtectedRoute;
