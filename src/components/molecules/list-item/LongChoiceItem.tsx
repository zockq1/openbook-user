import styled from "styled-components";
import {
  CheckBoxInput,
  CheckBoxLabel,
} from "../../atoms/checkbox/QuestionCheckBox";

interface AnswerCheckProps {
  isFinish?: boolean;
  isCorrect?: boolean;
}

interface ChoiceProps {
  handleChoiceClick: (checkboxId: string) => void;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  choiceKey: string;
  choice: string;
  isCorrect: boolean;
  isFinish: boolean;
  selectedCheckbox: string;
}

const LongChoice = styled.div<AnswerCheckProps>`
  display: flex;
  align-items: center;
  width: calc(100% - 30px);
  height: max-content;
  margin: 10px 15px;
  padding: 0 12px;
  border-radius: 10px;
  border: ${({ theme, isFinish, isCorrect }) =>
    isFinish
      ? isCorrect
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

  color: ${({ theme, isCorrect, isFinish }) =>
    isFinish
      ? isCorrect
        ? theme.colors.blue
        : theme.colors.red
      : theme.colors.black};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs};

  line-height: 120%;
`;

function LongChoiceItem({
  handleChoiceClick,
  handleCheckboxChange,
  choiceKey,
  choice,
  isCorrect,
  isFinish,
  selectedCheckbox,
}: ChoiceProps) {
  return (
    <LongChoice
      onClick={() => handleChoiceClick(choiceKey)}
      isFinish={isFinish}
      isCorrect={isCorrect}
    >
      <CheckBoxInput
        choiceKey={choiceKey}
        handleCheckboxChange={handleCheckboxChange}
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
  );
}
export { LongChoiceItem };
