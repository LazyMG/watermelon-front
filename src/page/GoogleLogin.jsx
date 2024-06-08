import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const parsedHash = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = parsedHash.get("access_token");
  const navigate = useNavigate();

  const fetchLoginData = useCallback(async () => {
    const result = await fetch("http://localhost:3000/google-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken: accessToken,
      }),
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
    if (result?.user) {
      localStorage.setItem("userData", JSON.stringify(result.user));
      navigate("/");
    }
  }, [accessToken]);

  useEffect(() => {
    fetchLoginData();
  }, []);

  //로딩으로 만들까
  return <div>Loading</div>;
};

export default GoogleLogin;
