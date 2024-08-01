import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 70px;
  //background-color: yellow;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-x: hidden;
  width: 100vw;
  overflow: hidden;

  scrollbar-color: #606060 #1c1c1c; /* 핸들 및 트랙 색상 */
`;

const Component = styled.div`
  width: 100%;
  background-color: blue;
`;

const ScrollContent = styled.div`
  height: 100%;
  overflow-x: hidden;
`;

const ScrollContainer = styled.div`
  width: 300px;
  height: 100px;
  overflow: hidden;
  white-space: nowrap;
  border: 1px solid #ccc;
  position: relative;

  /* &:hover ${ScrollContent} {
    overflow-x: scroll;
  } */
    ${ScrollContent} {
    overflow-x: scroll;
  }
`;

const ScrollContainer2 = styled.div`
  width: 300px;
  height: 100px;
  overflow: hidden;
  white-space: nowrap;
  border: 1px solid #ccc;
  position: relative;

  ${ScrollContent} {
    overflow-x: hidden;
  }
`;

const ScrollOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

const ScrollVerticalContainer = styled.div`
  width: 300px;
  height: 200px;
  overflow: hidden;
  position: relative;
`;

const ScrollVerticalContent = styled.div`
  height: 100%;
  overflow-y: auto;
  text-align: end;
  padding-right: 17px; /* 스크롤 바가 있는 경우의 여백 */
  box-sizing: content-box;

  /* 스크롤 바가 없는 경우에도 동일한 공간 확보 */
  &:before {
    content: "";
    display: block;
    width: 17px; /* 스크롤 바 너비만큼의 공간 */
    //height: 100%;
  }
`;

const ScrollVerticalOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 17px; /* 스크롤 바의 너비 */
  pointer-events: none;
  z-index: 1;
`;

const Test = () => {
  return (
    <Wrapper>
      <Component>
        <ScrollContainer>
          <ScrollOverlay />
          <ScrollContent>
            이 내용은 매우 길어서 가로 스크롤이 필요합니다. 이 내용은 매우
            길어서 가로 스크롤이 필요합니다.
          </ScrollContent>
        </ScrollContainer>
        <ScrollContainer>
          <ScrollContainer2>
            이 내용은 매우 길어서 가로 스크롤이 필요합니다. 이 내용은 매우
            길어서 가로 스크롤이 필요합니다.
          </ScrollContainer2>
        </ScrollContainer>
        <ScrollVerticalContainer>
          <ScrollVerticalOverlay />
          <ScrollVerticalContent>
            이 내용은 매우 길어서 세로 스크롤이 필요합니다. 스크롤이 생길 때
            화면이 밀리지 않도록 하고 싶습니다.
            <br /> 이 내용은 매우 길어서 세로 스크롤이 필요합니다.
            <br /> 이 내용은 매우 길어서 세로 스크롤이 필요합니다.
            <br /> 이 내용은 매우 길어서 세로 스크롤이 필요합니다.
            <br /> 이 내용은 매우 길어서 세로 스크롤이 필요합니다.
            <br /> 이 내용은 매우 길어서 세로 스크롤이 필요합니다.
          </ScrollVerticalContent>
        </ScrollVerticalContainer>
        <ScrollVerticalContainer>
          <ScrollVerticalOverlay />
          <ScrollVerticalContent>
            이 내용은 매우 길어서 세로 스크롤이 필요합니다. 스크롤이 생길 때
            화면이 밀리지 않도록 하고 싶습니다.
          </ScrollVerticalContent>
        </ScrollVerticalContainer>
      </Component>
    </Wrapper>
  );
};

export default Test;
