import { ReactNode } from "react";
import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 35px;
  width: 100%;
  bottom: 0;
  left: 0;

  & > button:not(:last-child) {
    margin-left: 0;
  }
`;

const Button = styled.button<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 2px;
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  font-size: ${({ theme }) => theme.fontSizes.small};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  font-family: "Giants-Regular";
  word-break: keep-all;
  flex: 1;
  margin-left: 10px;

  border: 2px solid ${({ theme }) => theme.colors.textBlue};
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.white : theme.colors.textBlue};
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.green : theme.colors.white};

  transition: color 0.2s ease-in-out;
  transition: background-color 0.2s ease-in-out;
`;
interface ToggleButtonUIProps {
  buttonList: {
    onClick: () => void;
    contents: ReactNode;
    isActive: boolean;
  }[];
}
function ToggleButtonUI({ buttonList }: ToggleButtonUIProps) {
  return (
    <ButtonContainer>
      {buttonList.map((button, index) => {
        const { onClick, contents, isActive } = button;
        return (
          <Button onClick={onClick} key={index} isActive={isActive}>
            {contents}
          </Button>
        );
      })}
    </ButtonContainer>
  );
}

export default ToggleButtonUI;
