import styled, { css } from "styled-components";
import { ReactNode } from "react";

const ButtonContainer = styled.div<{ fixed: boolean }>`
  display: flex;
  height: 40px;
  width: 100%;

  margin: ${({ theme }) => theme.margin.base};
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  border: ${({ theme }) => theme.border.default};

  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSizes.large};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};

  & > button:not(:last-child) {
    border-right: 1px solid ${({ theme }) => theme.colors.lightGrey};
  }

  @media (min-width: 768px) {
    grid-column: 1/3;
    margin: 5px;
    width: auto;
  }

  ${({ fixed }) =>
    fixed &&
    css`
      position: fixed;
      bottom: 0px;
      left: 10px;
      width: calc(100vw - 20px);
    `}
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
  fixed?: boolean;
}

function MultiButtonUI({ buttonList, fixed = false }: ResultButtonUIProps) {
  return (
    <ButtonContainer fixed={fixed}>
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
