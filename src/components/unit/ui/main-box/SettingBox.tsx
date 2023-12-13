import { useDispatch } from "react-redux";
import styled from "styled-components";
import { logout } from "../../../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../../store/store";
import { useSelector } from "react-redux";
import ResetButton from "../../../atoms/button/ResetButton";
import WithdrawalButton from "../../../atoms/button/WithdrawalButton";

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
function SettingBox() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    alert("로그아웃 되었습니다.");
    window.location.replace("/");
  };

  return (
    <StyledSettingBox>
      <SettingItem>문의 메일</SettingItem>
      <Bar />
      <SettingItem>업데이트 목록</SettingItem>
      <Bar />
      <SettingItem onClick={() => navigate("/option/privacy")}>
        개인정보 처리방침
      </SettingItem>
      <Bar />
      {/* <SettingItem>이용 약관</SettingItem> */}
      <Bar />
      {isLoggedIn && (
        <>
          <SettingItem onClick={handleLogout}>로그아웃</SettingItem>
          <Bar />
          <ResetButton />
          <Bar />
          <WithdrawalButton />
        </>
      )}
    </StyledSettingBox>
  );
}

export default SettingBox;
