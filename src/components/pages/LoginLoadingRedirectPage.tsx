import React, { useEffect } from "react";
import { useGetKakaoTokenQuery } from "../../store/api/authApi";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const LoginLoadingRedirectPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  const { data } = useGetKakaoTokenQuery(code ? code : "");

  useEffect(() => {
    if (data) {
      const accessToken = data.accessToken;
      dispatch(setAccessToken(accessToken)); // Redux Store에 토큰 저장
    }
    navigate("/");
  }, [data, dispatch, navigate]);

  return <div>로딩중</div>;
};

export default LoginLoadingRedirectPage;
