import { useSetRecoilState } from "recoil";
import { authState } from "../atom";
import { useEffect } from "react";

const useAuth = () => {
  const setAuth = useSetRecoilState(authState);

  useEffect(() => {
    const checkSession = async () => {
      //console.log("auth");
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACK_ADDRESS}/user/session`,
          {
            method: "GET",
            credentials: "include", // 쿠키를 포함하여 요청
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then((result) => result.json());
        console.log("useAuth 결과", response);
        if (response.ok) {
          const user = response.user;
          setAuth({
            isAuthenticated: true,
            user,
            loading: false,
          });
          if (!localStorage.getItem("ytMusicAuth"))
            localStorage.setItem(
              "ytMusicAuth",
              JSON.stringify({ isAuthenticated: true })
            );
        } else {
          setAuth({
            isAuthenticated: false,
            user: null,
            loading: false,
          });
          if (localStorage.getItem("ytMusicAuth"))
            localStorage.removeItem("ytMusicAuth");
        }
      } catch (error) {
        console.error("Failed to check session:", error);
        setAuth({
          isAuthenticated: false,
          user: null,
          loading: false,
        });
        if (localStorage.getItem("ytMusicAuth"))
          localStorage.removeItem("ytMusicAuth");
      }
    };

    checkSession();
  }, [setAuth]);
};

export default useAuth;
