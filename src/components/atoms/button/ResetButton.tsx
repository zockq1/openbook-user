import { useState } from "react";
import { useResetUserDataMutation } from "../../../store/api/withdrawalApi";
import styled from "styled-components";
import ReactModal from "react-modal";

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

const SettingItem = styled.button`
  margin: ${({ theme }) => theme.margin.base};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
`;

function ResetButton() {
  const [modalOpen, setModalOpen] = useState(false);
  const [resetUserData] = useResetUserDataMutation();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleWithdrawal = async () => {
    try {
      await resetUserData().unwrap();
      window.localStorage.clear();
      window.location.replace("/");
      alert("데이터 초기화 되었습니다.");
    } catch (error) {
      alert("데이터 초기화에 실패했습니다.");
    }
  };
  return (
    <>
      <SettingItem onClick={openModal}>데이터 초기화</SettingItem>
      <ReactModal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
        ariaHideApp={false}
        contentLabel="Pop up Message"
      >
        <Title>데이터를 초기화 하시겠습니까?</Title>
        <Description>
          초기화 버튼 선택 시 계정은
          <br /> 즉시 초기화 되며 복구되지 않습니다.
        </Description>
        <DeleteButton onClick={handleWithdrawal}>초기화</DeleteButton>
        <CancelButton onClick={closeModal}>취소</CancelButton>
      </ReactModal>
    </>
  );
}

export default ResetButton;
