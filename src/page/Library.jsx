import styled from "styled-components";

const LibraryWrapper = styled.div`
  margin-top: 50px;
  //background-color: yellow;
  display: flex;
  flex-direction: column;
  gap: 50px;
  //overflow-x: hidden;
  width: 100%;
`;

const LibraryCategoryContainer = styled.div`
  display: flex;
  gap: 30px;
  width: calc(100% - 20px);
  //background-color: blue;
  margin: 0 10px;
  //padding: 20px 0;
  border-bottom: 1px solid #c9c9c91b;
`;

const LibraryCategoryItem = styled.div`
  padding: 20px 0;
  border-bottom: 2px solid #fff;
  //height: 50px;

  cursor: pointer;
`;

const LibraryNavContainer = styled.div`
  display: flex;
  width: calc(100% - 20px);
  justify-content: space-between;
  align-items: center;
`;

const LibraryNavItemContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-left: 10px;
`;

const LibraryNavItem = styled.div`
  padding: 10px;
  background-color: #1d1d1d;
  border-radius: 10px;
  font-size: 14px;

  cursor: pointer;

  &:hover {
    background-color: #3d3d3d;
  }
`;

const LibraryNavOption = styled.select``;

const LibraryContentContainer = styled.div`
  width: 100%;
  /* height: 600px; */
  //background-color: blue;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 20px;
`;

const LibraryContentItem = styled.div`
  //background-color: green;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const LibraryContentItemImg = styled.div`
  border-radius: 5px;
  height: 145px;
  background: url("https://i.scdn.co/image/ab67616d00001e028bcb1a80720292aaffb35989");
  background-size: contain;
  background-repeat: no-repeat;
  //flex-shrink: 0;

  cursor: pointer;
`;

const LibraryContentItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const LibraryContentItemTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const LibraryContentItemOverview = styled.div`
  font-size: 14px;
`;

const Library = () => {
  return (
    <LibraryWrapper>
      <LibraryCategoryContainer>
        <LibraryCategoryItem>보관함</LibraryCategoryItem>
        <LibraryCategoryItem>오프라인 저장</LibraryCategoryItem>
      </LibraryCategoryContainer>
      <LibraryNavContainer>
        <LibraryNavItemContainer>
          <LibraryNavItem>재생목록</LibraryNavItem>
          <LibraryNavItem>노래</LibraryNavItem>
          <LibraryNavItem>앨범</LibraryNavItem>
          <LibraryNavItem>아티스트</LibraryNavItem>
        </LibraryNavItemContainer>
        <LibraryNavOption />
      </LibraryNavContainer>
      <LibraryContentContainer>
        {Array.from({ length: 11 }).map((_, idx) => (
          <LibraryContentItem key={idx}>
            <LibraryContentItemImg />
            <LibraryContentItemInfo>
              <LibraryContentItemTitle>
                좋아요 표시한 음악
              </LibraryContentItemTitle>
              <LibraryContentItemOverview>
                자동 재생목록
              </LibraryContentItemOverview>
            </LibraryContentItemInfo>
          </LibraryContentItem>
        ))}
      </LibraryContentContainer>
    </LibraryWrapper>
  );
};

export default Library;
