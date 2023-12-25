import { ReactNode } from "react";
import styled from "styled-components";

const ButtonContainer = styled.div`
  position: fixed;
  flex-direction: column;
  bottom: 30px;
  right: 30px;
  z-index: 98;
  @media (min-width: 992px) {
    left: calc(50% + 325px);
  }
`;

const Button = styled.button<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 30px;
  padding: 2px;
  margin: 5px;
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  word-break: keep-all;
  margin-right: 10px;

  border: 1px solid
    ${({ theme, isActive }) =>
      isActive ? theme.colors.lightGrey : theme.colors.lightGrey};
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.white : theme.colors.textBlue};
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.textBlue : theme.colors.white};

  transition: all 0.2s ease-in-out;

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes.large};
    height: 40px;
    width: 120px;
  }
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
