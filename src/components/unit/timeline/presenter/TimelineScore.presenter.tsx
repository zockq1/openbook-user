import { useContext } from "react";
import { ThemeContext } from "styled-components";
import fail from "../../../../styles/images/fail.svg";
import success from "../../../../styles/images/success.svg";
import useCountAnimation from "../../../../service/useCountAnimation";
import ScoreUI from "../../question/container/ScoreUI.container";

interface TimelineScoreProps {
  wrongCount: number;
}

function TimelineScore({ wrongCount }: TimelineScoreProps) {
  const theme = useContext(ThemeContext);

  const passText = "합격!";
  const failText = "불합격";

  const isPass = 10 - wrongCount >= 8;
  const title = isPass ? passText : failText;

  let percentage = Math.floor(100 - wrongCount * 10);
  if (percentage < 0) percentage = 0;

  const description = isPass
    ? "다음 학습으로 넘어가세요!"
    : `틀린 횟수가 2회 이하여야 합니다.`;
  const color = isPass ? theme.colors.blue : theme.colors.red;
  const image = isPass ? success : fail;
  const count = useCountAnimation(0, percentage);

  return (
    <ScoreUI
      title={title}
      score={`${count}%(${wrongCount}회 틀림)`}
      percentage={percentage}
      description={description}
      color={color}
      image={image}
    />
  );
}

export default TimelineScore;
