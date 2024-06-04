const GoogleLogin = () => {
  const parsedHash = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = parsedHash.get("access_token");

  console.log(accessToken);

  return <div>GoogleLogin</div>;
};

export default GoogleLogin;
