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
  choiceKey: string;
  choice: string;
  isFinish: boolean;
  isCorrect: boolean;
  selectedCheckbox: string;
}

const ShortChoice = styled.div<AnswerCheckProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 200px;
  margin: 0;
  padding: 12px;
  border-radius: 10px;
  border: 2px solid
    ${({ theme, isFinish, isCorrect }) =>
      isFinish
        ? isCorrect
          ? theme.colors.blue
          : theme.colors.red
        : theme.colors.textBlue};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.white};
`;

const ShortComment = styled.img<AnswerCheckProps>`
  border-radius: 10px;
  height: 70%;
`;

function ShortChoiceItem({
  handleChoiceClick,
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
      <ShortComment
        src={choice}
        alt="choice"
        isFinish={isFinish}
        isCorrect={isCorrect}
      />
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
    </ShortChoice>
  );
}
export { ShortChoiceItem };
