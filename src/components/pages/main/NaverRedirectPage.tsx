import React, { useEffect } from "react";
import { useGetNaverTokenQuery } from "../../../store/api/authApi";
import { useDispatch } from "react-redux";
import {
  login,
  setAccessToken,
  setId,
  setRefreshToken,
} from "../../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../../unit/skeleton/LoadingUI";
import ErrorUI from "../../unit/skeleton/ErrorUI";
import BackButton from "../../atoms/button/BackButton";

const NaverRedirectPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  const { data, isLoading, isError, error } = useGetNaverTokenQuery({
    code: code ? code : "",
    local: `${process.env.REACT_APP_IP}/oauth/naver/login`,
    protocol: `${process.env.REACT_APP_PROTOCOL}`,
  });
  console.log("네이버");

  useEffect(() => {
    if (data) {
      dispatch(setAccessToken(data.accessToken));
      dispatch(setRefreshToken(data.refreshToken));
      dispatch(setId(data.id));
      dispatch(login());
      navigate("/", { replace: true });
    }
  }, [data, dispatch, navigate]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <>
          <BackButton color="black" />
          <Loading image="login" />
        </>
      );
    }

    if (isError && error) {
      return <ErrorUI error={error} message={`로그인에 실패하였습니다.`} />;
    }

    return null;
  };

  return <div style={{ padding: "20px" }}>{renderContent()}</div>;
};

export default NaverRedirectPage;
