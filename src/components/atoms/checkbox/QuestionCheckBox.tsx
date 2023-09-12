import styled, { keyframes } from "styled-components";

interface AnswerCheckProps {
  isSolved?: string;
  isAnswer?: boolean;
}

interface CheckBoxInputProps {
  current: string;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedCheckbox: string;
}

interface CheckBoxLabelProps {
  current: string;
  answer: string;
  isSolved: string;
}

const popAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  33% {
    transform: scale(0.9);
  }
  66% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const CheckboxInput = styled.input`
  position: absolute;
  left: -1000px;
`;

const CheckboxLabel = styled.label<AnswerCheckProps>`
  --checkbox-size: 40px;
  --tick-color: ${({ theme, isSolved, isAnswer }) =>
    isSolved !== "no"
      ? isAnswer
        ? theme.colors.blue
        : theme.colors.red
      : theme.colors.blue};

  flex-shrink: 0;
  display: block;
  margin: 10px 0;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border: calc(var(--checkbox-size) * 0.125) solid
    ${({ theme, isSolved, isAnswer }) =>
      isSolved !== "no"
        ? isAnswer
          ? theme.colors.semiLightBlue
          : theme.colors.lightRed
        : theme.colors.black};
  border-radius: 12.5%;
  background-color: ${({ theme }) => theme.colors.white};

  & .tick {
    position: relative;
    right: calc(var(--checkbox-size) * -0.5);
    top: calc(var(--checkbox-size) * -0.25);
    width: calc(var(--checkbox-size) * 0.25);
    height: calc(var(--checkbox-size) * 0.75);
    border-right: calc(var(--checkbox-size) * 0.25) solid var(--tick-color);
    border-bottom: calc(var(--checkbox-size) * 0.25) solid var(--tick-color);
    transform: rotate(45deg) scale(0);
    opacity: 0;
    transition: all 600ms cubic-bezier(0.175, 0.885, 0.32, 1.5);

    &:before {
      content: "";
      position: absolute;
      left: calc(var(--checkbox-size) * -0.125);
      bottom: calc(var(--checkbox-size) * -0.25);
      border: calc(var(--checkbox-size) * 0.125) solid var(--tick-color);
      border-radius: 50%;
    }

    &:after {
      content: "";
      position: absolute;
      right: calc(var(--checkbox-size) * -0.25);
      top: calc(var(--checkbox-size) * -0.125);
      border: calc(var(--checkbox-size) * 0.125) solid var(--tick-color);
      border-radius: 50%;
    }
  }

  ${CheckboxInput}:checked + & .tick {
    opacity: 1;
    transform: rotate(45deg) scale(1);
  }

  ${CheckboxInput}:checked + & {
    animation: ${popAnimation} 400ms linear;
  }
`;

function CheckBoxInput({
  current,
  handleCheckboxChange,
  selectedCheckbox,
}: CheckBoxInputProps) {
  return (
    <CheckboxInput
      type="checkbox"
      id={current}
      onChange={handleCheckboxChange}
      checked={selectedCheckbox === current}
    />
  );
}

function CheckBoxLabel({ current, answer, isSolved }: CheckBoxLabelProps) {
  return (
    <CheckboxLabel
      htmlFor={current}
      isSolved={isSolved}
      isAnswer={current.substring(1) === answer}
    >
      <div className="tick"></div>
    </CheckboxLabel>
  );
}

export { CheckBoxInput, CheckBoxLabel };
