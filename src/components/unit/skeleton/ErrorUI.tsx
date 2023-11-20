import styled from "styled-components";
import errorImage from "../../../styles/images/error.svg";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
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
    color: ${({ theme }) => theme.colors.red};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.fontSizes.large};
    text-align: center;
    word-break: keep-all;
  }
`;

interface ErrorProps {
  error: FetchBaseQueryError | SerializedError;
  message: string;
}

function ErrorUI({ message, error }: ErrorProps) {
  let errorMessage: string = "";

  if ("originalStatus" in error) {
    errorMessage = `${error.originalStatus}: ${message}`;
  }

  if ("status" in error) {
    errorMessage = `${error.status}: ${message}`;
  }

  return (
    <Conainer>
      <img src={errorImage} alt="에러 이미지" />
      <span>{errorMessage}</span>
    </Conainer>
  );
}

export default ErrorUI;
