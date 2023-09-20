import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

const withAuth =
  (WrappedComponent: React.ComponentType<any>) => (props: any) => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const navigate = useNavigate();
    useEffect(() => {
      if (!isLoggedIn) {
        alert("로그인 후 이용 가능합니다.");
        navigate("/");
      }
    }, [isLoggedIn, navigate]);

    return <WrappedComponent {...props} />;
  };

export default withAuth;
