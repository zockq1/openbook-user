import { ReactNode } from "react";
import styled from "styled-components";
import MenuLabelBox from "../../../atoms/box/MenuLabelBox";

const IncorrectList = styled.ul`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: ${({ theme }) => theme.margin.base};
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  border: 2px solid ${({ theme }) => theme.colors.textBlue};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  background-color: ${({ theme }) => theme.colors.white};
  overflow: hidden;

  & > li:not(:last-child) {
    border-bottom: 2px solid ${({ theme }) => theme.colors.textBlue};
  }
`;

const Title = styled.li`
  color: ${({ theme }) => theme.colors.textBlue};
  padding: ${({ theme }) => theme.padding.small};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-family: "Giants-Regular";
  text-align: center;
`;

const Incorrect = styled.li`
  display: flex;
  padding: ${({ theme }) => theme.padding.small};
`;
const IncorrectContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 50px);
  margin: auto 10px auto;
`;

const IncorrectText = styled.div<{ color: string }>`
  display: flex;
  width: fit-content;
  flex-wrap: nowrap;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ color, theme }) => (color ? color : theme.colors.textBlue)};
  line-height: 120%;
  word-break: keep-all;
  overflow: hidden;

  i {
    margin-right: 5px;
  }
`;

export interface IncorrectCommentModel {
  number: number;
  commentList: { color: string; icon: ReactNode; comment: string }[];
}

interface IncorrectUIProps {
  questionList: IncorrectCommentModel[];
}

function IncorrectUI({ questionList }: IncorrectUIProps) {
  return (
    <IncorrectList>
      <Title>오답 목록</Title>
      {questionList.map((question) => {
        return (
          <Incorrect key={question.number}>
            <MenuLabelBox state="Locked">{question.number}</MenuLabelBox>
            <IncorrectContainer>
              {question.commentList.map((comment, index) => {
                return (
                  <IncorrectText color={comment.color} key={index}>
                    <i>{comment.icon}</i>
                    {comment.comment}
                  </IncorrectText>
                );
              })}
            </IncorrectContainer>
          </Incorrect>
        );
      })}
    </IncorrectList>
  );
}

export default IncorrectUI;
