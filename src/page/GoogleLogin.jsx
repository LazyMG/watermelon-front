import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authState } from "../atom";

const GoogleLogin = () => {
  const parsedHash = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = parsedHash.get("access_token");
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authState);
  console.log(accessToken);

  const fetchLoginData = useCallback(async () => {
    const result = await fetch("http://localhost:3000/google-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken: accessToken,
      }),
      credentials: "include",
    })
      .then((response) => {
        const statusCode = response.status;
        if (statusCode === 200) {
          //로컬스토리지에 저장
          console.log("완료");
          //window.location.href = "/";
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
        navigate("/login");
      });
    if (result?.ok) {
      setAuth({
        isAuthenticated: true,
        user: result.user,
        loading: false,
      });
      localStorage.setItem(
        "ytMusicAuth",
        JSON.stringify({ isAuthenticated: true })
      );
      navigate("/");
    }
  }, [accessToken, setAuth, navigate]);

  useEffect(() => {
    fetchLoginData();
  }, []);

  //로딩으로 만들까
  return <div>Loading</div>;
};

export default GoogleLogin;
