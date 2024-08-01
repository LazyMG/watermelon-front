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

const SmallMusicsContent = styled.div`
  width: calc(400px * 3 + 15px * 2);
  margin: 20px 0;

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 15px;
  grid-template-rows: repeat(4, 1fr);
  row-gap: 15px;
  overflow-x: hidden;

  background-color: aqua;
`;

const SmallMusicsContainer = styled.div`
  width: 100%;
  height: 285px;
  overflow: hidden;
  background-color: orange;

  position: relative;

  &:hover ${SmallMusicsContent} {
    overflow-x: overlay;
  }
`;

const SmallMusicsContentScroll = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

const SmallMusic = styled.div`
  width: 400px;
  height: 50px;
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: yellow;
`;

const BigMusicsContainer = styled.div`
  width: 100%;
  background-color: orange;
`;

const BigMusicsContent = styled.div`
  width: calc(190px * 6 + 20px * 5);
  margin: 20px 0;
  height: 280px;

  display: grid;
  grid-template-columns: repeat(20, 1fr);
  column-gap: 20px;

  overflow-x: hidden;

  position: relative;

  background-color: aqua;

  &:hover {
    overflow-x: overlay;
  }
`;

const BigMusicsContentScroll = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* 마우스 이벤트를 무시하여 컨텐츠와 상호작용 가능하도록 합니다 */
  z-index: 1; /* 컨텐츠 위에 오도록 z-index를 설정합니다 */
`;

const BigMusic = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 100px;
  width: 100px;
  background-color: yellow;
`;

const ScrollContent = styled.div`
  height: 100%;
  overflow-x: hidden;
`;

const ScrollContainer = styled.div`
  width: 100%;
  height: 100px;
  overflow: hidden;
  white-space: nowrap;
  border: 1px solid #ccc;
  position: relative;

  &:hover ${ScrollContent} {
    overflow-x: scroll;
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

// 전체 그리드 컨테이너를 감싸는 스타일
const GridWrapper = styled.div`
  overflow-x: auto; /* 가로 스크롤 활성화 */
  overflow-y: hidden; /* 세로 스크롤 비활성화 */
  width: 100%; /* 화면 전체 너비를 사용 */
  padding: 10px 0; /* 상하 패딩 설정 */
  box-sizing: border-box; /* 패딩을 포함하여 전체 너비를 설정 */
`;

// 그리드 컨테이너 스타일
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(
    5,
    minmax(calc((100vw - 40px) / 5), 1fr)
  ); /* 5열로 설정, 유동적인 열 설정 */
  grid-template-rows: repeat(4, minmax(150px, auto)); /* 4행으로 설정 */
  gap: 10px;
  //width: fit-content; /* 컨테이너 너비를 아이템 너비에 맞게 설정 */
  width: 100px;
  box-sizing: border-box; /* 패딩을 포함하여 전체 너비를 설정 */
`;

// 개별 그리드 아이템 스타일
const GridItem = styled.div`
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: calc((100vw - 40px) / 5); /* 최소 너비를 화면 너비에 맞게 설정 */
  height: 150px; /* 아이템의 높이 설정 */
`;

const Test = () => {
  return (
    <Wrapper>
      <Component>
        {/* <ScrollContainer>
          <ScrollOverlay />
          <ScrollContent>
            이 내용은 매우 길어서 가로 스크롤이 필요합니다. 이 내용은 매우
            길어서 가로 스크롤이 필요합니다.
          </ScrollContent>
        </ScrollContainer> */}
        <GridWrapper>
          <GridContainer>
            {Array.from({ length: 20 }).map((_, index) => (
              <GridItem key={index}>aaaaaaa</GridItem>
            ))}
          </GridContainer>
        </GridWrapper>
      </Component>
    </Wrapper>
  );
};

export default Test;
