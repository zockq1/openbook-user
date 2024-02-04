import { useContext } from "react";
import ScoreUI from "../presenter/ScoreUI";
import { ThemeContext } from "styled-components";
import fail from "../../../../styles/images/fail.svg";
import success from "../../../../styles/images/success.svg";
import useCountAnimation from "../../../../hooks/useCountAnimation";

interface QuizScoreProps {
  totalScore: number;
  score: number;
}

function QuizScore({ totalScore, score }: QuizScoreProps) {
  const theme = useContext(ThemeContext);
  const passThreshold = 0.8;
  const passText = "합격!";
  const failText = "불합격";
  const thresholdPercentage = passThreshold * 100;
  const thresholdScore = Math.ceil(totalScore * passThreshold);
  const isPass = score / totalScore >= passThreshold;
  const title = isPass ? passText : failText;
  const percentage = Math.floor((score / totalScore) * 100);
  const description = isPass
    ? "다음 학습으로 넘어가세요!"
    : `${thresholdPercentage}%(${thresholdScore}/${totalScore})를 넘기지 못했습니다.`;
  const color = isPass ? theme.colors.blue : theme.colors.red;
  const image = isPass ? success : fail;
  const count = useCountAnimation(0, percentage);

  return (
    <ScoreUI
      title={title}
      score={`${count}%(${score}/${totalScore})`}
      percentage={percentage}
      description={description}
      color={color}
      image={image}
    />
  );
}

export default QuizScore;
