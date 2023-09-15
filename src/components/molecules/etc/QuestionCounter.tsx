import { useEffect, useState } from "react";
import styled from "styled-components";
import { RowList } from "../../atoms/layout/List";
import Icon from "../../atoms/icon/Icon";

interface QuestionCounterProps {
  timeLimit: number;
  totalQuestionCount: number;
  currentQuestionCount: number;
  category: string;
  setisTimeout?: React.Dispatch<React.SetStateAction<boolean>>;
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
  category,
  setisTimeout,
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
          setisTimeout && setisTimeout(true);
          clearInterval(countdown);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds, setisTimeout]);

  return (
    <RowList>
      <StyledQuestionCounter>
        <Icon category="시간제한" />
        &nbsp;
        {timeLimit === Infinity ? (
          <Icon category="무제한" />
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
