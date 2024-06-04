import { RouterProvider, createBrowserRouter } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Layout from "./components/Layout";
import Home from "./page/Home";
import Search from "./page/Search";
import Upload from "./page/Upload";
import GoogleLogin from "./page/GoogleLogin";
import Explore from "./page/Explore";
import Watch from "./page/Watch";
import Login from "./page/Login";
import CreateAccount from "./page/CreateAccount";
import ProtectedRoute from "./ProtectedRoute";
import Library from "./page/Library";
import PlayList from "./page/PlayList";
import Channel from "./page/Channel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
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
        element: <Login />,
      },
      {
        path: "create-account",
        element: <CreateAccount />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
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
    path: "/upload",
    element: <Upload />,
  },
  {
    path: "/google-login",
    element: <GoogleLogin />,
  },
]);

const GlobalStyles = createGlobalStyle`
  ${reset};

  *{
    box-sizing: border-box;
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
  width: 100%;
  height: 100%;
`;

function App() {
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
