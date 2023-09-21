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
  isFinish: boolean;
  isCorrect: boolean;
  selectedCheckbox: string;
}

const ShortChoice = styled.div<AnswerCheckProps>`
  display: grid;
  grid-template-rows: 1fr 1fr;
  place-items: center;
  width: calc((100vw - 45px) / 2);
  margin: 10px 0px 10px 15px;
  padding: 12px;
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

const ShortComment = styled.span<AnswerCheckProps>`
  border-radius: 10px;
  color: ${({ theme, isCorrect, isFinish }) =>
    isFinish
      ? isCorrect
        ? theme.colors.blue
        : theme.colors.red
      : theme.colors.black};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSizes.base};

  line-height: 120%;
  text-align: center;
`;

function ShortChoiceItem({
  handleChoiceClick,
  handleCheckboxChange,
  isCorrect,
  choiceKey,
  choice,
  isFinish,
  selectedCheckbox,
}: ChoiceProps) {
  return (
    <ShortChoice
      onClick={() => handleChoiceClick(choiceKey)}
      isFinish={isFinish}
      isCorrect={isCorrect}
    >
      <ShortComment isFinish={isFinish} isCorrect={isCorrect}>
        {choice}
      </ShortComment>
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
    </ShortChoice>
  );
}
export { ShortChoiceItem };
