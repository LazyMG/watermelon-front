import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #030303;
  height: 100vh;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderItem = styled.div`
  padding: 15px;
  background-color: #828282;
  font-size: 20px;
  color: black;

  cursor: pointer;
`;

const Loading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
`;

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData"))
      : null;

    if (!userData || userData?.admin === false) {
      navigate("/");
    }
    setIsLoading(false);
  }, [navigate]);

  return (
    <Wrapper>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <>
          <Header>
            <HeaderRow>
              <HeaderItem>
                <Link to="/admin/upload/music">Upload Music</Link>
              </HeaderItem>
              <HeaderItem>
                <Link to="/admin/upload/artist">Upload Artist</Link>
              </HeaderItem>
              <HeaderItem>
                <Link to="/admin/upload/album">Upload Album</Link>
              </HeaderItem>
            </HeaderRow>
            <HeaderRow>
              <HeaderItem>
                <Link to="/admin/connect/artist">Connect Artist</Link>
              </HeaderItem>
              <HeaderItem>
                <Link to="/admin/connect/album">Connect Album</Link>
              </HeaderItem>
              <HeaderItem>
                <Link to="/">Home</Link>
              </HeaderItem>
            </HeaderRow>
          </Header>
          <Outlet />
        </>
      )}
    </Wrapper>
  );
};

export default AdminLayout;
