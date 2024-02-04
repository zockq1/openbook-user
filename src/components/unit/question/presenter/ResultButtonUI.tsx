import styled from "styled-components";
import Icon from "../../../atoms/icon/Icon";
import { useNavigate } from "react-router-dom";

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
    border-right: ${({ theme }) => theme.border.default};
  }

  @media (min-width: 768px) {
    grid-column: 1/3;
    margin: 5px;
    width: auto;
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
  isSuccess: boolean;
  onNextContent: () => void;
}

function ResultButtonUI({ isSuccess, onNextContent }: ResultButtonUIProps) {
  const navigate = useNavigate();
  return isSuccess ? (
    <ButtonContainer>
      <Button onClick={() => navigate(-1)}>
        목록 &nbsp;
        <Icon icon="CHAPTER_INFO" size={22} />
      </Button>
      <Button onClick={() => window.location.reload()}>
        다시 풀기 &nbsp;
        <Icon icon="again" size={22} />
      </Button>
      <Button onClick={onNextContent}>
        다음 문제&nbsp;
        <Icon icon="next" size={22} />
      </Button>
    </ButtonContainer>
  ) : (
    <ButtonContainer>
      <Button onClick={() => navigate(-1)}>
        <Icon icon="CHAPTER_INFO" size={22} />
        &nbsp;목록
      </Button>
      <Button onClick={() => window.location.reload()}>
        <Icon icon="again" size={22} />
        &nbsp;다시 풀기
      </Button>
    </ButtonContainer>
  );
}
export default ResultButtonUI;
