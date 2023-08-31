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

const ShortChoice = styled.div<AnswerCheckProps>`
  display: grid;
  grid-template-rows: 1fr 1fr;
  place-items: center;
  width: calc((100vw - 45px) / 2);
  margin: 10px 0px 10px 15px;
  padding: 12px;
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

const ShortComment = styled.span<AnswerCheckProps>`
  border-radius: 10px;
  color: ${({ theme, isSolved, isAnswer }) =>
    isSolved !== "no"
      ? isAnswer
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
  current,
  answer,
  choice,
  isSolved,
  selectedCheckbox,
}: ChoiceProps) {
  return (
    <ShortChoice
      onClick={() => handleChoiceClick(current)}
      isSolved={isSolved}
      isAnswer={current.substring(1) === answer}
      key={current}
    >
      <ShortComment
        isSolved={isSolved}
        isAnswer={current.substring(1) === answer}
      >
        {choice}
      </ShortComment>
      <CheckBoxInput
        current={current}
        handleCheckboxChange={handleCheckboxChange}
        selectedCheckbox={selectedCheckbox}
      />
      <CheckBoxLabel current={current} answer={answer} isSolved={isSolved} />
    </ShortChoice>
  );
}
export { ShortChoiceItem };
