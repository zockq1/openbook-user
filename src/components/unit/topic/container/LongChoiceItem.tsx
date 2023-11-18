import styled from "styled-components";
import {
  CheckBoxInput,
  CheckBoxLabel,
} from "../../../atoms/checkbox/QuestionCheckBox";
import { ExamCommentModel } from "../../../../types/questionTypes";

interface AnswerCheckProps {
  isFinish?: boolean;
  isCorrect?: boolean;
}

interface ChoiceProps {
  handleChoiceClick: (checkboxId: string) => void;
  handleCheckboxChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  choiceKey: string;
  choice: string;
  isCorrect: boolean;
  isFinish: boolean;
  selectedCheckbox: string;
  examCommentList?: ExamCommentModel[];
}

const LongChoice = styled.div<AnswerCheckProps>`
  display: flex;
  align-items: center;
  width: 100%;
  height: max-content;
  margin: ${({ theme }) => theme.margin.base};
  padding: 0 0 0 12px;
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  border: 2px solid
    ${({ theme, isFinish, isCorrect }) =>
      isFinish
        ? isCorrect
          ? theme.colors.blue
          : theme.colors.red
        : theme.colors.textBlue};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  color: ${({ theme }) => theme.colors.textBlue};
  background-color: ${({ theme }) => theme.colors.white};
`;

export const LongComment = styled.span<AnswerCheckProps>`
  margin-left: 5px;

  color: ${({ theme, isCorrect, isFinish }) =>
    isFinish
      ? isCorrect
        ? theme.colors.blue
        : theme.colors.red
      : theme.colors.textBlue};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSizes.small};
  word-break: keep-all;
  line-height: 120%;
`;

function LongChoiceItem({
  handleChoiceClick,
  choiceKey,
  choice,
  isCorrect,
  isFinish,
  selectedCheckbox,
  examCommentList,
}: ChoiceProps) {
  return (
    <>
      <LongChoice
        onClick={() => handleChoiceClick(choiceKey)}
        isFinish={isFinish}
        isCorrect={isCorrect}
      >
        <CheckBoxInput
          choiceKey={choiceKey}
          handleCheckboxChange={(e) => handleChoiceClick(e.target.id)}
          selectedCheckbox={selectedCheckbox}
        />
        <CheckBoxLabel
          choiceKey={choiceKey}
          isCorrect={isCorrect}
          isFinish={isFinish}
        />
        <LongComment isFinish={isFinish} isCorrect={isCorrect}>
          {choice}
        </LongComment>
      </LongChoice>
      {examCommentList && isFinish && (
        <LongComment isFinish={isFinish} isCorrect={isCorrect}>
          {examCommentList.map((item) => {
            const {
              keywordComment,
              keywordDateComment,
              keywordName,
              topicDateComment,
              topicTitle,
            } = item;
            let comment = topicTitle;
            comment += topicDateComment ? `(${topicDateComment}): ` : `: `;
            comment += keywordName;
            comment += keywordDateComment ? `(${keywordDateComment})` : ``;
            return (
              <span key={item.keywordName}>
                {comment} <br /> {keywordComment} <br />
              </span>
            );
          })}
        </LongComment>
      )}
    </>
  );
}
export { LongChoiceItem };
