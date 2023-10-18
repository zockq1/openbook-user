import { useEffect, useState } from "react";
import styled from "styled-components";
import { RowList } from "../../atoms/layout/List";
import Icon from "../../atoms/icon/Icon";

interface QuestionCounterProps {
  timeLimit: number;
  totalQuestionCount: number;
  currentQuestionCount: number;
  timeout?: () => void;
}

const StyledQuestionCounter = styled.ul`
  position: relative;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: calc((100% - 45px) / 2);
  margin: 10px 0px 10px 15px;
  padding: 12px;
  border-radius: 10px;
  border: ${({ theme }) => theme.border.black};
  background-color: ${({ theme }) => theme.colors.white};
`;

function QuestionCounter({
  timeLimit,
  totalQuestionCount,
  currentQuestionCount,
  timeout,
}: QuestionCounterProps) {
  const [minutes, setMinutes] = useState(Math.floor(timeLimit / 60));
  const [seconds, setSeconds] = useState(timeLimit % 60);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          timeout && timeout();
          clearInterval(countdown);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minutes, seconds]);

  return (
    <RowList>
      <StyledQuestionCounter>
        <Icon icon="clock" />
        &nbsp;
        {timeLimit === Infinity ? (
          <Icon icon="infinity" />
        ) : (
          `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
        )}
      </StyledQuestionCounter>
      <StyledQuestionCounter>
        {currentQuestionCount}/{totalQuestionCount}
      </StyledQuestionCounter>
    </RowList>
  );
}

export default QuestionCounter;
