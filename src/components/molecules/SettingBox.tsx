import styled from "styled-components";

const StyledSettingBox = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 40px);
  margin: ${({ theme }) => theme.margin.base};
  margin-top: 30px;
  padding: ${({ theme }) => theme.padding.base};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  overflow: hidden;
`;

const SettingItem = styled.div`
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
  return (
    <StyledSettingBox>
      <SettingItem>고객센터</SettingItem>
      <Bar />
      <SettingItem>앱 버전</SettingItem>
      <Bar />
      <SettingItem>계정정보</SettingItem>
      <Bar />
      <SettingItem>로그아웃</SettingItem>
      <Bar />
      <SettingItem>기타</SettingItem>
    </StyledSettingBox>
  );
}

export default SettingBox;
