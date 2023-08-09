import React, { useEffect } from "react";
import { useGetKakaoTokenQuery } from "../../store/api/authApi";

const LoginLoadingRedirectPage = () => {
  // 인가코드
  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);
  const { data: accessToken } = useGetKakaoTokenQuery(code ? code : "");

  useEffect(() => {
    console.log(accessToken);
  }, [accessToken]);

  return <div>로딩중</div>;
};

export default LoginLoadingRedirectPage;
