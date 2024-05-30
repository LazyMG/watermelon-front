import { RouterProvider, createBrowserRouter } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Layout from "./components/Layout";
import Home from "./router/Home";
import Profile from "./router/Profile";
import Search from "./router/Search";
import Login from "./router/Login";
import Upload from "./router/Upload";

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
        path: "profile",
        element: <Profile />,
      },
      {
        path: "search",
        element: <Search />,
      },
    ],
  },
  {
    path: "/google-login",
    element: <Login />,
  },
  {
    path: "/upload",
    element: <Upload />,
  },
]);

const GlobalStyles = createGlobalStyle`
  ${reset};

  *{
    box-sizing: border-box;
  }
  body{
    //background-color: black;
    color: white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
