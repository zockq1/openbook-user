import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { QuestionModel } from "../../../../types/questionTypes";
import MenuLabelBox from "../../../atoms/box/MenuLabelBox";
import Icon from "../../../atoms/icon/Icon";

const WrongQuestionList = styled.ul`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: ${({ theme }) => theme.margin.base};
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  border: ${({ theme }) => theme.border.default};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  background-color: ${({ theme }) => theme.colors.white};
  overflow: hidden;

  & > li:not(:last-child) {
    border-bottom: ${({ theme }) => theme.border.default};
  }

  @media (min-width: 768px) {
    width: auto;
    height: max-content;
    margin: 5px;
  }
`;

const WrongQuestionTitle = styled.li`
  padding: ${({ theme }) => theme.padding.small};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-family: "Giants-Regular";
  text-align: center;
`;

const WrongQuestion = styled.li`
  display: flex;
  padding: ${({ theme }) => theme.padding.small};
`;

const WrongQuestionTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto 10px auto;
`;

const WrongQuestionText = styled.div<{ color: string }>`
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

interface IncorrectAnswerListUIProps {
  questionList: QuestionModel[];
  commentList?: {
    number: number;
    description: string;
  };
}

function IncorrectAnswerListUI({ questionList }: IncorrectAnswerListUIProps) {
  const theme = useContext(ThemeContext);

  return (
    <WrongQuestionList>
      <WrongQuestionTitle>오답 목록</WrongQuestionTitle>
      {questionList.map((question, index) => {
        if (question.choiceList.length === 0 || !question.isFinish) return null;
        const {
          isCorrect,
          descriptionList,
          choiceList,
          checkedChoiceKey,
          answer,
        } = question;
        if (!isCorrect) {
          return (
            <WrongQuestion key={index}>
              <MenuLabelBox state="Locked">{index + 1}</MenuLabelBox>

              <WrongQuestionTextContainer>
                {/* 보기 */}
                <WrongQuestionText color="">
                  <i>
                    <Icon icon="description" size={12} />
                  </i>
                  {descriptionList.length > 0 &&
                    descriptionList
                      .map((description) => description)
                      .join(", ")}
                </WrongQuestionText>
                {/* 정답 선지 */}
                <WrongQuestionText color={theme.colors.blue}>
                  <i>
                    <Icon icon="o" size={12} />
                  </i>
                  {choiceList.length > 0 &&
                    choiceList.map((choice) => {
                      if (choice.key === answer)
                        return (
                          `${choice.choice}` +
                          (choice.commentList.length > 0
                            ? `(${choice.commentList.map(
                                (comment, index, arr) =>
                                  `${comment.comment}${
                                    index < arr.length - 1 ? ", " : ""
                                  }`
                              )})`
                            : "")
                        );
                      return null;
                    })}
                </WrongQuestionText>
                {/* {오답 선지} */}
                <WrongQuestionText color={theme.colors.red}>
                  <i>
                    <Icon icon="x" size={12} />
                  </i>
                  {`${
                    choiceList[Number(checkedChoiceKey.substring(0, 1)) - 1] &&
                    choiceList[Number(checkedChoiceKey.substring(0, 1)) - 1]
                      .choice
                  }` +
                    (choiceList[Number(checkedChoiceKey.substring(0, 1)) - 1] &&
                    choiceList[Number(checkedChoiceKey.substring(0, 1)) - 1]
                      .commentList.length > 0
                      ? `(${choiceList[
                          Number(checkedChoiceKey.substring(0, 1)) - 1
                        ].commentList.map(
                          (comment, index, arr) =>
                            `${comment.comment}${
                              index < arr.length - 1 ? ", " : ""
                            }`
                        )})
                  `
                      : "")}
                </WrongQuestionText>
              </WrongQuestionTextContainer>
            </WrongQuestion>
          );
        }
        return null;
      })}
    </WrongQuestionList>
  );
}

export default IncorrectAnswerListUI;
