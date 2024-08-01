import { RouterProvider, createBrowserRouter } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Layout from "./components/Layout";
import Home from "./page/Home";
import Search from "./page/Search";
import GoogleLogin from "./page/GoogleLogin";
import Explore from "./page/Explore";
import Watch from "./page/Watch";
import Login from "./page/Login";
import CreateAccount from "./page/CreateAccount";
import Library from "./page/Library";
import PlayList from "./page/PlayList";
import Channel from "./page/Channel";
import UploadArtist from "./page/upload/UploadArtist";
import UploadMusic from "./page/upload/UploadMusic";
import UploadAlbum from "./page/upload/UploadAlbum";
import ArtistAlbum from "./page/connect/ArtistAlbum";
import ArtistMusic from "./page/connect/ArtistMusic";
import ConnectArtist from "./page/connect/ConnectArtist";
import ConnectAlbum from "./page/connect/ConnectAlbum";
import AlbumMusic from "./page/connect/AlbumMusic";
import AdminLayout from "./components/AdminLayout";
import { useEffect } from "react";
import useAuth from "./hooks/useAuth";
import { useRecoilValue } from "recoil";
import { authState } from "./atom";
import Test from "./page/Test";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "test",
        element: <Test />,
      },
      {
        path: "",
        element: <Home />,
      },
      {
        path: "explore",
        element: <Explore />,
      },
      {
        path: "search",
        element: <Search />, //param 예외처리 필요
      },
      {
        path: "watch",
        element: <Watch />, //param 예외처리 필요
      },
      {
        path: "playlist",
        element: <PlayList />, //param 예외처리 필요
      },
      {
        path: "login",
        element: <Login />, //재생 멈추기
      },
      {
        path: "create-account",
        element: <CreateAccount />, //재생 멈추기
      },
      {
        path: "library",
        element: <Library />,
      },
      {
        path: "channel/:channelId",
        element: <Channel />, //channelId 예외처리 필요
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "upload",
        children: [
          {
            path: "artist",
            element: <UploadArtist />,
          },
          {
            path: "music",
            element: <UploadMusic />,
          },
          {
            path: "album",
            element: <UploadAlbum />,
          },
        ],
      },
      {
        path: "connect",
        children: [
          {
            path: "artist",
            element: <ConnectArtist />,
          },
          {
            path: "artist/:artistId/artistAlbum",
            element: <ArtistAlbum />,
          },
          {
            path: "artist/:artistId/artistMusic",
            element: <ArtistMusic />,
          },
          {
            path: "album",
            element: <ConnectAlbum />,
          },

          {
            path: "album/:albumId/albumMusic",
            element: <AlbumMusic />,
          },
        ],
      },
    ],
  },
  {
    path: "/google-login",
    element: <GoogleLogin />,
  },
  {
    path: "*",
    element: "",
  },
]);

const GlobalStyles = createGlobalStyle`
  ${reset};

  *{
    box-sizing: border-box;
    scrollbar-color: #606060 #1c1c1c; /* 핸들 및 트랙 색상 */
    
  }
  body{
    background-color: #030303;
    color: white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  a{
    text-decoration: none;
    color: white;
  }
  /* ::-webkit-scrollbar {
    display:none;
  } */
  input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-text-fill-color: #000;
  transition: background-color 5000s ease-in-out 0s;
}
`;

const Wrapper = styled.div`
  /* width: 100%;
  height: 100vh; */
`;

function App() {
  //const auth = useRecoilValue(authState);
  useAuth();

  // useEffect(() => {
  //   const localAuth = JSON.parse(localStorage.getItem("ytMusicAuth"));
  //   //console.log("localstorage", localAuth);
  //   //console.log("recoil", auth);
  // }, [auth]);

  return (
    <>
      <Wrapper>
        <GlobalStyles />
        <RouterProvider router={router} />
      </Wrapper>
    </>
  );
}

export default App;
