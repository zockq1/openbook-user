import styled from "styled-components";
import { ReactNode } from "react";

const ButtonContainer = styled.div`
  display: flex;
  height: 50px;
  width: 100%;

  margin: ${({ theme }) => theme.margin.base};
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  border: ${({ theme }) => theme.border.default};

  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSizes.large};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};

  & > button:not(:last-child) {
    border-right: 2px solid ${({ theme }) => theme.colors.textBlue};
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-grow: 1;
  font-family: "Giants-Regular";
  word-break: keep-all;

  color: ${({ theme }) => theme.colors.textBlue};
`;

interface ResultButtonUIProps {
  buttonList: {
    onClick: () => void;
    contents: ReactNode;
  }[];
}

function MultiButtonUI({ buttonList }: ResultButtonUIProps) {
  return (
    <ButtonContainer>
      {buttonList.map((button, index) => {
        const { onClick, contents } = button;
        return (
          <Button onClick={onClick} key={index}>
            {contents}
          </Button>
        );
      })}
    </ButtonContainer>
  );
}
export default MultiButtonUI;
