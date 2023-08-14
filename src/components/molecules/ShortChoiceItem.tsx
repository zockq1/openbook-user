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
  display: flex;
  align-items: center;
  flex-direction: column;
  width: calc((100% - 45px) / 2);
  height: max(20vh, max-content);
  margin: 10px 0px 10px 15px;
  padding: 12px;
  border-radius: 10px;
  border: 3px solid
    ${({ theme, isSolved, isAnswer }) =>
      isSolved !== "no"
        ? isAnswer
          ? theme.colors.blue
          : theme.colors.red
        : theme.colors.black};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.white};
`;

const ShortComment = styled.span<AnswerCheckProps>`
  width: max-content;
  max-width: calc(100% - 30px);
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
      isAnswer={current === answer}
      key={current}
    >
      <ShortComment isSolved={isSolved} isAnswer={current === answer}>
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
