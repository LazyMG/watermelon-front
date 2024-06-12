import { useSetRecoilState } from "recoil";
import { authState } from "../atom";
import { useEffect } from "react";

const useAuth = () => {
  const setAuth = useSetRecoilState(authState);

  useEffect(() => {
    const checkSession = async () => {
      console.log("auth");
      try {
        const response = await fetch("http://localhost:3000/user/session", {
          method: "GET",
          credentials: "include", // 쿠키를 포함하여 요청
        }).then((result) => result.json());

        if (response.ok) {
          const userId = response.userId;
          setAuth({
            isAuthenticated: true,
            user: userId,
            loading: false,
          });
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
