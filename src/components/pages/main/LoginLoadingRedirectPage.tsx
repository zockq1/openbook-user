import React, { useEffect } from "react";
import { useGetKakaoTokenQuery } from "../../../store/api/authApi";
import { useDispatch } from "react-redux";
import {
  login,
  setAccessToken,
  setId,
  setRefreshToken,
} from "../../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const LoginLoadingRedirectPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  const { data } = useGetKakaoTokenQuery(code ? code : "");

  useEffect(() => {
    if (data) {
      dispatch(setAccessToken(data.accessToken));
      dispatch(setRefreshToken(data.refreshToken));
      dispatch(setId(data.id));
      dispatch(login());
      navigate("/");
    }
  }, [data, dispatch, navigate]);

  return <div>로딩중</div>;
};

export default LoginLoadingRedirectPage;
