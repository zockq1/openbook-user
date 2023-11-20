import ScoreUI from "../container/ScoreUI.container";
import fail from "../../../../styles/images/fail.svg";
import first from "../../../../styles/images/first.svg";
import second from "../../../../styles/images/second.svg";
import third from "../../../../styles/images/third.svg";
import useCountAnimation from "../../../../hooks/useCountAnimation";
import calculateGradientColor from "../../../../service/calculateGradientColor";

interface QuizScoreProps {
  totalScore: number;
  score: number;
}

function ExamScore({ totalScore, score }: QuizScoreProps) {
  const percentage = (score / totalScore) * 100;
  let title, description, image;

  if (percentage < 60) {
    title = "불합격";
    description = "60점 미만으로 불합격입니다.";
    image = fail;
  } else if (percentage >= 60 && percentage < 70) {
    title = "3급";
    description = "60~69점으로 3급입니다.";
    image = third;
  } else if (percentage >= 70 && percentage < 80) {
    title = "2급";
    description = "70~79점으로 2급입니다.";
    image = second;
  } else {
    title = "1급";
    description = "80점 이상으로 1급입니다.";
    image = first;
  }

  const color = calculateGradientColor(score);
  const count = useCountAnimation(0, percentage);

  return (
    <ScoreUI
      title={title}
      score={`${count}점(${score}/${totalScore})`}
      percentage={percentage}
      description={description}
      color={color}
      image={image}
    />
  );
}

export default ExamScore;
