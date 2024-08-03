import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Scrollbar } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { useRef } from "react";

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

const SliderWrapper = styled.div`
  margin-top: 70px;
  margin-left: 270px;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

const SliderHeader = styled.div`
  display: flex;
`;

const SliderContent = styled.div`
  display: flex;
  width: 100%;
`;

// 전체 컨테이너
const Container = styled.div`
  width: 100%;
  max-width: 900px; /* 최대 너비를 설정하여 슬라이더 크기 조절 */
  background-color: #000;
  color: #fff;
  padding: 20px;
  margin: auto;
`;

// 슬라이더 네비게이션 버튼
const NavButton = styled.button`
  background: transparent;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  margin: 0 10px;
`;

// 노래 항목 스타일링
const SongItem = styled.div`
  display: flex;
  align-items: center;
  background-color: #1c1c1c;
  padding: 10px;
  border-radius: 8px;
`;

const AlbumCover = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 15px;
  object-fit: cover;
  border-radius: 8px;
`;

const SongInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const SongTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const ArtistName = styled.div`
  font-size: 12px;
  color: #aaa;
`;

const Test = () => {
  const swiperRef = useRef(null);

  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };
  return (
    // <Wrapper>
    //   <Component>
    //     {/* <ScrollContainer>
    //       <ScrollOverlay />
    //       <ScrollContent>
    //         이 내용은 매우 길어서 가로 스크롤이 필요합니다. 이 내용은 매우
    //         길어서 가로 스크롤이 필요합니다.
    //       </ScrollContent>
    //     </ScrollContainer>
    //     <ScrollContainer>
    //       <ScrollContainer2>
    //         이 내용은 매우 길어서 가로 스크롤이 필요합니다. 이 내용은 매우
    //         길어서 가로 스크롤이 필요합니다.
    //       </ScrollContainer2>
    //     </ScrollContainer>
    //     <ScrollVerticalContainer>
    //       <ScrollVerticalOverlay />
    //       <ScrollVerticalContent>
    //         이 내용은 매우 길어서 세로 스크롤이 필요합니다. 스크롤이 생길 때
    //         화면이 밀리지 않도록 하고 싶습니다.
    //         <br /> 이 내용은 매우 길어서 세로 스크롤이 필요합니다.
    //         <br /> 이 내용은 매우 길어서 세로 스크롤이 필요합니다.
    //         <br /> 이 내용은 매우 길어서 세로 스크롤이 필요합니다.
    //         <br /> 이 내용은 매우 길어서 세로 스크롤이 필요합니다.
    //         <br /> 이 내용은 매우 길어서 세로 스크롤이 필요합니다.
    //       </ScrollVerticalContent>
    //     </ScrollVerticalContainer>
    //     <ScrollVerticalContainer>
    //       <ScrollVerticalOverlay />
    //       <ScrollVerticalContent>
    //         이 내용은 매우 길어서 세로 스크롤이 필요합니다. 스크롤이 생길 때
    //         화면이 밀리지 않도록 하고 싶습니다.
    //       </ScrollVerticalContent>
    //     </ScrollVerticalContainer> */}

    //   </Component>
    // </Wrapper>
    <Container>
      <div style={{ display: "flex", alignItems: "center" }}>
        <NavButton onClick={goPrev}>{"<"}</NavButton>
        <Swiper
          ref={swiperRef}
          modules={[Grid, Scrollbar]}
          grid={{
            rows: 4, // 4행 구성
            fill: "row", // 열을 기준으로 그리드 채우기
          }}
          slidesPerView={3} // 한 번에 3개의 슬라이드 보이게 설정
          spaceBetween={10} // 슬라이드 간의 간격 설정
          // style={{ width: "600px" }} // 보이는 영역의 너비를 설정하여 3열이 보이도록 조절
          allowTouchMove={false}
          scrollbar={{ draggable: true }}
        >
          {[...Array(20)].map((_, index) => (
            <SwiperSlide key={index}>
              <SongItem>
                {/* <AlbumCover
                  src={`https://via.placeholder.com/50?text=${index + 1}`}
                  alt={`Album ${index + 1}`}
                />
                <SongInfo>
                  <SongTitle>곡 제목 {index + 1}</SongTitle>
                  <ArtistName>아티스트 {index + 1}</ArtistName>
                </SongInfo> */}
              </SongItem>
            </SwiperSlide>
          ))}
        </Swiper>
        <NavButton onClick={goNext}>{">"}</NavButton>
      </div>
    </Container>
  );
};

export default Test;
