import styled from "styled-components";
import { CheckBoxInput, CheckBoxLabel } from "../atoms/CheckBox";

interface AnswerCheckProps {
  isSolved?: string;
  isAnswer?: boolean;
}

interface ChoiceProps {
  handleChoiceClick: (checkboxId: string) => void;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  current: string;
  answer: string;
  choice: string;
  isSolved: string;
  selectedCheckbox: string;
}

const LongChoice = styled.div<AnswerCheckProps>`
  display: flex;
  align-items: center;
  width: calc(100vw - 30px);
  height: max-content;
  margin: 10px 15px;
  padding: 0 12px;
  border-radius: 10px;
  border: ${({ theme, isSolved, isAnswer }) =>
    isSolved !== "no"
      ? isAnswer
        ? theme.border.blue
        : theme.border.red
      : theme.border.black};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.white};
`;

const LongComment = styled.span<AnswerCheckProps>`
  width: max-content;
  margin: 12px;

  color: ${({ theme, isSolved, isAnswer }) =>
    isSolved !== "no"
      ? isAnswer
        ? theme.colors.blue
        : theme.colors.red
      : theme.colors.black};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSizes.small};

  line-height: 120%;
`;

function LongChoiceItem({
  handleChoiceClick,
  handleCheckboxChange,
  current,
  answer,
  choice,
  isSolved,
  selectedCheckbox,
}: ChoiceProps) {
  return (
    <LongChoice
      onClick={() => handleChoiceClick(current)}
      isSolved={isSolved}
      isAnswer={current.substring(1) === answer}
      key={current}
    >
      <CheckBoxInput
        current={current}
        handleCheckboxChange={handleCheckboxChange}
        selectedCheckbox={selectedCheckbox}
      />
      <CheckBoxLabel current={current} answer={answer} isSolved={isSolved} />
      <LongComment
        isSolved={isSolved}
        isAnswer={current.substring(1) === answer}
      >
        {choice}
      </LongComment>
    </LongChoice>
  );
}
export { LongChoiceItem };
