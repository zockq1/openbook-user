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
import ErrorUI from "../../unit/skeleton/ErrorUI";
import MainPageLayout from "../../atoms/layout/MainPageLayout";
import PolicyAgreePage from "./PolicyAgreePage";
import { usePolicyAgreeMutation } from "../../../store/api/withdrawalApi";

const LoginLoadingRedirectPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  const { data, isLoading, isError, error } = useGetKakaoTokenQuery(
    {
      code: code ? code : "",
      local: `${process.env.REACT_APP_IP}/oauth/kakao/login`,
      protocol: `${process.env.REACT_APP_PROTOCOL}`,
    },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (data) {
      if (!data.isNew) {
        dispatch(setAccessToken(data.accessToken));
        dispatch(setRefreshToken(data.refreshToken));
        dispatch(setId(data.id));
        dispatch(login());
        navigate("/", { replace: true });
      }
    }
  }, [data, dispatch, navigate]);
  const [policyAgree] = usePolicyAgreeMutation();

  const onSubmit = async () => {
    try {
      dispatch(setAccessToken(data?.accessToken));
      dispatch(setRefreshToken(data?.refreshToken));
      dispatch(setId(data?.id));
      dispatch(login());
      await policyAgree().unwrap();
      navigate("/", { replace: true });
    } catch (error: any) {
      alert(error.error);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <>
          <Loading image="login" />
        </>
      );
    }

    if (isError && error) {
      return <ErrorUI error={error} message={`로그인에 실패하였습니다.`} />;
    }

    if (data?.isNew) {
      return <PolicyAgreePage handleSubmit={onSubmit} />;
    }
    return null;
  };

  return <MainPageLayout>{renderContent()}</MainPageLayout>;
};

export default LoginLoadingRedirectPage;
