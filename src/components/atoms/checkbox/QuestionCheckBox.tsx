import styled, { keyframes } from "styled-components";

interface AnswerCheckProps {
  isFinish?: boolean;
  isCorrect?: boolean;
}

interface CheckBoxInputProps {
  choiceKey: string;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedCheckbox: string;
}

interface CheckBoxLabelProps {
  choiceKey: string;
  isFinish?: boolean;
  isCorrect?: boolean;
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
  --checkbox-size: 20px;
  --tick-color: ${({ theme, isCorrect, isFinish }) =>
    isFinish
      ? isCorrect
        ? theme.colors.blue
        : theme.colors.red
      : theme.colors.blue};

  flex-shrink: 0;
  display: block;
  margin: 5px 0;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border: calc(var(--checkbox-size) * 0.075) solid
    ${({ theme, isCorrect, isFinish }) =>
      isFinish
        ? isCorrect
          ? theme.colors.semiLightBlue
          : theme.colors.lightRed
        : theme.colors.textBlue};
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
  choiceKey,
  handleCheckboxChange,
  selectedCheckbox,
}: CheckBoxInputProps) {
  return (
    <CheckboxInput
      type="checkbox"
      id={choiceKey}
      onChange={handleCheckboxChange}
      checked={selectedCheckbox === choiceKey}
    />
  );
}

function CheckBoxLabel({ choiceKey, isFinish, isCorrect }: CheckBoxLabelProps) {
  return (
    <CheckboxLabel
      htmlFor={choiceKey}
      isFinish={isFinish}
      isCorrect={isCorrect}
    >
      <div className="tick"></div>
    </CheckboxLabel>
  );
}

export { CheckBoxInput, CheckBoxLabel };
