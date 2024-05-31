import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 70px;
  background-color: yellow;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-x: hidden;
  width: 100%;
`;

const Component = styled.div`
  width: 100%;
  height: 600px;
  background-color: blue;
`;

const Test = () => {
  return (
    <Wrapper>
      <Component />
      <Component />
      <Component />
    </Wrapper>
  );
};

export default Test;
