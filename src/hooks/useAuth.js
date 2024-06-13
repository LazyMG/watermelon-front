import { useSetRecoilState } from "recoil";
import { authState } from "../atom";
import { useEffect } from "react";

const useAuth = () => {
  const setAuth = useSetRecoilState(authState);

  useEffect(() => {
    //if (localStorage.getItem("ytMusicAuth")) return;
    const checkSession = async () => {
      console.log("auth");
      try {
        const response = await fetch("http://localhost:3000/user/session", {
          method: "GET",
          credentials: "include", // 쿠키를 포함하여 요청
        }).then((result) => result.json());
        console.log(response);
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
        }
      } catch (error) {
        console.error("Failed to check session:", error);
        setAuth({
          isAuthenticated: false,
          user: null,
          loading: false,
        });
      }
    };

    checkSession();
  }, [setAuth]);
};

export default useAuth;
