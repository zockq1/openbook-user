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
  border: 2px solid ${({ theme }) => theme.colors.textBlue};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  background-color: ${({ theme }) => theme.colors.white};
  overflow: hidden;

  & > li:not(:last-child) {
    border-bottom: 2px solid ${({ theme }) => theme.colors.textBlue};
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
  height: calc(100% - 50px);
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
}

function IncorrectAnswerListUI({ questionList }: IncorrectAnswerListUIProps) {
  const theme = useContext(ThemeContext);

  return (
    <WrongQuestionList>
      <WrongQuestionTitle>오답 목록</WrongQuestionTitle>
      {questionList.map((question, index) => {
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
                <WrongQuestionText color="">
                  <div>
                    <Icon icon="description" />
                  </div>
                  {descriptionList.map((description) => description).join(", ")}
                </WrongQuestionText>
                <WrongQuestionText color={theme.colors.blue}>
                  <div>
                    <Icon icon="o" />
                  </div>
                  {choiceList.map((choice) => {
                    if (choice.key === answer)
                      return (
                        `${choice.choice}` +
                        (choice.commentList.length > 0
                          ? `(${choice.commentList.map(
                              (comment, index, arr) =>
                                `${comment}${
                                  index < arr.length - 1 ? ", " : ""
                                }`
                            )})`
                          : "")
                      );
                    return null;
                  })}
                </WrongQuestionText>
                <WrongQuestionText color={theme.colors.red}>
                  <div>
                    <Icon icon="x" />
                  </div>
                  {`${
                    choiceList[Number(checkedChoiceKey.substring(0, 1))].choice
                  }` +
                    (choiceList[Number(checkedChoiceKey.substring(0, 1))]
                      .commentList.length > 0
                      ? `(${choiceList[
                          Number(checkedChoiceKey.substring(0, 1))
                        ].commentList.map(
                          (comment, index, arr) =>
                            `${comment}${index < arr.length - 1 ? ", " : ""}`
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
