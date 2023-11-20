import styled from "styled-components";
import emptyImage from "../../../styles/images/empty.svg";

const Conainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 210px);
  margin-bottom: 60px;

  img {
    width: 50%;
    height: 50%;
  }

  span {
    color: ${({ theme }) => theme.colors.black};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.fontSizes.large};
    text-align: center;
    word-break: keep-all;
  }
`;

interface EmptyProps {
  message: string;
}

function EmptyUI({ message }: EmptyProps) {
  return (
    <Conainer>
      <img src={emptyImage} alt="빈 이미지" />
      <span>{message}</span>
    </Conainer>
  );
}

export default EmptyUI;
