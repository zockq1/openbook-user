import { useDispatch } from "react-redux";
import styled from "styled-components";
import { logout } from "../../../../store/slices/authSlice";
import ReactModal from "react-modal";
import { useState } from "react";
import { useWithdrawalMutation } from "../../../../store/api/withdrawalApi";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../../store/store";
import { useSelector } from "react-redux";

const StyledSettingBox = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    grid-column: 2/4;
  }
  grid-row: 2/4;
  margin: 8px;
  height: max-content;
  padding: ${({ theme }) => theme.padding.base};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  overflow: hidden;
`;

const SettingItem = styled.button`
  margin: ${({ theme }) => theme.margin.base};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
`;

const Bar = styled.div`
  height: 1px;
  width: 100%;
  background-color: ghostwhite;
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: 10px;
`;
const Description = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeight.light};
`;
const DeleteButton = styled.button`
  width: 180px;
  height: 40px;
  margin: 10px;
  margin-top: 30px;
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.textBlue};
`;
const CancelButton = styled.button`
  width: 180px;
  height: 40px;
  color: ${({ theme }) => theme.colors.grey};
`;

const customModalStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100vh",
    zIndex: "10",
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

function SettingBox() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [withdrawal] = useWithdrawalMutation();
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  const handleWithdrawal = async () => {
    try {
      await withdrawal().unwrap();
      dispatch(logout());
      alert("회원 탈퇴 되었습니다.");
      navigate("/");
    } catch (error) {
      alert("회원 탈퇴에 실패했습니다.");
    }
  };

  return (
    <StyledSettingBox>
      <SettingItem>문의 메일</SettingItem>
      <Bar />
      <SettingItem>업데이트 목록</SettingItem>
      <Bar />
      <SettingItem>개인전보 처리방침</SettingItem>
      <Bar />
      <SettingItem>이용 약관</SettingItem>
      <Bar />
      {isLoggedIn && (
        <>
          <SettingItem onClick={handleLogout}>로그아웃</SettingItem>
          <Bar />
          <SettingItem>데이터 초기화</SettingItem>
          <Bar />
          <SettingItem onClick={openModal}>회원 탈퇴</SettingItem>
          <ReactModal
            isOpen={modalOpen}
            onRequestClose={closeModal}
            style={customModalStyles}
            ariaHideApp={false}
            contentLabel="Pop up Message"
          >
            <Title>정말 탈퇴하시겠습니까?</Title>
            <Description>
              회원 탈퇴 버튼 선택 시 계정은
              <br /> 즉시 삭제되며 복구되지 않습니다.
            </Description>
            <DeleteButton onClick={handleWithdrawal}>탈퇴</DeleteButton>
            <CancelButton onClick={closeModal}>취소</CancelButton>
          </ReactModal>
        </>
      )}
    </StyledSettingBox>
  );
}

export default SettingBox;
