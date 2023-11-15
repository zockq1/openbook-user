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
import Loading from "../../unit/skeleton/LoadingUI";

const LoginLoadingRedirectPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  //const { data } = useGetKakaoTokenQuery(code ? code : "");
  const { data } = useGetKakaoTokenQuery({
    code: code ? code : "",
    local: `${process.env.REACT_APP_IP}/oauth/kakao/login`,
  });

  useEffect(() => {
    if (data) {
      dispatch(setAccessToken(data.accessToken));
      dispatch(setRefreshToken(data.refreshToken));
      dispatch(setId(data.id));
      dispatch(login());
      navigate("/", { replace: true });
    }
  }, [data, dispatch, navigate]);

  return <Loading image="login" />;
};

export default LoginLoadingRedirectPage;
