import styled, { ThemeContext } from "styled-components";
import Icon from "../icon/Icon";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import ReactModal from "react-modal";

import kakao from "../../../styles/images/kakao.png";
import apple from "../../../styles/images/apple.png";
import naver from "../../../styles/images/naver.png";
import google from "../../../styles/images/google.png";
import Logo from "../icon/Logo";

const StyledLogin = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const customModalStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100vh",
    zIndex: "9999",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    width: "300px",
    height: "300px",
    zIndex: "150",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
    backgroundColor: "white",
    justifyContent: "center",
    overflow: "auto",
  },
};

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  margin-bottom: 15px;
  margin-top: 50px;

  & > strong {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
`;

const SocialLoginList = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const LogginImageBackground = styled.div<{
  color: string;
  borderColor: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  width: 45px;
  background-color: ${({ color }) => color};
  border: 1px solid ${({ borderColor }) => borderColor};
  border-radius: 50%;
  margin: 5px;
`;

const LogginImage = styled.img`
  height: 25px;
  width: 25px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
`;

function LoginButton() {
  const theme = useContext(ThemeContext);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <StyledLogin aria-label="login" onClick={openModal}>
        <Icon icon="login" size={25} color={theme.colors.textBlue} />
      </StyledLogin>
      <ReactModal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
        ariaHideApp={false}
        contentLabel="Pop up Message"
      >
        <Logo size={30} />
        <Title>
          <strong>SNS 계정</strong>으로 <strong>간편하게</strong> 로그인
        </Title>
        <SocialLoginList>
          <Link
            to={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_KEY}&redirect_uri=${process.env.REACT_APP_URL}/oauth/kakao/login&response_type=code`}
            replace={true}
          >
            <LogginImageBackground color="#ffe600" borderColor="#FCD200">
              <LogginImage src={kakao} alt="kakao-login" />
            </LogginImageBackground>
          </Link>
          <Link
            to={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
              process.env.REACT_APP_NAVER_KEY
            }&state=${"state"}&redirect_uri=${
              process.env.REACT_APP_URL
            }/oauth/naver/login`}
            replace={true}
          >
            <LogginImageBackground color="#2DBA2D" borderColor="#00A800">
              <LogginImage src={naver} alt="naver-login" />
            </LogginImageBackground>
          </Link>
          <Link to={""} replace={true}>
            <LogginImageBackground color="#FFFFFF" borderColor="#DDDDDD">
              <LogginImage src={apple} alt="apple-login" />
            </LogginImageBackground>
          </Link>
          <Link to={""} replace={true}>
            <LogginImageBackground color="#FFFFFF" borderColor="#DDDDDD">
              <LogginImage src={google} alt="google-login" />
            </LogginImageBackground>
          </Link>
        </SocialLoginList>
        <CloseButton onClick={closeModal}>x</CloseButton>
      </ReactModal>
    </>
  );
}

export default LoginButton;
